using Domain.Entities;
using Domain.Entities.Activities;
using Domain.Entities.Junctions;
using Domain.Entities.Users;
using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Attendance;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(aa => aa.User)
                .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);
            
            if (activity is null)
                return Result.Fail(new Error("Cannot find an activity to delete"));

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(), cancellationToken);

            //if (user is null)
            //    return Result.Fail(new Error("Cannot find a user"));

            var hostUsername = activity.Attendees.FirstOrDefault(aa => aa.IsHost)?.User.UserName;
            
            var attendanceStatus = activity.Attendees.FirstOrDefault(aa => aa.User.UserName == user.UserName);

            Handler.OnNewAttendance(attendanceStatus, user, activity);
            
            if (hostUsername == user.UserName)
            {
                activity.IsCancelled = !activity.IsCancelled;
            }
            else if (attendanceStatus is not null && hostUsername != user.UserName)
            {
                activity.Attendees.Remove(attendanceStatus);
            }

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result.Ok(Unit.Value) : Result.Fail(new Error("Problem updating an attendance"));
        }

        private static void OnNewAttendance(ActivityAttendee? attendanceStatus, User user, Activity activity)
        {
            if (attendanceStatus is null)
            {
                activity.Attendees.Add(new ActivityAttendee
                {
                    User = user,
                    Activity = activity,
                    IsHost = default,
                });
            }
        }
    }
}