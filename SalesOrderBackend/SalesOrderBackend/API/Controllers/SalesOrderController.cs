using Microsoft.AspNetCore.Mvc;
using SalesOrderBackend.Application.Interfaces;
using SalesOrderBackend.Models.DTOs;

namespace SalesOrderBackend.API.Controllers;

[ApiController]
[Route("api/salesorders")]
public class SalesOrderController : ControllerBase
{
    private readonly ISalesOrderService _salesOrderService;

    public SalesOrderController(ISalesOrderService salesOrderService)
    {
        _salesOrderService = salesOrderService;
    }

    [HttpGet]
    public async Task<ActionResult<List<SalesOrderResponseDto>>> GetAll()
    {
        var orders = await _salesOrderService.GetAllAsync();
        return Ok(orders);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SalesOrderResponseDto>> GetById(int id)
    {
        var order = await _salesOrderService.GetByIdAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<SalesOrderResponseDto>> Create(SalesOrderCreateDto dto)
    {
        var order = await _salesOrderService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = order.SalesOrderId }, order);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<SalesOrderResponseDto>> Update(int id, SalesOrderCreateDto dto)
    {
        var order = await _salesOrderService.UpdateAsync(id, dto);
        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }
}
