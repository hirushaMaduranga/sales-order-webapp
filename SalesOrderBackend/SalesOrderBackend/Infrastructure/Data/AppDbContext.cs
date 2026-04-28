using Microsoft.EntityFrameworkCore;
using SalesOrderBackend.Domain.Entities;

namespace SalesOrderBackend.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Client> Clients { get; set; } = null!;
    public DbSet<Item> Items { get; set; } = null!;
    public DbSet<SalesOrder> SalesOrders { get; set; } = null!;
    public DbSet<SalesOrderLine> SalesOrderLines { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>()
            .HasMany(client => client.SalesOrders)
            .WithOne(order => order.Client)
            .HasForeignKey(order => order.ClientId);

        modelBuilder.Entity<SalesOrder>()
            .HasMany(order => order.SalesOrderLines)
            .WithOne(line => line.SalesOrder)
            .HasForeignKey(line => line.SalesOrderId);

        modelBuilder.Entity<Item>()
            .HasMany(item => item.SalesOrderLines)
            .WithOne(line => line.Item)
            .HasForeignKey(line => line.ItemId);

        modelBuilder.Entity<Client>().HasData(
            new Client
            {
                ClientId = 1,
                CustomerName = "Brightline Retail Co.",
                Address1 = "120 King Street",
                Address2 = "Suite 5",
                Address3 = null,
                Suburb = "Sydney",
                State = "NSW",
                PostCode = "2000"
            },
            new Client
            {
                ClientId = 2,
                CustomerName = "Harbor Logistics",
                Address1 = "45 Dock Road",
                Address2 = null,
                Address3 = null,
                Suburb = "Fremantle",
                State = "WA",
                PostCode = "6160"
            },
            new Client
            {
                ClientId = 3,
                CustomerName = "Sunset Cafe Group",
                Address1 = "88 Market Lane",
                Address2 = "Level 2",
                Address3 = "Building B",
                Suburb = "Adelaide",
                State = "SA",
                PostCode = "5000"
            });

        modelBuilder.Entity<Item>().HasData(
            new Item
            {
                ItemId = 1,
                ItemCode = "ITM-1001",
                Description = "Stainless steel prep table",
                UnitPrice = 750.00m
            },
            new Item
            {
                ItemId = 2,
                ItemCode = "ITM-2003",
                Description = "Commercial espresso machine",
                UnitPrice = 4200.00m
            },
            new Item
            {
                ItemId = 3,
                ItemCode = "ITM-3050",
                Description = "Industrial shelving unit",
                UnitPrice = 520.00m
            });

        base.OnModelCreating(modelBuilder);
    }
}
