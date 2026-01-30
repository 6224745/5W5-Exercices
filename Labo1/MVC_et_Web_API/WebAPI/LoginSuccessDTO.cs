using System.ComponentModel.DataAnnotations;

namespace WebAPI
{
    public class LoginSuccessDTO
    {
        [Required]
        public string Token { get; set; } = "";
    }
}
