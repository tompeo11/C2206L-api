using api.DAO;
using api.DTO;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Linq;
using System.Linq.Expressions;
using api.Helper;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public ProductController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<Product>> GetProducts(
            [FromQuery] ProductRequestParams productRequestParams,
            [FromQuery] PaginationParams pagination) 
        {
            Func<IQueryable<Product>, IOrderedQueryable<Product>> sortQuery = productRequestParams.sort switch
            {
                "priceAsc" => p => p.OrderBy(i => i.Price),
                "priceDesc" => p => p.OrderByDescending(i => i.Price),
                "typeAsc" => p => p.OrderBy(i => i.ProductType.Id),
                "typeDesc" => p => p.OrderByDescending(i => i.ProductType.Id),
                "brandAsc" => p => p.OrderBy(i => i.ProductBrand.Id),
                "brandDesc" => p => p.OrderByDescending(i => i.ProductBrand.Id),
                _ => p => p.OrderBy(i => i.Id)
            };

            IQueryable<Product> query = _unitOfWork.ProductRepository.QueryWithCondition(
                filter: x => (!productRequestParams.typeId.HasValue || x.ProductTypeId == productRequestParams.typeId) && (!productRequestParams.brandId.HasValue || x.ProductBrandId == productRequestParams.typeId),
                orderBy: sortQuery,
                includeProperties: "ProductType,ProductBrand"
            );

            int totalRecord = query.Count();

            query = query.Skip(pagination.PageSize * (pagination.PageNumber - 1)).Take(pagination.PageSize);

            List<ReturnProduct> returnData = _mapper.Map<List<Product>, List<ReturnProduct>>(query.ToList());



            return Ok(new PagedList<ReturnProduct>(
                pagination.PageNumber,
                pagination.PageSize,
                totalRecord,
                returnData
            ));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Product>>> GetSingleProduct(int id) 
        {
            var query = await _unitOfWork.ProductRepository.GetEntities(
                filter: i => i.Id == id,
                orderBy: null,
                includeProperties: "ProductType,ProductBrand"
            );

            Product products = query.FirstOrDefault();

            ReturnProduct dto = _mapper.Map<ReturnProduct>(products);

            return Ok(dto);

            // return Ok(new ReturnProduct
            // {
            //     Id = products.Id,
            //     Name = products.Name,
            //     Description = products.Description,
            //     Price = products.Price,
            //     PictureUrl = products.PictureUrl,
            //     ProductBrand = products.ProductBrand.Name,
            //     ProductType = products.ProductType.Name
            // });
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands() 
        {
            IEnumerable<ProductBrand> productBrands= await _unitOfWork.ProductBrandRepository.GetAll();
            
            return Ok(productBrands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes() 
        {
            IEnumerable<ProductType> productTypes = await _unitOfWork.ProductTypeRepository.GetAll();
            
            return Ok(productTypes);
        }
    }
}