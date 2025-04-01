using dotnetcoreMySqlApi.Helpers;
using dotnetcoreMySqlApi.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;


namespace dotnetcoreMySqlApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("users")]
        public IActionResult GetUser()
        {
            var users = _userService.GetUsers();
            return Ok(new { success = true, users });
        }


        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { success = true });
        }

    }
}
