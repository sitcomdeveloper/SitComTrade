using SitComTech.Framework.DataContext;
using SitComTech.Model.Masters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Reflection;

namespace SitComTech.Data.Repository
{
    public class AppDbContext : DbContext, IDataContext
    {

        public AppDbContext(string connectionString)
            : base(connectionString)
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }
        public virtual DbSet<ChangeLog> ChangeLogs { get; set; }
        private void SyncObjectsStatePreCommit()
        {
            foreach (var dbEntityEntry in ChangeTracker.Entries())
            {
                dbEntityEntry.State = EntityStateHelper.ConvertState(((IObjectState)dbEntityEntry.Entity).ObjectState);
            }
        }

        public void SyncObjectStatePostCommit()
        {
            foreach (var dbEntityEntry in ChangeTracker.Entries())
            {
                ((IObjectState)dbEntityEntry.Entity).ObjectState = EntityStateHelper.ConvertState(dbEntityEntry.State);
                dbEntityEntry.State = EntityState.Detached;
            }
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var instance = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                .Where(type => !string.IsNullOrEmpty(type.Namespace))
                .Where(type => type.BaseType != null && type.BaseType.IsGenericType &&
                type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>));
            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.Configurations.Add(configurationInstance);
            }
            base.OnModelCreating(modelBuilder);           
        }
        void IDataContext.SyncObjectState<TEntity>(TEntity entity)
        {
            Entry(entity).State = EntityStateHelper.ConvertState(entity.ObjectState);
        }
        object GetPrimaryKeyValue(DbEntityEntry entry)
        {
            var objectStateEntry = ((IObjectContextAdapter)this).ObjectContext.ObjectStateManager.GetObjectStateEntry(entry.Entity);
            return objectStateEntry.EntityKey.EntityKeyValues[0].Value;
        }
        void HistoryLog()
        {
            try
            {
                var modifiedEntities = ChangeTracker.Entries()
               .Where(p => p.State == EntityState.Modified).ToList();
                var now = DateTime.UtcNow;

                foreach (var change in modifiedEntities)
                {
                    var entityName = change.Entity.GetType().Name;
                    var primaryKey = GetPrimaryKeyValue(change);

                    foreach (var prop in change.OriginalValues.PropertyNames)
                    {
                        var originalValue = $"{change.GetDatabaseValues().GetValue<object>(prop)}";
                        var currentValue = $"{change.CurrentValues[prop]}";

                        if (originalValue != currentValue)
                        {
                            var ownerid = 0;
                            ownerid = change.CurrentValues.PropertyNames.Contains("OwnerId") ? Convert.ToInt32(change.CurrentValues["OwnerId"]) : change.CurrentValues.PropertyNames.Contains("UserId") ? Convert.ToInt32(change.CurrentValues["UserId"]) : 0;
                            ChangeLog log = new ChangeLog()
                            {
                                EntityName = entityName,
                                PrimaryKeyValue = primaryKey.ToString(),
                                PropertyName = prop,
                                OldValue = originalValue,
                                NewValue = currentValue,
                                DateChanged = now,
                                ObjectState = ObjectState.Added,
                                OwnerId = ownerid

                            };
                            ChangeLogs.Add(log);

                        }
                    }
                }
            }
            catch(Exception ex)
            {

            }
            
        }
        public override int SaveChanges()
        {
            HistoryLog();
            SyncObjectsStatePreCommit();
            var changes = base.SaveChanges();
            SyncObjectStatePostCommit();
            return changes;
        }

        public IQueryable<TEntity> SQLQuery<TEntity>(string query, params object[] parameters)
        {
            return Database.SqlQuery<TEntity>(query, parameters).AsQueryable();
        }


        public int ExecuteCommand(string query, params object[] parameters)
        {
            return Database.ExecuteSqlCommand(query, parameters);
        }

        public DataTable ExecuteSqlProc(string procName, params object[] parameters)
        {
            DataTable dt = new DataTable();
            try
            {
                var conn = Database.Connection;
                if (conn.State != ConnectionState.Open)
                    conn.Open();
                using (var cmd = Database.Connection.CreateCommand())
                {
                    cmd.CommandText = procName;
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.AddRange(parameters);
                    using (var reader = cmd.ExecuteReader())
                    {
                        dt.Load(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }
    }
}
