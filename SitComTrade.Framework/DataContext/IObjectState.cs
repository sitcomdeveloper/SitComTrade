using System.ComponentModel.DataAnnotations.Schema;

namespace SitComTech.Framework.DataContext
{
    public interface IObjectState
    {
        [NotMapped]
        ObjectState ObjectState { get; set; }
    }

    public enum ObjectState
    {
        Unchanged,
        Added,
        Modified,
        Deleted
    }
}
