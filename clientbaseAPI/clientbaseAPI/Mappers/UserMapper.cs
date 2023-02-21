using clientbaseAPI.DTOs.Requests;
using clientbaseAPI.DTOs.Responses;
using clientbaseAPI.Models;

namespace clientbaseAPI.Mappers
{
    public class UserMapper
    {
        public static User ToUser(UserCreateRequest userRequest)
        {
            List<ContactPhone> contactPhones = new()
            {
                new ContactPhone(phoneType: PhoneType.Mobile, phoneNumber: userRequest.MobilePhoneNumber),
                new ContactPhone(phoneType: PhoneType.Home, phoneNumber: userRequest.HomePhoneNumber),
                new ContactPhone(phoneType: PhoneType.Work, phoneNumber: userRequest.WorkPhoneNumber)
            };
            return new User(
                name: userRequest.Name,
                surname: userRequest.Surname,
                email: userRequest.Email,
                country: userRequest.Country,
                city: userRequest.City,
                addressLine: userRequest.AddressLine,
                contactPhones: contactPhones);
        }

        public static User ToUser(UserUpdateRequest userRequest)
        {
            List<ContactPhone> contactPhones = new()
            {
                new ContactPhone(phoneType: PhoneType.Mobile, phoneNumber: userRequest.MobilePhoneNumber, userId: userRequest.UserId),
                new ContactPhone(phoneType: PhoneType.Home, phoneNumber: userRequest.HomePhoneNumber, userId: userRequest.UserId),
                new ContactPhone(phoneType: PhoneType.Work, phoneNumber: userRequest.WorkPhoneNumber, userId: userRequest.UserId)
            };
            return new User(
                name: userRequest.Name,
                surname: userRequest.Surname,
                email: userRequest.Email,
                country: userRequest.Country,
                city: userRequest.City,
                addressLine: userRequest.AddressLine,
                userId: userRequest.UserId,
                contactPhones: contactPhones);
        }

        public static UserResponse ToUserResponse(User user)
        {
            return new UserResponse(
                UserId: user.UserId,
                Name: user.Name,
                Surname: user.Surname,
                Email: user.Email,
                Country: user.Country,
                City: user.City,
                AddressLine: user.AddressLine,
                MobilePhoneNumber: user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Mobile).First().PhoneNumber,
                HomePhoneNumber: user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Home).First().PhoneNumber,
                WorkPhoneNumber: user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Work).First().PhoneNumber);
        }
    }
}
