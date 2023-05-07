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
    public class BountyController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IBountyRepository _bountyRepository;
        public BountyController(IBountyRepository bountyRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _bountyRepository = bountyRepository;
        }

        // GET: api/<BountyController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bountyRepository.GetAll());
        }

        // GET api/<BountyController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_bountyRepository.GetBountyById(id));
        }

        [HttpGet("user/{userid}")]
        public IActionResult GetUserBounties(int userId)
        {
            return Ok(_bountyRepository.GetBountiesByUserId(userId));
        }

        // POST api/<BountyController>
        [HttpPost]
        public IActionResult Post(Bounty bounty)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _bountyRepository.Add(bounty);
            return CreatedAtAction("Get", new { id = bounty.Id }, bounty);
        }

        // PUT api/<BountyController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Bounty bounty)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _bountyRepository.Update(bounty);
            return NoContent();
        }

        // DELETE api/<BountyController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _bountyRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var fireBaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseId(fireBaseId);
        }
    }
}
