using Microsoft.AspNetCore.Mvc;
using SalesOrderBackend.Application.Interfaces;
using SalesOrderBackend.Models.DTOs;

namespace SalesOrderBackend.API.Controllers;

[ApiController]
[Route("api/items")]
public class ItemController : ControllerBase
{
    private readonly IItemService _itemService;

    public ItemController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ItemDto>>> GetAll()
    {
        var items = await _itemService.GetAllAsync();
        return Ok(items);
    }
}
