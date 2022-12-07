using Application.Profiles;
using Domain.Enums;
using Domain.Enums.Filtering;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile([FromRoute] string username)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
    }
    
    [HttpPut]
    public async Task<IActionResult> EditProfile([FromBody] Edit.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }
    
    [HttpGet("{username}/activities")]
    public async Task<IActionResult> GetUserActivities([FromRoute] string username,
        [FromQuery] ProfileActivityFilter filter)
    {
        return HandleResult(await Mediator.Send(new ListActivities.Query
        {
            Username = username,
            Filter = filter
        }));
    }

    [NonAction]
    private static TEnum GetEnumValueOrDefault<TEnum>(string? value)
    {
        Enum.TryParse(typeof(TEnum), value, out var filterEnum);
        return (TEnum) (filterEnum ?? default(TEnum)!);
    }
}