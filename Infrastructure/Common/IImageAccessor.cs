using Domain.Entities.Images;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Common;

public interface IImageAccessor
{
    Task<ImageUploadResult?> AddImage(IFormFile file);

    Task<string?> DeleteImage(string publicId);
}