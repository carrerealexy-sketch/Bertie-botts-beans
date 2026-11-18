import { useState, useEffect } from 'react'
import getProducts from '../../service/productService'

export const BeansPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Erreur lors de la récupération des produits', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <div className='container mt-5'>
        <h1>Beans shop</h1>
        <div className='row gy-4'>
          {products.map(product => (
            <div className='col-12 col-sm-6 col-lg-4' key={product.id}>
              <article className='bean-card'>
                <img
                  src={product.image}
                  className='bean-card-image'
                  alt={product.name}
                />
                <div className='bean-card-content'>
                  <h2 className='bean-card-title'>{product.name}</h2>
                  <p className='bean-card-description'>{product.description}</p>
                </div>
                <p className='bean-card-price'>Prix : {product.price} Gallion</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </>
  )
};
