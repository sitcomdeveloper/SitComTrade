namespace SitComTech.Core.Interface
{
    public interface ICurrentUser
    {
        long UserId { get; }
        string UserName { get; }
    }
}
