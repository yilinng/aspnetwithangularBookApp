using dotnetcoreMySqlApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using dotnetcoreMySqlApi.Entities;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Cors;

namespace dotnetcoreMySqlApi.Controllers
{
    [EnableCors("CorsApi")]
    [ApiController]
    [Route("api/[controller]")]
    public class SignupController : ControllerBase
    {
        public readonly UserService _userService;
        private readonly ILogger _logger;

        public SignupController(UserService userService, ILogger<SignupController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Index(User itemUser)
        {
            var response = await _userService.Create(itemUser);

            if (response == null)
            {
                return BadRequest(new { message = "Email is exist, please try again." });
            }

            _logger.LogInformation("User {Name} signup in at {Time}.",
            response.ToString(), DateTime.UtcNow);

            return Ok(response);
        }
    }
}
