using Microsoft.EntityFrameworkCore;
using SalesOrderBackend.Application.Interfaces;
using SalesOrderBackend.Domain.Entities;
using SalesOrderBackend.Infrastructure.Data;
using SalesOrderBackend.Models.DTOs;

namespace SalesOrderBackend.Application.Services;

public class SalesOrderService : ISalesOrderService
{
    private readonly AppDbContext _dbContext;

    public SalesOrderService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<SalesOrderResponseDto>> GetAllAsync()
    {
        var orders = await _dbContext.SalesOrders
            .Include(order => order.Client)
            .Include(order => order.SalesOrderLines)
            .ThenInclude(line => line.Item)
            .ToListAsync();

        return orders.Select(MapToResponseDto).ToList();
    }

    public async Task<SalesOrderResponseDto?> GetByIdAsync(int salesOrderId)
    {
        var order = await _dbContext.SalesOrders
            .Include(order => order.Client)
            .Include(order => order.SalesOrderLines)
            .ThenInclude(line => line.Item)
            .FirstOrDefaultAsync(order => order.SalesOrderId == salesOrderId);

        return order == null ? null : MapToResponseDto(order);
    }

    public async Task<SalesOrderResponseDto> CreateAsync(SalesOrderCreateDto dto)
    {
        var orderNo = await GenerateOrderNoAsync();
        var order = new SalesOrder
        {
            OrderNo = orderNo,
            ClientId = dto.ClientId,
            InvoiceNo = dto.InvoiceNo,
            InvoiceDate = dto.InvoiceDate,
            ReferenceNo = dto.ReferenceNo,
            Note = dto.Note
        };

        order.SalesOrderLines = dto.Lines.Select(lineDto => CreateLine(lineDto, order)).ToList();
        CalculateTotals(order);

        _dbContext.SalesOrders.Add(order);
        await _dbContext.SaveChangesAsync();

        await LoadNavigationAsync(order);
        return MapToResponseDto(order);
    }

    public async Task<SalesOrderResponseDto?> UpdateAsync(int salesOrderId, SalesOrderCreateDto dto)
    {
        var order = await _dbContext.SalesOrders
            .Include(existing => existing.SalesOrderLines)
            .FirstOrDefaultAsync(existing => existing.SalesOrderId == salesOrderId);

        if (order == null)
        {
            return null;
        }

        order.ClientId = dto.ClientId;
        order.InvoiceNo = dto.InvoiceNo;
        order.InvoiceDate = dto.InvoiceDate;
        order.ReferenceNo = dto.ReferenceNo;
        order.Note = dto.Note;

        _dbContext.SalesOrderLines.RemoveRange(order.SalesOrderLines);
        order.SalesOrderLines = dto.Lines.Select(lineDto => CreateLine(lineDto, order)).ToList();
        CalculateTotals(order);

        await _dbContext.SaveChangesAsync();

        await LoadNavigationAsync(order);
        return MapToResponseDto(order);
    }

    private SalesOrderLine CreateLine(SalesOrderLineCreateDto dto, SalesOrder order)
    {
        var exclAmount = dto.Quantity * dto.Price;
        var taxAmount = exclAmount * dto.TaxRate;
        var inclAmount = exclAmount + taxAmount;

        return new SalesOrderLine
        {
            SalesOrder = order,
            ItemId = dto.ItemId,
            LineNote = dto.LineNote,
            Quantity = dto.Quantity,
            Price = dto.Price,
            TaxRate = dto.TaxRate,
            ExclAmount = exclAmount,
            TaxAmount = taxAmount,
            InclAmount = inclAmount
        };
    }

    private void CalculateTotals(SalesOrder order)
    {
        order.TotalExcl = order.SalesOrderLines.Sum(line => line.ExclAmount);
        order.TotalTax = order.SalesOrderLines.Sum(line => line.TaxAmount);
        order.TotalIncl = order.SalesOrderLines.Sum(line => line.InclAmount);
    }

    private async Task<string> GenerateOrderNoAsync()
    {
        var lastOrderNo = await _dbContext.SalesOrders
            .OrderByDescending(order => order.SalesOrderId)
            .Select(order => order.OrderNo)
            .FirstOrDefaultAsync();

        var lastNumber = 0;
        if (!string.IsNullOrWhiteSpace(lastOrderNo) && lastOrderNo.StartsWith("SO-"))
        {
            var numberPart = lastOrderNo[3..];
            int.TryParse(numberPart, out lastNumber);
        }

        return $"SO-{(lastNumber + 1):0000}";
    }

    private async Task LoadNavigationAsync(SalesOrder order)
    {
        await _dbContext.Entry(order).Reference(existing => existing.Client).LoadAsync();
        await _dbContext.Entry(order).Collection(existing => existing.SalesOrderLines).LoadAsync();
        foreach (var line in order.SalesOrderLines)
        {
            await _dbContext.Entry(line).Reference(existing => existing.Item).LoadAsync();
        }
    }

    private SalesOrderResponseDto MapToResponseDto(SalesOrder order)
    {
        return new SalesOrderResponseDto
        {
            SalesOrderId = order.SalesOrderId,
            OrderNo = order.OrderNo,
            ClientId = order.ClientId,
            CustomerName = order.Client?.CustomerName ?? string.Empty,
            InvoiceNo = order.InvoiceNo,
            InvoiceDate = order.InvoiceDate,
            ReferenceNo = order.ReferenceNo,
            Note = order.Note,
            State = order.Client?.State ?? string.Empty,
            PostCode = order.Client?.PostCode ?? string.Empty,
            TotalExcl = order.TotalExcl,
            TotalTax = order.TotalTax,
            TotalIncl = order.TotalIncl,
            Lines = order.SalesOrderLines.Select(line => new SalesOrderLineResponseDto
            {
                SalesOrderLineId = line.SalesOrderLineId,
                ItemId = line.ItemId,
                ItemCode = line.Item?.ItemCode ?? string.Empty,
                Description = line.Item?.Description ?? string.Empty,
                LineNote = line.LineNote,
                Quantity = line.Quantity,
                Price = line.Price,
                TaxRate = line.TaxRate,
                ExclAmount = line.ExclAmount,
                TaxAmount = line.TaxAmount,
                InclAmount = line.InclAmount
            }).ToList()
        };
    }
}
