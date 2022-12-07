using Domain.Entities.Photos;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Interfaces;

public interface IImageAccessor
{
    Task<ImageUploadResult?> AddImage(IFormFile file);

    Task<string?> DeleteImage(string publicId);
}