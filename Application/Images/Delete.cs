using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IImageAccessor _imageAccessor;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context,
            IImageAccessor imageAccessor,
            IUserAccessor userAccessor)
        {
            _context = context;
            _imageAccessor = imageAccessor;
            _userAccessor = userAccessor;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(u => u.Images)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(), cancellationToken);
            
            if (user is null)
                return Result.Fail(new Error("Cannot find a user"));

            var imageToDelete = user.Images.FirstOrDefault(i => i.Id == request.Id.ToString());
            
            if (imageToDelete is null)
                return Result.Fail(new Error("Cannot find an image"));

            if (imageToDelete.IsMain)
                return Result.Fail(new Error("Cannot delete a main profile image"));

            var result = await _imageAccessor.DeleteImage(imageToDelete.Id);

            if (result is null)
                return Result.Fail("Cannot delete an image");

            user.Images.Remove(imageToDelete);
            
            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(Unit.Value) : Result.Fail(new Error("Failed to unload an image"));
        }
    }
}