namespace clientbaseAPI.DTOs.Requests
{
    public record UserRequest(
        string Name,
        string Surname,
        string Email,
        string Country,
        string City,
        string AddressLine,
        string MobilePhoneNumber,
        string HomePhoneNumber,
        string WorkPhoneNumber,
        int UserId = -1);
}
