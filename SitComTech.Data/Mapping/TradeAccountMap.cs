﻿using SitComTech.Model.DataObject;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace SitComTech.Data.Mapping
{   
    public class TradeAccountMap : EntityTypeConfiguration<TradeAccount>
    {
        public TradeAccountMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class FinancialTransactionMap : EntityTypeConfiguration<FinancialTransaction>
    {
        public FinancialTransactionMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class ClientDocumentMap : EntityTypeConfiguration<ClientDocument>
    {
        public ClientDocumentMap()
        {
            HasKey(r => r.Id);
            Property(r=>r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
    public class WithdrawalTransactionMap : EntityTypeConfiguration<WithdrawalTransaction>
    {
        public WithdrawalTransactionMap()
        {
            HasKey(r => r.Id);
            Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasRequired(a => a.FinancialTransactionTable).WithMany(a => a.WithdrawalTransactions).HasForeignKey(x => x.FinancialTransactionId).WillCascadeOnDelete(false);
        }
    }
}
