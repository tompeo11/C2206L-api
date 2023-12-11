using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DAO;
using api.Entities;
using api.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuggyController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public BuggyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ErrorResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetValidationError(int id)
        {
            return Ok();
        }

        [HttpGet("servererror")]
        public async Task<ActionResult>  GetServerError()
        {
            Product notFoundProduct = await _unitOfWork.ProductRepository.GetEntityById(1000);
            return Ok(notFoundProduct.ToString());
        }
    }
}