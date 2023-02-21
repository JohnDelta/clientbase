using System.ComponentModel.DataAnnotations;

namespace clientbaseAPI.DTOs.Responses
{
    public record UserResponse(
        [Required][Range(1, 10)] int UserId,
        [Required][Range(3, 48)] string Name,
        [Required][Range(3, 48)] string Surname,
        [Required][Range(7, 48)] string Email,
        [Required][Range(3, 48)] string Country,
        [Required][Range(3, 48)] string City,
        [Required][Range(3, 48)] string AddressLine,
        [Required][Range(3, 48)] string MobilePhoneNumber,
        [Required][Range(3, 48)] string HomePhoneNumber,
        [Required][Range(3, 48)] string WorkPhoneNumber);
}
