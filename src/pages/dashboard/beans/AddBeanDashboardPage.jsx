import { useState } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '../../../constants'
import { addProduct } from '../../../service/productService'
import './AddBeanDashboard.css'

const INITIAL_PRODUCT = {
  name: '',
  description: '',
  price: '',
  stock: '',
  Categorie: 'Beans',
  image: '',
}

export const AddBeanDashboardPage = () => {
  const [product, setProduct] = useState(INITIAL_PRODUCT)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const handleChange = event => {
    const { name, value } = event.target
    setProduct(currentProduct => ({ ...currentProduct, [name]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      await addProduct({
        ...product,
        name: product.name.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        stock: Number(product.stock),
        image: product.image.trim(),
      })
      setProduct(INITIAL_PRODUCT)
      setFeedback({ type: 'success', message: 'Le produit a été ajouté.' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'ajout du produit.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='add-bean-page'>
      <section className='add-bean-card' aria-labelledby='add-bean-title'>
        <Link className='add-bean-back' to={ROUTES.DASHBOARD.BEANS.ROOT}>
          <span aria-hidden='true'>←</span> Retour aux produits
        </Link>
        <header className='add-bean-header'>
          <p className='add-bean-eyebrow'>Catalogue</p>
          <h1 id='add-bean-title'>Ajouter un produit</h1>
          <p>Renseignez les informations du nouveau produit.</p>
        </header>

        <form className='add-bean-form' onSubmit={handleSubmit}>
          <div className='add-bean-field'>
            <label className='form-label' htmlFor='product-name'>Nom</label>
            <input
              className='form-control'
              id='product-name'
              name='name'
              type='text'
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='add-bean-field add-bean-field-description'>
            <label className='form-label' htmlFor='product-description'>Description</label>
            <textarea
              className='form-control'
              id='product-description'
              name='description'
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className='add-bean-field'>
            <label className='form-label' htmlFor='product-price'>Prix (Gallions)</label>
            <input
              className='form-control'
              id='product-price'
              name='price'
              type='number'
              min='0'
              step='0.01'
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className='add-bean-field'>
            <label className='form-label' htmlFor='product-stock'>Stock</label>
            <input
              className='form-control'
              id='product-stock'
              name='stock'
              type='number'
              min='0'
              step='1'
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className='add-bean-field'>
            <label className='form-label' htmlFor='product-category'>Catégorie</label>
            <select
              className='form-select'
              id='product-category'
              name='Categorie'
              value={product.Categorie}
              onChange={handleChange}
              required
            >
              <option value='Beans'>Beans</option>
              <option value='Boîte'>Boîte</option>
            </select>
          </div>

          <div className='add-bean-field add-bean-field-image'>
            <label className='form-label' htmlFor='product-image'>URL de l'image</label>
            <input
              className='form-control'
              id='product-image'
              name='image'
              type='url'
              value={product.image}
              onChange={handleChange}
              required
            />
          </div>

          {feedback && (
            <p
              className={`add-bean-feedback ${feedback.type === 'success' ? 'is-success' : 'is-error'}`}
              role={feedback.type === 'success' ? 'status' : 'alert'}
            >
              {feedback.message}
            </p>
          )}

          <div className='add-bean-form-actions'>
            <button className='add-bean-submit' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Ajout en cours…' : 'Ajouter le produit'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
