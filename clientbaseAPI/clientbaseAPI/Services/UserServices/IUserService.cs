using clientbaseAPI.DTOs.Responses;
using clientbaseAPI.Models;

namespace clientbaseAPI.Services.UserServices
{
    public interface IUserService
    {
        public User? Get(int userId);
        public List<UserResponse> GetAll();
        public User Create(User user);
        public User Update(User user);
        public User Remove(User user);
        public void Remove(List<int> userIds);
    }
}
