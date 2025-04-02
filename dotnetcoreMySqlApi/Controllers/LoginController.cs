using dotnetcoreMySqlApi.Entities;
using dotnetcoreMySqlApi.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace dotnetcoreMySqlApi.Controllers
{
    [EnableCors("CorsApi")]
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        public readonly UserService _userService;
        private readonly ILogger _logger;

        public LoginController(UserService userService, ILogger<LoginController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        //POST login
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //https://stackoverflow.com/questions/79054372/asp-net-core-passing-my-session-authentication-login-in-localstorage
        //https://medium.com/@kumarsaikat52/session-based-authorization-in-asp-net-core-95eed1d3dded
        //https://dev.to/pbouillon/understanding-identity-in-net-2169
        //https://www.reddit.com/r/dotnet/comments/we9qx8/a_comprehensive_overview_of_authentication_in/?rdt=43011
        //https://stackoverflow.com/questions/54202190/get-authenticationproperties-in-current-httprequest-after-httpcontext-signinasyn
        //https://dotnetfullstackdev.medium.com/power-of-authentication-and-authorization-in-net-role-policy-claim-based-authorizations-5f26f5c915a1
        //login by cookie example,see below
        //https://learn.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-3.1
        [HttpPost]

        public async Task<IActionResult> Index(LoginModel loginModel)
        {

            var user = _userService.Login(loginModel);
            if (user != null)
            {
                /*
                var role = _userService.CheckisAamin(loginModel.Email) ? Role.Value.Administrator : Role.Value.User;
                
                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, loginModel.Email),
                new Claim("EmployeeNumber", "10"),
                new Claim(ClaimTypes.Role, role.ToString())
            };
                var claimsIdentity = new ClaimsIdentity(claims, "Login");

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), new AuthenticationProperties
                {
                    IsPersistent = true
                });
                */
                _logger.LogInformation("User {Name} logged in at {Time}.",
               User.Identity.Name, DateTime.UtcNow);
                return Ok(user);
                //return Redirect(ReturnUrl == null ? "/Secured" : ReturnUrl);
                //Message = $"Customer {customer.Username} added";

                //if (string.IsNullOrEmpty(HttpContext.Session.GetString(CustomerModel.SessionKeyEmail)))
                // {
                // HttpContext.Session.SetString(CustomerModel.SessionKeyEmail, customer.Email);
                // }


            }
            return BadRequest(new { message = "Username or password is incorrect." });

        }

        
    }
}
