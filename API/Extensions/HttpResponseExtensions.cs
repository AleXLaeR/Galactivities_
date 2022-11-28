using System.Text.Json;

namespace API.Extensions;

public static class HttpResponseExtensions
{
    public static void AddPaginationHeader(this HttpResponse httpResponse,
        int currentPage, int itemsPerPage, int totalItems, int totalPages)
    {
        var paginationHeader = new
        {
            currentPage,
            itemsPerPage,
            totalItems,
            totalPages,
        };

        const string headerKeyName = "Pagination";
        
        httpResponse.Headers.Add( headerKeyName, JsonSerializer.Serialize(paginationHeader));
        httpResponse.Headers.Add("Access-Control-Expose-Headers", headerKeyName);
    }
}