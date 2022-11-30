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
            b.HasKey(uu => new
            {
                uu.ObserverId,
                uu.TargetId
            }));
        
        builder.Entity<UserFollowing>()
            .HasOne(uu => uu.Observer)
            .WithMany(u => u.Followings)
            .HasForeignKey(uu => uu.ObserverId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<UserFollowing>()
            .HasOne(uu => uu.Target)
            .WithMany(u => u.Followers)
            .HasForeignKey(uu => uu.TargetId)
            .OnDelete(DeleteBehavior.Cascade); 
        
        base.OnModelCreating(builder);
    }
}