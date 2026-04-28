using System.Collections.Generic;
using System.Threading.Tasks;
using SalesOrderBackend.Models.DTOs;

namespace SalesOrderBackend.Application.Interfaces;

public interface ISalesOrderService
{
    Task<List<SalesOrderResponseDto>> GetAllAsync();
    Task<SalesOrderResponseDto?> GetByIdAsync(int salesOrderId);
    Task<SalesOrderResponseDto> CreateAsync(SalesOrderCreateDto dto);
    Task<SalesOrderResponseDto?> UpdateAsync(int salesOrderId, SalesOrderCreateDto dto);
}
