using Domain.Entities.Junctions;
using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public string TargetUsername { get; set; }
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
            var observer = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(), cancellationToken);
            
            var target = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == request.TargetUsername, cancellationToken);

            if (target is null)
                return Result.Fail(new Error("User with that username cannot be found"));

            var following = await _context.UserFollowings
                .FindAsync(new object[] {observer!.Id, target.Id }, cancellationToken);

            if (following is null)
            {
                following = new UserFollowing
                {
                    Observer = observer,
                    Target = target
                };
                
                _context.UserFollowings.Add(following);
            }
            else
            {
                _context.UserFollowings.Remove(following);
            }
            
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result.Ok(Unit.Value) : Result.Fail(new Error("Problem following target user"));
        }
    }
}