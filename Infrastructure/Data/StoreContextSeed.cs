using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {

                //Verify if does not exist any product brand
                if (!context.ProductBrands.Any())
                {

                    // Read the data from the json file
                    var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                    //Diserialize the json
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                    // iterate in each item inside the listof brands and add to the database
                    foreach (var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }
                    await context.SaveChangesAsync();

                }

                //Verify if does not exist any product types
                if (!context.ProductTypes.Any())
                {

                    // Read the data from the json file
                    var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                    //Diserialize the json
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    // iterate in each item inside the list  and add to the database
                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }
                    await context.SaveChangesAsync();

                }

                //Verify if does not exist any products
                if (!context.Products.Any())
                {

                    // Read the data from the json file
                    var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                    //Diserialize the json
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    // iterate in each item inside the list and add to the database
                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }
                    await context.SaveChangesAsync();

                }

            }
            catch (Exception e)
            {
                var logger = loggerFactory.CreateLogger<StoreContext>();
                logger.LogError(e.Message);

            }
        }
    }
}