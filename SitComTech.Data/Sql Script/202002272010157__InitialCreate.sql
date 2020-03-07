﻿CREATE TABLE [dbo].[Users] (
    [Id] [int] NOT NULL IDENTITY,
    [UserName] [nvarchar](200),
    [Password] [nvarchar](max),
    [Email] [nvarchar](max),
    [Phone] [nvarchar](max),
    [IsActive] [bit] NOT NULL DEFAULT 1,
    [IsDeleted] [bit] NOT NULL DEFAULT 0,
    [CreatedBy] [int] NOT NULL,
    [CreatedTime] [datetime] NOT NULL,
    [UpdatedBy] [int],
    [UpdatedTime] [datetime],
    CONSTRAINT [PK_dbo.Users] PRIMARY KEY ([Id])
)
Insert Into Users(UserName,Password,Email,Phone,CreatedBy,CreatedTime,UpdatedBy,UpdatedTime)
                    Values('ravikanthudda','hello@321','ravikanthudda@gmail.com','9990965066',0,getdate(),0,getdate())
                    
CREATE TABLE [dbo].[__MigrationHistory] (
    [MigrationId] [nvarchar](150) NOT NULL,
    [ContextKey] [nvarchar](300) NOT NULL,
    [Model] [varbinary](max) NOT NULL,
    [ProductVersion] [nvarchar](32) NOT NULL,
    CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY ([MigrationId], [ContextKey])
)
INSERT [dbo].[__MigrationHistory]([MigrationId], [ContextKey], [Model], [ProductVersion])
VALUES (N'202002272010157__InitialCreate', N'SitComTech.Data.Migrations.Configuration',  0x1F8B0800000000000400CD58DB6EE336107D2FD07F10F4D402592B4E5EDA40DE85632785D1756244CEBED3D2D8264A912A49A5368A7E591FFA49FD851DEA7EF14D76B628FC628D38670E47C33323FDFBF73FEEA74DC8AC37908A0A3EB0FBBD6BDB02EE8B80F2D5C08EF5F2C34FF6A78FDF7FE73E04E1C6FA92AFBB35EBD093AB81BDD63ABA731CE5AF2124AA17525F0A2596BAE78BD02181706EAEAF7F76FA7D0710C2462CCB725F62AE6908C9055E8E04F721D2316153110053991DEF7809AAF544425011F161607B548F4438077FDD1B134D7A2F100945B5905BDB1A324A9091076C695B8473A18946BE77AF0A3C2D055F79111A089B6F23C0754BC21464FBB82B979FBAA5EB1BB325A774CCA1FC5869117604ECDF6639729AEE6765DA2E7288597CC06CEBADD97592C9818D0991B6D50C743762D22CAA253979223DBC0A05EF19BF2BAB79F7AA280CAC1FF3BBB24631D3B1840187584B822B66F18251FF57D8CEC56FC0073C66AC4A1149E2BD9A014D332922907AFB02CB8CF824B02DA7EEE7341D0BB78A4FBAAD09D7B737B6F584C1C9824151019514785849F00B7090444330235A83E40603921CB6A237629904997F79442C3B3C49B635259BCFC0577A3DB0F121D9D623DD40905B3216AF9CE2C143272D633816684694FA43C8E04020FCFB0E811E4242D9378F325B0B7E2869EF1365A286BEA66F45A07B211810BEA3228EE18C8101D6C7A5402309A6CCEEB7C72AF42498392D0B0FB511D2EB8E58AF51B093D2495EBB19545D5DA714A3B6446123D084E2E1CB608751345E18236CF40EBDC2D3964996CA0AA04E3205F540574EA7B2AD9241DA2B7AA91CEEA259102A5B9293F6A4BC77397B9A973B255184655C696699C5F2D24E36FAE07597F630C5707CB543E10BB645245433B282C65D0C8D4C1FA954DAB4D0053155310AC2D6B25AFAF7A4360F55CD7053C7CB84E7ABCDFFD4637F3F4F1F4B03AB4CE323EE2C44554E3609059FACB9B5DC9261823022777487916071C8F7759843DEA5DE57314AEBE948A5A057914AEBE9489962576132530736A91ED7A8A4A6D3314AB5ADE5B7B076412AF4B60E55984FC7AA486E15AB62EE8C95AADC0EB4B6FC1DA9A6527B6BE5549A3B63B5B9D56EB4F15CA771BE9A87D9699DE6C63CD6948643B2DA5C52442FE4B521A36E2669C75F145A1A972EB12D4CD41B0D8CBE795BA5214C75C7FB9D8D18C5FD960BA684D325289D8EAC38B8F56F1AEF18FF9F79DF512A60670DFD131EC06660FF69FDF5DF0FE4D4A4FBE8C8DD758269CCE0FC8D487F4D647B0A2F81CF19B973DC1F42B2F9B12B586DACBE08A9363A5F84D41C8F17545F3E1A9F03D21A8B933AB97C2836C2A7DF65286E103A25BB3B46E45D7CDA50DD46E6F668777C26DE3B12A7928944170239A704B321FACC69B92DDFAE53FD1AE48E41D1550961BE0D71F08D5295A0F99A095F8A3CCBB8A32AA37C49E3214C4113CC3A194A4D97C4D778DB07A592D7CD2F84C5C9C95C4030E1CFB18E623D540AC205AB755ED7391C3F7925A873769F2373A5DE630B48939AC279E6F7316541C1FBB15DC8FB204C8D64828BACF0751BE156DB02E9A935E8ED03CAD2378608B891EB3984114330F5CC3D6284A43B372CAFCFB022FE36EFC2FB418E3F887ADADD31252B4942956194FEE60BA7633E717EFC0A197337F114150000 , N'6.4.0')

