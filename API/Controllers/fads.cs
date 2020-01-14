using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using Application.Activities;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class fads
    {
        private readonly IMediator _mediator;
        public fads(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> list() {
            return await _mediator.Send(new List.Query());
        }
    }
}