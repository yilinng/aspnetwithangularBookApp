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
      
        public UserService(BookContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }


        public async Task<ActionResult<SignupResponse>> Create(User user)
        {
           
           // if (!FindByEmail(user.Email))
            //{
                _context.User.Add(user);
                await _context.SaveChangesAsync();

                SignupResponse response = new SignupResponse
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Message = "signup successfully."
                };

                return response;
           // }
            //return null;
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
                        Id = findUser.User_Id,
                        UserName = findUser.UserName,
                        Email = findUser.Email,
                        RefreshToken = token,
                        Message = "login successfully."
                    };

                    return response; 
                }
                return null;
            }

            return null;
        }
        public bool FindByEmail(string email)
            {
                return _context.User.Find().Email.Contains(email);
            }

        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.User_Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public User GetById(string id)
        {
            return _context.User.Where(item => item.User_Id == int.Parse(id)).FirstOrDefault();//_customers.Find(user => user.Id == id).FirstOrDefault();
        }

    }


}
