using dotnetcoreMySqlApi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetcoreMySqlApi.Entities;

namespace dotnetcoreMySqlApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignupController : ControllerBase
    {
        public readonly UserService _userService;

        public SignupController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Index(User itemUser)
        {
            var response = await _userService.Create(itemUser);

            if (response == null)
            {
                return BadRequest(new { message = "Email is exist, please try again." });
            }

            return Ok(response);
        }
    }
}
