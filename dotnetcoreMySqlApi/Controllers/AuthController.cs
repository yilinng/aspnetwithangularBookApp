using dotnetcoreMySqlApi.Helpers;
using dotnetcoreMySqlApi.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace dotnetcoreMySqlApi.Controllers
{
    [EnableCors("CorsApi")]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public readonly UserService _userService;
        private readonly ILogger _logger;

        public AuthController(UserService userService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("users")]
        public IActionResult GetUser()
        {
            var users = _userService.GetUsers();
            return Ok(new { success = true, users });
        }


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _logger.LogInformation("User {Name} logged out at {Time}.",
               User.Identity.Name, DateTime.UtcNow);

            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { success = true });
        }

    }
}
