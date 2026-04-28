using Microsoft.EntityFrameworkCore;
using SalesOrderBackend.Application.Interfaces;
using SalesOrderBackend.Infrastructure.Data;
using SalesOrderBackend.Models.DTOs;

namespace SalesOrderBackend.Application.Services;

public class ClientService : IClientService
{
    private readonly AppDbContext _dbContext;

    public ClientService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<ClientDto>> GetAllAsync()
    {
        return await _dbContext.Clients
            .Select(client => new ClientDto
            {
                ClientId = client.ClientId,
                CustomerName = client.CustomerName,
                Address1 = client.Address1,
                Address2 = client.Address2,
                Address3 = client.Address3,
                Suburb = client.Suburb,
                State = client.State,
                PostCode = client.PostCode
            })
            .ToListAsync();
    }
}
