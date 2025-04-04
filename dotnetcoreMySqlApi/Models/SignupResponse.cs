﻿using Newtonsoft.Json;
using System.Collections.Generic;

namespace dotnetcoreMySqlApi.Entities
{
    public class SignupResponse
    {
        [JsonProperty(PropertyName = "username")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }

        public Role.Value Role { get; set; }
    }
}
