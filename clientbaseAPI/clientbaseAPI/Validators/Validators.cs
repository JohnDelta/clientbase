using clientbaseAPI.DTOs.Requests;
using FluentValidation;
using Microsoft.IdentityModel.Tokens;

namespace clientbaseAPI.Validators
{
    public class UserCreateRequestValidator : AbstractValidator<UserCreateRequest>
    {
        public UserCreateRequestValidator()
        {
            RuleFor(u => u.Name).NotNull().NotEmpty().Length(3, 48);
            RuleFor(u => u.Surname).NotNull().NotEmpty().Length(3, 48);
            RuleFor(u => u.Email).NotNull().NotEmpty().EmailAddress().Length(7, 48);
            RuleFor(u => u.Country).NotNull().NotEmpty().Length(3, 48);
            RuleFor(u => u.City).NotNull().NotEmpty().Length(3, 48);
            RuleFor(u => u.AddressLine).NotNull().NotEmpty().Length(3, 48);
            RuleFor(u => u.MobilePhoneNumber).NotNull().NotEmpty().Length(3, 48)
                .When(u => u.HomePhoneNumber.IsNullOrEmpty() && u.WorkPhoneNumber.IsNullOrEmpty())
                .WithMessage("One of the contact numbers must be filled.");
            RuleFor(u => u.HomePhoneNumber).NotNull().NotEmpty().Length(3, 48)
                .When(u => u.MobilePhoneNumber.IsNullOrEmpty() && u.WorkPhoneNumber.IsNullOrEmpty())
                .WithMessage("One of the contact numbers must be filled."); ;
            RuleFor(u => u.WorkPhoneNumber).NotNull().NotEmpty().Length(3, 48)
                .When(u => u.HomePhoneNumber.IsNullOrEmpty() && u.MobilePhoneNumber.IsNullOrEmpty())
                .WithMessage("One of the contact numbers must be filled."); ;
        }
    }

    public class UserUpdateRequestValidator : AbstractValidator<UserUpdateRequest>
    {
        public UserUpdateRequestValidator()
        {
            RuleFor(u => u.UserId).NotNull().NotEmpty();
            RuleFor(u => u.Name).Length(3, 48).When(u => u.Name != null && u.Name.Equals("")).WithMessage("Name cannot be empty.");
            RuleFor(u => u.Surname).Length(3, 48).When(u => u.Name != null && u.Name.Equals("")).WithMessage("Surname cannot be empty."); ;
            RuleFor(u => u.Email).EmailAddress().Length(7, 48).When(u => u.Name != null && u.Name.Equals("")).WithMessage("Email cannot be empty."); ;
            RuleFor(u => u.Country).Length(3, 48).When(u => u.Name != null && u.Name.Equals("")).WithMessage("Country cannot be empty."); ;
            RuleFor(u => u.City).Length(3, 48).When(u => u.Name != null && u.Name.Equals("")).WithMessage("City cannot be empty."); ;
            RuleFor(u => u.AddressLine).Length(3, 48);
            RuleFor(u => u.MobilePhoneNumber).Length(3, 48)
                .When(u => u.HomePhoneNumber.IsNullOrEmpty() && u.WorkPhoneNumber.IsNullOrEmpty())
                .WithMessage("One of the contact numbers must be filled. The length must be in the range (3, 48)");
            RuleFor(u => u.HomePhoneNumber).Length(3, 48)
                .When(u => u.MobilePhoneNumber.IsNullOrEmpty() && u.WorkPhoneNumber.IsNullOrEmpty())
                .WithMessage("One of the contact numbers must be filled. The length must be in the range (3, 48)"); ;
            RuleFor(u => u.WorkPhoneNumber).Length(3, 48)
                .When(u => u.HomePhoneNumber.IsNullOrEmpty() && u.MobilePhoneNumber.IsNullOrEmpty())
                .WithMessage("One of the contact numbers must be filled. The length must be in the range (3, 48)"); ;
        }
    }
}
