using Domain.Entities.Images;
using FluentResults;
using Infrastructure.Common;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images;

public class Add
{
    public class Command : IRequest<Result<Image>>
    {
        public IFormFile File { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Image>>
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
        
        public async Task<Result<Image>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(u => u.Images)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(), cancellationToken);

            if (user is null)
                return Result.Fail(new Error("Cannot find a user"));

            var imageUploadResult = await _imageAccessor.AddImage(request.File);

            if (imageUploadResult is null)
                return Result.Fail(new Error("Cannot add an image"));
            
            var image = new Image
            {
                Id = imageUploadResult.PublicId,
                Uri = imageUploadResult.Uri
            };

            if (!user.Images.Any(i => i.IsMain))
            {
                image.IsMain = true;
            }
            user.Images.Add(image);
            
            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(image) : Result.Fail(new Error("Failed to upload an image"));
        }
    }
}