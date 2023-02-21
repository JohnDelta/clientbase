using clientbaseAPI.DTOs.Requests;
using clientbaseAPI.DTOs.Responses;
using clientbaseAPI.Exceptions;
using clientbaseAPI.Mappers;
using clientbaseAPI.Models;
using clientbaseAPI.Services.UserServices;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace clientbaseAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IValidator<UserCreateRequest> _userCreateRequestValidator;
        private readonly IValidator<UserUpdateRequest> _userUpdateRequestValidator;

        public UserController(
            IUserService userService, 
            IValidator<UserCreateRequest> userCreateRequestValidator, 
            IValidator<UserUpdateRequest> userUpdateRequestValidator)
        {
            _userService = userService;
            _userCreateRequestValidator = userCreateRequestValidator;
            _userUpdateRequestValidator = userUpdateRequestValidator;
        }

        [Route("get/all")]
        [HttpGet]
        public ActionResult<List<UserResponse>> GetAll()
        {
            return Ok(_userService.GetAll());
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<UserResponse> Create([FromBody] UserCreateRequest userRequest)
        {
            ValidationResult validationResult = _userCreateRequestValidator.Validate(userRequest);
            if (!validationResult.IsValid)
            {
                return BadRequest(
                    Results.ValidationProblem(
                        validationResult.ToDictionary(), 
                        statusCode: StatusCodes.Status400BadRequest, 
                        type: HttpStatusCode.BadRequest.ToString("F")));
            }
            User user = UserMapper.ToUser(userRequest: userRequest);
            user = _userService.Create(user: user);
            UserResponse userResponse = UserMapper.ToUserResponse(user: user);
            return Ok(userResponse);
        }

        [Route("update")]
        [HttpPut]
        public ActionResult<UserResponse> Update([FromBody] UserUpdateRequest userRequest)
        {
            ValidationResult validationResult = _userUpdateRequestValidator.Validate(userRequest);
            if (!validationResult.IsValid)
            {
                return BadRequest(
                    Results.ValidationProblem(
                        validationResult.ToDictionary(),
                        statusCode: StatusCodes.Status400BadRequest,
                        type: HttpStatusCode.BadRequest.ToString("F")));
            }
            User user = UserMapper.ToUser(userRequest: userRequest);
            user = _userService.Update(user: user);
            UserResponse userResponse = UserMapper.ToUserResponse(user: user);
            return Ok(userResponse);
        }

        [Route("remove")]
        [HttpDelete]
        public ActionResult<UserResponse> Remove([FromBody] int userId)
        {
            User? user = _userService.Get(userId: userId);
            if (user == null) throw APIExceptions.UserNotFound;
            user = _userService.Remove(user: user);
            UserResponse userResponse = UserMapper.ToUserResponse(user: user);
            return Ok(userResponse);
        }

    }
}
