using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace clientbaseAPI.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(24)]
        [MinLength(3)]
        public string Name { get; set; }

        [Required]
        [MaxLength(24)]
        [MinLength(3)]
        public string Surname { get; set; }

        [Required]
        [MaxLength(24)]
        [MinLength(7)]
        public string Email { get; set; }

        [Required]
        [MaxLength(24)]
        [MinLength(3)]
        public string Country { get; set; }

        [Required]
        [MaxLength(24)]
        [MinLength(3)]
        public string City { get; set; }

        [MaxLength(24)]
        [MinLength(3)]
        public string AddressLine { get; set; }

        public List<ContactPhone>? ContactPhones { get; set; }

        public User(
            string name, 
            string surname, 
            string email, 
            string country, 
            string city, 
            string addressLine)
        {
            Name = name;
            Surname = surname;
            Email = email;
            Country = country;
            City = city;
            AddressLine = addressLine;
        }
    }
}
