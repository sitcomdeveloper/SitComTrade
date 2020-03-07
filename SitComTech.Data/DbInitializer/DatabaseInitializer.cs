using SitComTech.Data.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitComTech.Data.DbInitializer
{
    public class DatabaseInitializer:IDatabaseInitializer<AppDbContext>
    {
        public void InitializeDatabase(AppDbContext dbContext)
        {
            dbContext.Database.CreateIfNotExists();
        }
    }
}
