using API.Extensions;
using Application.Core;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator _mediator;

    protected IMediator Mediator => _mediator ??=
        HttpContext.RequestServices.GetService<IMediator>()!;

    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess)
        {
            return (result.Value is null) ?
                NotFound("Found result matching null") : Ok(result.Value);
        }

        return BadRequest(result.Reasons);
    }
    
    protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
    {
        if (!result.IsSuccess)
            return BadRequest(result.Reasons);

        if (result.Value is null)
            return NotFound("Found result matching null");
        
        Response.AddPaginationHeader(
            result.Value!.CurrentPage,
            result.Value.PageSize,
            result.Value.TotalCount,
            result.Value.TotalPages
        );
        
        return Ok(result.Value);
    }
}