using Application.Activities;
using Application.Attendance;
using Domain;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        return HandleResult(await Mediator.Send(new List.Query()));
    }
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult> GetActivity([FromRoute] Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
    {
        return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
    }
    
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> EditActivity([FromRoute] Guid id, [FromBody] Activity activity)
    {
         activity.Id = id;
         return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
    }
    
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteActivity([FromRoute] Guid id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }

    [HttpPost("{id:guid}/attend")]
    public async Task<IActionResult> Attend([FromRoute] Guid id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command() { Id = id }));
    }
}