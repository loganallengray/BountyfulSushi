using BountyfulSushi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using BountyfulSushi.Repositories;

namespace BountyfulSushi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            return Ok(_userRepository.GetAll());
        }

        [HttpGet("usertypes")]
        public IActionResult GetUserTypes()
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            return Ok(_userRepository.GetUserTypes());
        }

        [HttpGet("{fireBaseId}")]
        public IActionResult GetUser(string fireBaseId)
        {
            return Ok(_userRepository.GetByFireBaseId(fireBaseId));
        }

        [HttpGet("details/{id}")]
        public IActionResult GetUserById(int id)
        {
            return Ok(_userRepository.GetByUserId(id));
        }

        [HttpGet("DoesUserExist/{fireBaseId}")]
        public IActionResult DoesUserExist(string fireBaseId)
        {
            var user = _userRepository.GetByFireBaseId(fireBaseId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            user.UserType = new UserType()
            {
                Id = 2,
                Name = "User"
            };
            user.Locked = false;

            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { fireBaseId = user.FireBaseId },
                user);
        }

        [HttpPut("{id}")]
        public IActionResult Put(User user)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _userRepository.Update(user);
            return NoContent();
        }

        [HttpPut("togglelock/{id}")]
        public IActionResult ToggleLock(int id)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _userRepository.ToggleLock(id);
            return NoContent();
        }


        [HttpGet("Me")]
        public IActionResult Me()
        {
            var user = GetCurrentUser();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        private User GetCurrentUser()
        {
            var fireBaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseId(fireBaseId);
        }
    }
}
