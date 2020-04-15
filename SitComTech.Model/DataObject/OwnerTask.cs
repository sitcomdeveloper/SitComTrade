using SitComTech.Model.Common;
using System;

namespace SitComTech.Model.DataObject
{
    public class OwnerTask : BaseConfig
    {
		
		public long OwnerId { get; set; }

		public long TaskTypeId { get; set; }

		public long TaskStatusId { get; set; }

		public long NotiTrasportId { get; set; }

		public string TaskType { get; set; }

		public string TaskStatus { get; set; }

		public string NotiTimeBefore { get; set; }

		public string Description { get; set; }

		public Nullable<DateTime> TaskDate { get; set; }
		public virtual TaskType TaskTypeTable { get; set; }
		public virtual TaskStatus TaskStatustable { get; set; }
		public virtual Client ClientTable { get; set; }
		public virtual NotiTransport NotiTransportTable { get; set; }


	}

	public class TaskType : BaseConfig
	{		
		public string Name { get; set; }

	}

	public class TaskStatus : BaseConfig
	{
		public string Name { get; set; }

	}

	public class NotiTransport : BaseConfig
	{
		public string Name { get; set; }

	}

	public class Comment : BaseConfig
	{

		public long OwnerId { get; set; }

		public string CommentDescription { get; set; }

		public virtual Client ClientTable { get; set; }

	}

}
