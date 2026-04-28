namespace SalesOrderBackend.Models.DTOs;

public class SalesOrderLineCreateDto
{
    public int ItemId { get; set; }
    public string? LineNote { get; set; }
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal TaxRate { get; set; }
}
