using Domain.Entities;
using Domain.Entities.Activities;
using Domain.Entities.Junctions;
using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; } 
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
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            request.Activity.Attendees.Add(new ActivityAttendee
            {
                User = user!,
                Activity = request.Activity,
                IsHost = true,
            });
            
            _context.Activities.Add(request.Activity);
            
            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(Unit.Value) : Result.Fail(new Error("Failed to create an activity"));
        }
    }
}