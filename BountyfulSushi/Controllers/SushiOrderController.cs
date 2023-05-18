using BountyfulSushi.Models;
using BountyfulSushi.Repositories;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BountyfulSushiOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SushiOrderController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ISushiOrderRepository _sushiOrderRepository;
        public SushiOrderController(ISushiOrderRepository sushiOrderRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _sushiOrderRepository = sushiOrderRepository;
        }

        // GET: api/<SushiOrderController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_sushiOrderRepository.GetAll());
        }

        // GET api/<SushiOrderController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_sushiOrderRepository.GetById(id));
        }

        // POST api/<SushiOrderController>
        [HttpPost]
        public IActionResult Post(SushiOrder sushiOrder)
        {
            _sushiOrderRepository.Add(sushiOrder);
            return CreatedAtAction("Get", new { id = sushiOrder.Id }, sushiOrder);
        }

        // PUT api/<SushiOrderController>/5
        [HttpPut("complete/{id}")]
        public IActionResult Complete(SushiOrder sushiOrder)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id == 1)
            {
                _sushiOrderRepository.Complete(sushiOrder);
                return NoContent();
            }

            return Unauthorized();
        }

        // DELETE api/<SushiOrderController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(SushiOrder sushiOrder)
        {
            var currentUser = GetCurrentUser();

            if (currentUser.UserType.Id == 1)
            {
                _sushiOrderRepository.Delete(sushiOrder);
                return NoContent();
            }

            return Unauthorized();
        }

        private User GetCurrentUser()
        {
            var fireBaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseId(fireBaseId);
        }
    }
}
