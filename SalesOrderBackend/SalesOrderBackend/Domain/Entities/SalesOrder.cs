using System;
using System.Collections.Generic;

namespace SalesOrderBackend.Domain.Entities;

public class SalesOrder
{
    public int SalesOrderId { get; set; }
    public string OrderNo { get; set; } = string.Empty;
    public int ClientId { get; set; }
    public Client? Client { get; set; }
    public string InvoiceNo { get; set; } = string.Empty;
    public DateTime InvoiceDate { get; set; }
    public string? ReferenceNo { get; set; }
    public string? Note { get; set; }
    public decimal TotalExcl { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalIncl { get; set; }
    public ICollection<SalesOrderLine> SalesOrderLines { get; set; } = new List<SalesOrderLine>();
}
