import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import getProducts from '../../service/productService'
import getSellers from '../../service/sellerService'
import './SellerPage.css'

const SELLERS_PER_PAGE = 6

export const SellerPage = () => {
  const [sellers, setSellers] = useState([])
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCurrent = true

    const fetchCatalog = async () => {
      try {
        const [sellerData, productData] = await Promise.all([
          getSellers(),
          getProducts(),
        ])

        if (isCurrent) {
          setSellers(sellerData)
          setProducts(productData)
        }
      } catch (fetchError) {
        if (isCurrent) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Une erreur est survenue lors du chargement des vendeurs.',
          )
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    fetchCatalog()

    return () => {
      isCurrent = false
    }
  }, [])

  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase('fr')
  const filteredSellers = sellers.filter(seller =>
    seller.name.toLocaleLowerCase('fr').includes(normalizedSearchTerm),
  )
  const totalPages = Math.ceil(filteredSellers.length / SELLERS_PER_PAGE)
  const currentSellers = filteredSellers.slice(
    (currentPage - 1) * SELLERS_PER_PAGE,
    currentPage * SELLERS_PER_PAGE,
  )
  const productsById = new Map(
    products.map(product => [String(product.id), product]),
  )

  return (
    <>
      <NavBar />
      <main className='container mt-5 seller-catalog'>
        <h1 className='seller-catalog-title'>Nos vendeurs</h1>
        <div className='seller-search'>
          <label className='visually-hidden' htmlFor='seller-search-input'>
            Rechercher un vendeur
          </label>
          <input
            id='seller-search-input'
            className='form-control seller-search-input'
            type='search'
            placeholder='Rechercher un vendeur...'
            value={searchTerm}
            onChange={event => {
              setSearchTerm(event.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        {isLoading && <p className='seller-catalog-message' role='status'>Chargement des vendeurs...</p>}
        {error && <p className='seller-catalog-message seller-catalog-error' role='alert'>{error}</p>}

        {!isLoading && !error && (
          <>
            <div className='row gy-4 seller-grid'>
              {currentSellers.map(seller => {
                const inventory = Array.isArray(seller.Beans_stock)
                  ? seller.Beans_stock
                  : []
                const totalStock = inventory.reduce(
                  (total, item) => total + Number(item.stock || 0),
                  0,
                )

                return (
                  <div className='col-12 col-sm-6 col-lg-4' key={seller.id}>
                    <article className='seller-card'>
                      <img
                        src={seller.image}
                        className='seller-card-image'
                        alt={seller.name}
                      />
                      <div className='seller-card-content'>
                        <h2 className='seller-card-title'>{seller.name}</h2>
                        <p className='seller-card-stock'>
                          {totalStock} article{totalStock === 1 ? '' : 's'} en stock
                        </p>
                        <h3 className='seller-inventory-title'>Inventaire</h3>
                        {inventory.length > 0 ? (
                          <ul className='seller-inventory'>
                            {inventory.map((item, index) => {
                              const product = productsById.get(String(item.id_beans))
                              return (
                                <li key={`${item.id_beans}-${index}`}>
                                  <span>{product?.name || `Produit #${item.id_beans}`}</span>
                                  <span className='seller-inventory-quantity'>
                                    x{item.stock}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        ) : (
                          <p className='seller-inventory-empty'>Aucun produit en stock.</p>
                        )}
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>

            {filteredSellers.length === 0 && (
              <p className='seller-catalog-message'>Aucun vendeur trouvé.</p>
            )}

            {totalPages > 1 && (
              <nav aria-label='Pagination des vendeurs'>
                <ul className='pagination justify-content-center mt-4'>
                  <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                    <button
                      type='button'
                      className='page-link'
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      aria-label='Page précédente'
                    >
                      Précédent
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1
                    return (
                      <li
                        className={`page-item${currentPage === page ? ' active' : ''}`}
                        key={page}
                      >
                        <button
                          type='button'
                          className='page-link'
                          onClick={() => setCurrentPage(page)}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      </li>
                    )
                  })}
                  <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                    <button
                      type='button'
                      className='page-link'
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      aria-label='Page suivante'
                    >
                      Suivant
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </main>
    </>
  )
}
