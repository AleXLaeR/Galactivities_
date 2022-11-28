namespace Domain.Entities.Params;

public class FilteringSortedParams : PagingParams
{
    public ActivitySortingFilter Filter { get; set; } = default;

    public bool IsGoing { get; set; } = default;

    public bool IsHost { get; set; } = default;
}