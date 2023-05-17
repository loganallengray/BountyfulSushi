using BountyfulSushi.Models;
using BountyfulSushi.Repositories;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BountyfulSushi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SushiController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ISushiRepository _sushiRepository;
        public SushiController(ISushiRepository sushiRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _sushiRepository = sushiRepository;
        }

        // GET: api/<SushiController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_sushiRepository.GetAll());
        }

        // GET api/<SushiController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_sushiRepository.GetById(id));
        }

        // POST api/<SushiController>
        [HttpPost]
        public IActionResult Post(Sushi sushi)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _sushiRepository.Add(sushi);
            return CreatedAtAction("Get", new { id = sushi.Id }, sushi);
        }

        // PUT api/<SushiController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Sushi sushi)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _sushiRepository.Update(sushi);
            return NoContent();
        }

        // DELETE api/<SushiController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id != 1)
            {
                return Unauthorized();
            }

            _sushiRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var fireBaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseId(fireBaseId);
        }
    }
}
