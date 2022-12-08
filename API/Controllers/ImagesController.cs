using Application.Images;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ImagesController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] Add.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] string id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }

    [HttpPost("{id}/[action]")]
    public async Task<IActionResult> SetMain([FromRoute] string id)
    {
        return HandleResult(await Mediator.Send(new SetMain.Command { Id = id }));
    }
}