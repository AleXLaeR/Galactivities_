using Application.Core;
using Domain.Entities;
using Domain.Enums.Filtering;

namespace Application.Activities;

public class FilterParams : PagingParams
{
    public ActivitySortingFilter Filter { get; set; } = default;

    public bool IsGoing { get; set; } = default;

    public bool IsHost { get; set; } = default;

    public DateTime StartDate { get; set; } = DateTime.Now;
}