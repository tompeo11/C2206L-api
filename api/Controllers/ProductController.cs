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
            IQueryable<Product> query = _unitOfWork.ProductRepository.QueryWithCondition(
                filter: BuildFilter(productRequestParams),
                orderBy: BuildSortQuery(productRequestParams),
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

        private Func<IQueryable<Product>, IOrderedQueryable<Product>> BuildSortQuery (ProductRequestParams productRequestParams)
        {
            return  productRequestParams.sort switch
            {
                "priceAsc" => p => p.OrderBy(i => i.Price),
                "priceDesc" => p => p.OrderByDescending(i => i.Price),
                "typeAsc" => p => p.OrderBy(i => i.ProductType.Id),
                "typeDesc" => p => p.OrderByDescending(i => i.ProductType.Id),
                "brandAsc" => p => p.OrderBy(i => i.ProductBrand.Id),
                "brandDesc" => p => p.OrderByDescending(i => i.ProductBrand.Id),
                _ => p => p.OrderBy(i => i.Name)
            };
        }

        private Expression<Func<Product, bool>> BuildFilter (ProductRequestParams productRequestParams)
        {
            string search = productRequestParams.Search;
            int? typeId = productRequestParams.typeId;
            int? brandId = productRequestParams.brandId;

            return x => (string.IsNullOrEmpty(search) || x.Name.ToLower().Contains(search))
                        && (!typeId.HasValue || x.ProductTypeId == typeId) 
                        && (!brandId.HasValue || x.ProductBrandId == typeId);
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