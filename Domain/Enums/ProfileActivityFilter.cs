using System.Text.Json.Serialization;

namespace Domain.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))] 
public enum ProfileActivityFilter : byte
{
    Future,
    Hosting,
    Past,
    None,
}