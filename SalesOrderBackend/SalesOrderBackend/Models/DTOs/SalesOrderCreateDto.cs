using System;
using System.Collections.Generic;

namespace SalesOrderBackend.Models.DTOs;

public class SalesOrderCreateDto
{
    public int ClientId { get; set; }
    public string InvoiceNo { get; set; } = string.Empty;
    public DateTime InvoiceDate { get; set; }
    public string? ReferenceNo { get; set; }
    public string? Note { get; set; }
    public List<SalesOrderLineCreateDto> Lines { get; set; } = new();
}
