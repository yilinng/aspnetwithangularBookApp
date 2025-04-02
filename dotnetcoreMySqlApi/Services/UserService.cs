using dotnetcoreMySqlApi.Data;
using dotnetcoreMySqlApi.Entities;
using dotnetcoreMySqlApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

//https://learn.microsoft.com/en-us/ef/ef6/querying/
namespace dotnetcoreMySqlApi.Services
{
    public class UserService
    {
        private readonly BookContext _context;

        private readonly AppSettings _appSettings;

        private readonly List<User> _users;

        public UserService(BookContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _users = context.User.ToList();
           
        }


        public async Task<ActionResult<SignupResponse>> Create(User user)
        {
            var findUser = _context.User.Where(item => item.Email.Contains(user.Email)).FirstOrDefault();

            user.Role = CheckisAamin(user.Email);

            if (findUser == null)
            {
                _context.User.Add(user);
                await _context.SaveChangesAsync();

                SignupResponse response = new SignupResponse
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Message = "signup successfully.",
                    Role = CheckisAamin(user.Email)
                };

                return response;
            }
            return null;
        }

        public  ActionResult<LoginResponse> Login(LoginModel loginModel)
        {
            var findUser = _context.User.Where(item => item.Email.Contains(loginModel.Email)).FirstOrDefault();

            if (findUser != null)
            {
                bool checkUser = findUser.Password.Equals(loginModel.Password);
                if (checkUser)
                {
                    var token = GenerateJwtToken(findUser);
                    LoginResponse response = new LoginResponse
                    {
                        User_Id = findUser.User_Id,
                        UserName = findUser.UserName,
                        Email = findUser.Email,
                        RefreshToken = token,
                        Message = "login successfully.",
                        Role = CheckisAamin(findUser.Email)
                    };

                    return response; 
                }
                return null;
            }

            return null;
        }
 
        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("Email", user.Email) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public User GetByEmail(string email)
        {
            var user = _users.Where(user => user.Email == email).FirstOrDefault();

            if(user == null)
            {
                return null;
            }
            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            return _users;
        }


        public Role.Value CheckisAamin(string email)
        {

            if(email.Contains("admin"))
            {
                return Role.Value.Administrator;
            } else
            {
               return Role.Value.User;
            }

           
        }

      

    }


}
