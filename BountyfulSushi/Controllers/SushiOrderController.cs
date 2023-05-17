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
            var currentUser = GetCurrentUser();

            _sushiOrderRepository.Add(sushiOrder);
            return CreatedAtAction("Get", new { id = sushiOrder.Id }, sushiOrder);
        }

        // PUT api/<SushiOrderController>/5
        [HttpPut("{id}")]
        public IActionResult Put(SushiOrder sushiOrder)
        {
            var currentUser = GetCurrentUser();

            _sushiOrderRepository.Update(sushiOrder);
            return NoContent();
        }

        // DELETE api/<SushiOrderController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUser();

            _sushiOrderRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var fireBaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseId(fireBaseId);
        }
    }
}
