using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;
using System.Collections.Generic;
using BountyfulSushi.Repositories.Interfaces;
using BountyfulSushi.Models;
using BountyfulSushi.Repositories;

namespace BountyfulSushi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DifficultyController : ControllerBase
    {
        private readonly IDifficultyRepository _difficultyRepository;
        private readonly IUserRepository _userRepository;

        public DifficultyController(IDifficultyRepository difficultyRepository, IUserRepository userRepository)
        {
            _difficultyRepository = difficultyRepository;
            _userRepository = userRepository;
        }

        // GET: api/<DifficultyController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_difficultyRepository.GetAll());
        }

        // GET api/<DifficultyController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_difficultyRepository.GetDifficultyById(id));
        }

        // POST api/<DifficultyController>
        [HttpPost]
        public IActionResult Post(Difficulty difficulty)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _difficultyRepository.Add(difficulty);
            return CreatedAtAction("Get", new { id = difficulty.Id }, difficulty);
        }

        // PUT api/<DifficultyController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Difficulty difficulty)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _difficultyRepository.Update(difficulty);
            return NoContent();
        }

        // DELETE api/<DifficultyController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _difficultyRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var fireBaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseId(fireBaseId);
        }
    }
}
