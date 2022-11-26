namespace Domain.Exceptions;

public class ImageUploadException : Exception
{
    public ImageUploadException()
    {

    }

    public ImageUploadException(string message) : base(message)
    {

    }
}