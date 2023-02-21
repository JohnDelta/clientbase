namespace clientbaseAPI.DTOs.Requests
{
    public record UserCreateRequest(
        string Name,
        string Surname,
        string Email,
        string Country,
        string City,
        string AddressLine,
        string MobilePhoneNumber,
        string HomePhoneNumber,
        string WorkPhoneNumber);
}
