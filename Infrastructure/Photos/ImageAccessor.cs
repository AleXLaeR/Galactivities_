using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Domain.Exceptions;
using Infrastructure.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using ImageUploadResult = Domain.Entities.Images.ImageUploadResult;

namespace Infrastructure.Photos;

public class ImageAccessor : IImageAccessor
{
    private readonly Cloudinary _cloudinary;

    public ImageAccessor(IOptions<CloudinarySettings> config)
    {
        _cloudinary = new Cloudinary(new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        ));
    }

    public async Task<ImageUploadResult?> AddImage(IFormFile file)
    {
        if (file.Length == default)
            return null;

        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Transformation = new Transformation()
                .Height(500)
                .Width(500)
                .Crop("fill")
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error is not null)
        {
            throw new ImageUploadException(uploadResult.Error.Message);
        }

        return new ImageUploadResult
        {
            PublicId = uploadResult.PublicId,
            Uri = uploadResult.SecureUrl.ToString()
        };
    }

    public async Task<string?> DeleteImage(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);

        return (result.Result is "ok") ? result.Result : null;
    }
}