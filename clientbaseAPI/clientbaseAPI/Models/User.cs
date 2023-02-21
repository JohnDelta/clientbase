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
        [MaxLength(48)] 
        public string Name { get; set; }

        [Required] 
        [MaxLength(48)] 
        public string Surname { get; set; }

        [Required] 
        [MaxLength(48)] 
        public string Email { get; set; }

        [Required] 
        [MaxLength(48)] 
        public string Country { get; set; }

        [Required] 
        [MaxLength(48)] 
        public string City { get; set; }

        [MaxLength(48)] 
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

        public User(
            string name,
            string surname,
            string email,
            string country,
            string city,
            string addressLine,
            List<ContactPhone> contactPhones) : this(name, surname, email, country, city, addressLine)
        {
            ContactPhones = contactPhones;
        }

        public User(
            string name,
            string surname,
            string email,
            string country,
            string city,
            string addressLine,
            int userId,
            List<ContactPhone> contactPhones) : this(name, surname, email, country, city, addressLine, contactPhones)
        {
            UserId = userId;
        }

        
    }
}
