using System.Text.Json.Serialization;

namespace Domain.Enums.Filtering;

[JsonConverter(typeof(JsonStringEnumConverter))] 
public enum ProfileActivityFilter : byte
{
    Future,
    Hosting,
    Past,
    None,
}