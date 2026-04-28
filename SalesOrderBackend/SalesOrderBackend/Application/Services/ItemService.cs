using Microsoft.EntityFrameworkCore;
using SalesOrderBackend.Application.Interfaces;
using SalesOrderBackend.Infrastructure.Data;
using SalesOrderBackend.Models.DTOs;

namespace SalesOrderBackend.Application.Services;

public class ItemService : IItemService
{
    private readonly AppDbContext _dbContext;

    public ItemService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<ItemDto>> GetAllAsync()
    {
        return await _dbContext.Items
            .Select(item => new ItemDto
            {
                ItemId = item.ItemId,
                ItemCode = item.ItemCode,
                Description = item.Description,
                UnitPrice = item.UnitPrice
            })
            .ToListAsync();
    }
}
