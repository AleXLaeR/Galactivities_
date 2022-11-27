using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
    {
        public string DisplayName { get; set; }

        public string? Biography { get; set; }
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
            if (String.IsNullOrEmpty(request.DisplayName))
                return Result.Fail(new Error("Display Name cannot be empty"));
            
            var user = await _context.Users
                .Include(u => u.Images)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(), cancellationToken);
            
            if (user is null)
                return Result.Fail(new Error("Cannot find a user"));
            
            user.DisplayName = request.DisplayName;
            user.Biography = request.Biography ?? user.Biography;

            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(Unit.Value) : Result.Fail(new Error("Failed to edit a profile"));
        }
    }
}