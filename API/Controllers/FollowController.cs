using Application.Followers;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class FollowController : BaseApiController
{
    [HttpPost("{username}")]
    public async Task<IActionResult> Follow([FromRoute] string username)
    {
        return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUsername = username }));
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetFollows([FromRoute] string username,
        [FromQuery] FollowType followType)
    {
        return HandleResult(await Mediator.Send(new List.Query
        {
            Username = username,
            FollowType = followType,
        }));
    }
}