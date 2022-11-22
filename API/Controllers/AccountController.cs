using API.Services.Token;
using Domain.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ITokenService _tokenService;

    public AccountController(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpPost("Login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
    {
        var currentUser = await _userManager.FindByEmailAsync(loginDto.Email);

        if (currentUser is null)
            return Unauthorized($"Sorry, but E-Mail {loginDto.Email} does not exist in our database");

        var result = await _signInManager.CheckPasswordSignInAsync(currentUser, loginDto.Password, default);

        if (result.Succeeded)
        {
            return new UserDto
            {
                DisplayName = currentUser.DisplayName,
                ImageUri = null,
                Token = _tokenService.GetJwtToken(currentUser),
                Username = currentUser.UserName,
            };
        }

        return Unauthorized("Sorry, bad password");
    }
}