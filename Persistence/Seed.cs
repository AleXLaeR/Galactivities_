using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(DataContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<User>
            {
                new User { DisplayName = "Bob", UserName = "bob", Email = "bob@test.gmail.com"},
                new User { DisplayName = "Tom", UserName = "tom", Email = "tom@test.gmail.com"},
                new User { DisplayName = "Jade", UserName = "jade", Email = "jade@test.gmail.com"},
            };

            await Task.WhenAll(users.Select(user => userManager.CreateAsync(user, "Pa$$word")));
        }
        
        if (context.Activities.Any()) return;

        var activities = new List<Activity>
        {
            new Activity
            {
                Title = "Past Activity 1",
                Date = DateTime.Now.AddMonths(-2),
                Description = "Activity 2 months ago",
                Category = "drinks",
                Location = "London",
                Venue = "Pub",
            },
            new Activity
            {
                Title = "Past Activity 2",
                Date = DateTime.Now.AddMonths(-1),
                Description = "Activity 1 month ago",
                Category = "culture",
                Location = "Paris",
                Venue = "Louvre",
            },
            new Activity
            {
                Title = "Future Activity 1",
                Date = DateTime.Now.AddMonths(1),
                Description = "Activity 1 month in future",
                Category = "culture",
                Location = "London",
                Venue = "Natural History Museum",
            },
            new Activity
            {
                Title = "Future Activity 2",
                Date = DateTime.Now.AddMonths(2),
                Description = "Activity 2 months in future",
                Category = "music",
                Location = "London",
                Venue = "O2 Arena",
            },
            new Activity
            {
                Title = "Future Activity 3",
                Date = DateTime.Now.AddMonths(3),
                Description = "Activity 3 months in future",
                Category = "drinks",
                Location = "London",
                Venue = "Another pub",
            },
            new Activity
            {
                Title = "Future Activity 4",
                Date = DateTime.Now.AddMonths(4),
                Description = "Activity 4 months in future",
                Category = "drinks",
                Location = "London",
                Venue = "Yet another pub",
            },
            new Activity
            {
                Title = "Future Activity 5",
                Date = DateTime.Now.AddMonths(5),
                Description = "Activity 5 months in future",
                Category = "drinks",
                Location = "London",
                Venue = "Just another pub",
            },
            new Activity
            {
                Title = "Future Activity 6",
                Date = DateTime.Now.AddMonths(6),
                Description = "Activity 6 months in future",
                Category = "music",
                Location = "London",
                Venue = "Roundhouse Camden",
            },
            new Activity
            {
                Title = "Future Activity 7",
                Date = DateTime.Now.AddMonths(7),
                Description = "Activity 2 months ago",
                Category = "travel",
                Location = "London",
                Venue = "Somewhere on the Thames",
            },
            new Activity
            {
                Title = "Future Activity 8",
                Date = DateTime.Now.AddMonths(8),
                Description = "Activity 8 months in future",
                Category = "film",
                Location = "London",
                Venue = "Cinema",
            }
        };

        await context.Activities.AddRangeAsync(activities);
        await context.SaveChangesAsync();
    }
}