using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace clientbaseAPI.Models
{
    [Table("ContactPhones")]
    public class ContactPhone
    {
        [Key] 
        public int ContactPhoneId { get; set; }

        [Required] 
        public PhoneType PhoneType { get; set; }

        [Required] 
        [MaxLength(48)] 
        public string PhoneNumber { get;set; }

        [Required] 
        public int UserId { get; set; }

        public User? User { get; set; }

        public ContactPhone(PhoneType phoneType, string phoneNumber)
        {
            PhoneType = phoneType;
            PhoneNumber = phoneNumber;
        }

        public ContactPhone(PhoneType phoneType, string phoneNumber, int userId) : this(phoneType: phoneType, phoneNumber: phoneNumber)
        {
            UserId = userId;
        }
    }

    public enum PhoneType
    {
        Mobile = 1,
        Home = 2,
        Work = 3
    }
}
