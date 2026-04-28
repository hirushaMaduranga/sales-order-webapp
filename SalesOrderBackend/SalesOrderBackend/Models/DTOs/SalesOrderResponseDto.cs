using System;
using System.Collections.Generic;

namespace SalesOrderBackend.Models.DTOs;

public class SalesOrderResponseDto
{
    public int SalesOrderId { get; set; }
    public string OrderNo { get; set; } = string.Empty;
    public int ClientId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string InvoiceNo { get; set; } = string.Empty;
    public DateTime InvoiceDate { get; set; }
    public string? ReferenceNo { get; set; }
    public string? Note { get; set; }
    public string State { get; set; } = string.Empty;
    public string PostCode { get; set; } = string.Empty;
    public decimal TotalExcl { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalIncl { get; set; }
    public List<SalesOrderLineResponseDto> Lines { get; set; } = new();
}
