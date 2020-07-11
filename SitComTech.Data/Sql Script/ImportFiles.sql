create table dbo.ImportFiles
(
	Id bigint identity primary key,
	Title varchar(255),
	FilePath varchar(max),
	Status varchar(255),
	InitiatedDate datetime,
	FinishDate datetime,	
	Errors varchar(max),
	DeletedDate datetime,
	DeletedBy bigint,
	Active bit,
	Deleted bit,
	CreatedBy bigint,
	CreatedByName varchar(255),
	CreatedAt datetime,
	UpdatedBy bigint,
	UpdatedByName varchar(255),
	UpdatedAt datetime
)