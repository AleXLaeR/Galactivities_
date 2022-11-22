using API.Services.Token;
using Domain.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[AllowAnonymous]
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
                ImageUri = default,
                Token = _tokenService.GetJwtToken(currentUser),
                Username = currentUser.UserName,
            };
        }

        return Unauthorized("Sorry, bad password");
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
    {
        if (await _userManager.Users.AnyAsync(u => u.Email == registerDto.Email))
        {
            return BadRequest("Sorry, E-Mail was already taken.");
        }
        if (await _userManager.Users.AnyAsync(u => u.UserName == registerDto.Username))
        {
            return BadRequest("Sorry, Username was already taken.");
        }

        var user = new User
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.Username,
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                ImageUri = default,
                Token = _tokenService.GetJwtToken(user),
                Username = user.UserName,
            };
        }

        return BadRequest("Sorry, There was a problem creating a user.");
    }
}