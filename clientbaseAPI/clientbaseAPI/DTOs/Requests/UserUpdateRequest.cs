namespace clientbaseAPI.DTOs.Requests
{
    public record UserUpdateRequest(
        int UserId,
        string? Name,
        string? Surname,
        string? Email,
        string? Country,
        string? City,
        string? AddressLine,
        string? MobilePhoneNumber,
        string? HomePhoneNumber,
        string? WorkPhoneNumber);
}
