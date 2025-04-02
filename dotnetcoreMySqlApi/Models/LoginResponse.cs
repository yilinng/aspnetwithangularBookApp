using Newtonsoft.Json;
using System.Collections.Generic;

namespace dotnetcoreMySqlApi.Entities
{
    public class LoginResponse
    {
        [JsonProperty(PropertyName = "id")]
        public int User_Id { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }

        [JsonProperty(PropertyName = "refreshToken")]
        public string RefreshToken { get; set; }

        public Role.Value Role { get; set; }
    }
}
