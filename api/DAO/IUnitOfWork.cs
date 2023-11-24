using api.Entities;

namespace api.DAO
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();

        GenericRepository<Product> ProductRepository { get;}
        GenericRepository<ProductBrand> ProductBrandRepository { get;}
        GenericRepository<ProductType> ProductTypeRepository { get;}
    }
}
