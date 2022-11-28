namespace Domain.Entities.Params;

public class ActivityParams : PagingParams
{
    public bool IsGoing { get; set; }

    public bool IsHost { get; set; }

    public DateTime StartDate { get; set; } = DateTime.Now;
}