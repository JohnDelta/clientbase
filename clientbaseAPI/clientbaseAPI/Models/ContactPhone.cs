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
        public int UserId { get; set; }

        public User? User { get; set; }

        public ContactPhone(PhoneType phoneType, int userId)
        {
            PhoneType = phoneType;
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
