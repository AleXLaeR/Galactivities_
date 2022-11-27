using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images;

public class SetMain
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
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
                .Include(u => u.Images)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(), cancellationToken);

            if (user is null)
                return Result.Fail(new Error("Cannot find a user"));
            
            var imageToSet = user.Images.FirstOrDefault(i => i.Id == request.Id.ToString());
            
            if (imageToSet is null)
                return Result.Fail(new Error("Cannot find an image"));

            var mainImage = user.Images.FirstOrDefault(i => i.IsMain);

            if (mainImage is not null)
            {
                mainImage.IsMain = false;
            }
            imageToSet.IsMain = true;
            
            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(Unit.Value) : Result.Fail(new Error("Failed update main image"));
        }
    }
}