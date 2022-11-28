namespace Domain.Entities.Params;

public class SortingPagedParams : PagingParams
{
    public ActivitySortingFilter Filter { get; set; } = default;
}