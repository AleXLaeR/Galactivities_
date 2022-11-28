namespace Domain.Entities;

public enum ActivitySortingFilter : byte
{
    Date,
    DateDescending,
    Popularity,
    PopularityDescending,
    Relevancy,
    RelevancyDescending,
}