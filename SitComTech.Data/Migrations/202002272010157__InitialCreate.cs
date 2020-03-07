namespace SitComTech.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserName = c.String(maxLength: 200),
                        Password = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        IsActive = c.Boolean(nullable: false,defaultValue:true),
                        IsDeleted = c.Boolean(nullable: false,defaultValue:false),
                        CreatedBy = c.Int(nullable: false),
                        CreatedTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
                Sql(@"Insert Into Users(UserName,Password,Email,Phone,CreatedBy,CreatedTime,UpdatedBy,UpdatedTime)
                    Values('ravikanthudda','hello@321','ravikanthudda@gmail.com','9990965066',0,getdate(),0,getdate())
                    ");
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
        }
    }
}
