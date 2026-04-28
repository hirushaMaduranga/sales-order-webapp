using Microsoft.AspNetCore.Mvc;
using SalesOrderBackend.Application.Interfaces;
using SalesOrderBackend.Models.DTOs;

namespace SalesOrderBackend.API.Controllers;

[ApiController]
[Route("api/clients")]
public class ClientController : ControllerBase
{
    private readonly IClientService _clientService;

    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ClientDto>>> GetAll()
    {
        var clients = await _clientService.GetAllAsync();
        return Ok(clients);
    }
}
