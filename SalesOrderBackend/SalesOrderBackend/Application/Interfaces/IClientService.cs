using System.Collections.Generic;
using System.Threading.Tasks;
using SalesOrderBackend.Models.DTOs;

namespace SalesOrderBackend.Application.Interfaces;

public interface IClientService
{
    Task<List<ClientDto>> GetAllAsync();
}
