using clientbaseAPI.Context;
using clientbaseAPI.DTOs.Responses;
using clientbaseAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace clientbaseAPI.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly DBContext _context;

        public UserService(DBContext context)
        {
            _context = context;
        }

        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public User? Get(int userId)
        {
            return _context.Users
                    .Include(user => user.ContactPhones)
                    .Where(User => User.UserId == userId)
                    .FirstOrDefault();
        }

        public List<UserResponse> GetAll()
        {
            return _context.Users
                .Include(user => user.ContactPhones)
                .Select(user =>
                    new UserResponse(
                        user.UserId,
                        user.Name,
                        user.Surname,
                        user.Email,
                        user.Country,
                        user.City,
                        user.AddressLine,
                        user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Mobile).First().PhoneNumber,
                        user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Home).First().PhoneNumber,
                        user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Work).First().PhoneNumber))
                .ToList();
        }

        public User Update(User user)
        {
            string newMobilePhoneNumber = user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Mobile).First().PhoneNumber;
            string newWorkPhoneNumber = user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Work).First().PhoneNumber;
            string newHomePhoneNumber = user.ContactPhones.Where(phone => phone.PhoneType == PhoneType.Home).First().PhoneNumber;

            User dbUser = Get(user.UserId);
            if (user.Name != null) { dbUser.Name = user.Name; }
            if (user.Surname != null) { dbUser.Surname = user.Surname; }
            if (user.Email != null) { dbUser.Email = user.Email; }
            if (user.Country != null) { dbUser.Country = user.Country; }
            if (user.City != null) { dbUser.City = user.City; }
            if (user.AddressLine != null) { dbUser.AddressLine = user.AddressLine; }
            
            dbUser.ContactPhones.ForEach(dbPhone =>
            {
                if (dbPhone.PhoneType == PhoneType.Mobile && newMobilePhoneNumber != null)
                {
                    dbPhone.PhoneNumber = newMobilePhoneNumber;
                } else if (dbPhone.PhoneType == PhoneType.Home && newHomePhoneNumber != null)
                {
                    dbPhone.PhoneNumber = newHomePhoneNumber;
                } else if (newWorkPhoneNumber != null)
                {
                    dbPhone.PhoneNumber = newWorkPhoneNumber;
                }
                _context.ContactPhones.Update(dbPhone);
            });

            _context.Users.Update(dbUser);
            _context.SaveChanges();
            return dbUser;
        }

        public User Remove(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
            return user;
        }

        public void Remove(List<int> userIds)
        {
            using (SqlConnection conn = new SqlConnection(_context.Database.GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand("[dbo].[remove_users]", conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    var dt = new DataTable();
                    dt.Columns.Add("ID", typeof(int));

                    foreach (var id in userIds)
                    {
                        dt.Rows.Add(id);
                    }

                    var parameter = command.Parameters.AddWithValue("user_ids", dt);
                    parameter.SqlDbType = SqlDbType.Structured;
                    
                    var reader = command.ExecuteReader();
                }
                conn.Close();
                conn.Dispose();
            }

        }
    }
}
