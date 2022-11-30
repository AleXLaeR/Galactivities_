using Domain.Entities;
using Domain.Entities.Images;
using Domain.Entities.Junctions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<User>
{
    public DataContext(DbContextOptions options) : base(options)
    {
        
    }
    
    public DbSet<Activity> Activities { get; set; }

    public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

    public DbSet<Image> Images { get; set; }

    public DbSet<UserFollowing> UserFollowings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<ActivityAttendee>(b =>
            b.HasKey(aa => new
            {
                aa.UserId,
                aa.ActivityId
            }));

        builder.Entity<ActivityAttendee>()
            .HasOne(u => u.User)
            .WithMany(u => u.Activities)
            .HasForeignKey(aa => aa.UserId);
        
        builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);

        builder.Entity<UserFollowing>(b =>
        {
            b.HasKey(k => new { k.ObserverId, k.TargetId });

            b.HasOne(o => o.Observer)
                .WithMany(f => f.Followings)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

            b.HasOne(o => o.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(o => o.TargetId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        base.OnModelCreating(builder);
    }
}