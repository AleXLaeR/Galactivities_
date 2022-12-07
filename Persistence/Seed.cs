using Domain.Entities;
using Domain.Entities.Activities;
using Domain.Entities.Junctions;
using Domain.Entities.Users;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public static class Seed
{
    public static async Task SeedData(DataContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any() && !context.Activities.Any())
        {
            var users = new List<User>
            {
                new User
                {
                    DisplayName = "Bob",
                    UserName = "bob",
                    Email = "bob@test.com"
                },
                new User
                {
                    DisplayName = "Jane",
                    UserName = "jane",
                    Email = "jane@test.com"
                },
                new User
                {
                    DisplayName = "Tom",
                    UserName = "tom",
                    Email = "tom@test.com"
                },
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

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
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[0],
                            IsHost = true
                        }
                    }
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    Location = "Paris",
                    Venue = "The Louvre",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[0],
                            IsHost = true
                        },
                        new ActivityAttendee
                        {
                            User = users[1],
                            IsHost = false
                        },
                    }
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "music",
                    Location = "London",
                    Venue = "Wembly Stadium",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[2],
                            IsHost = true
                        },
                        new ActivityAttendee
                        {
                            User = users[1],
                            IsHost = false
                        },
                    }
                },
                new Activity
                {
                    Title = "Future Activity 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "food",
                    Location = "London",
                    Venue = "Jamies Italian",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[0],
                            IsHost = true
                        },
                        new ActivityAttendee
                        {
                            User = users[2],
                            IsHost = false
                        },
                    }
                },
                new Activity
                {
                    Title = "Future Activity 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "drinks",
                    Location = "London",
                    Venue = "Pub",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[1],
                            IsHost = true                            
                        },
                        new ActivityAttendee
                        {
                            User = users[0],
                            IsHost = false                            
                        },
                    }
                },
                new Activity
                {
                    Title = "Future Activity 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "culture",
                    Location = "London",
                    Venue = "British Museum",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[1],
                            IsHost = true                            
                        }
                    }
                },
                new Activity
                {
                    Title = "Future Activity 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "drinks",
                    Location = "London",
                    Venue = "Punch and Judy",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[0],
                            IsHost = true                            
                        },
                        new ActivityAttendee
                        {
                            User = users[1],
                            IsHost = false                            
                        },
                    }
                },
                new Activity
                {
                    Title = "Future Activity 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "music",
                    Location = "London",
                    Venue = "O2 Arena",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[2],
                            IsHost = true                            
                        },
                        new ActivityAttendee
                        {
                            User = users[1],
                            IsHost = false                            
                        },
                    }
                },
                new Activity
                {
                    Title = "Future Activity 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Activity 7 months in future",
                    Category = "travel",
                    Location = "Berlin",
                    Venue = "All",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[0],
                            IsHost = true                            
                        },
                        new ActivityAttendee
                        {
                            User = users[2],
                            IsHost = false                            
                        },
                    }
                },
                new Activity
                {
                    Title = "Future Activity 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "drinks",
                    Location = "London",
                    Venue = "Pub",
                    Attendees = new List<ActivityAttendee>
                    {
                        new ActivityAttendee
                        {
                            User = users[2],
                            IsHost = true                            
                        },
                        new ActivityAttendee
                        {
                            User = users[1],
                            IsHost = false                            
                        },
                    }
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}