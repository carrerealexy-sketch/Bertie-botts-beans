import './FiltreBar.css'

function FiltreBar({
  category,
  availability,
  sortOrder,
  onCategoryChange,
  onAvailabilityChange,
  onSortOrderChange,
  onReset,
}) {
  return (
    <aside className='filter-bar' aria-label='Filtres des produits'>
      <h2 className='filter-bar-title'>Filtres</h2>

      <fieldset className='filter-bar-section'>
        <legend className='filter-bar-heading'>Catégorie</legend>
        <div className='filter-bar-options'>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-category'
              value='all'
              checked={category === 'all'}
              onChange={() => onCategoryChange('all')}
            />
            <span>Toutes les catégories</span>
          </label>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-category'
              value='Boîte'
              checked={category === 'Boîte'}
              onChange={() => onCategoryChange('Boîte')}
            />
            <span>Boîtes de Beans</span>
          </label>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-category'
              value='Beans'
              checked={category === 'Beans'}
              onChange={() => onCategoryChange('Beans')}
            />
            <span>Beans</span>
          </label>
        </div>
      </fieldset>

      <fieldset className='filter-bar-section'>
        <legend className='filter-bar-heading'>Disponibilité</legend>
        <div className='filter-bar-options'>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-availability'
              value='all'
              checked={availability === 'all'}
              onChange={() => onAvailabilityChange('all')}
            />
            <span>Toutes les disponibilités</span>
          </label>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-availability'
              value='in-stock'
              checked={availability === 'in-stock'}
              onChange={() => onAvailabilityChange('in-stock')}
            />
            <span>En stock</span>
          </label>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-availability'
              value='out-of-stock'
              checked={availability === 'out-of-stock'}
              onChange={() => onAvailabilityChange('out-of-stock')}
            />
            <span>Épuisé</span>
          </label>
        </div>
      </fieldset>

      <fieldset className='filter-bar-section'>
        <legend className='filter-bar-heading'>Trier par</legend>
        <div className='filter-bar-options'>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-sort'
              value='default'
              checked={sortOrder === 'default'}
              onChange={() => onSortOrderChange('default')}
            />
            <span>Ordre par défaut</span>
          </label>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-sort'
              value='price-asc'
              checked={sortOrder === 'price-asc'}
              onChange={() => onSortOrderChange('price-asc')}
            />
            <span>Prix croissant</span>
          </label>
          <label className='filter-bar-option'>
            <input
              type='radio'
              name='product-sort'
              value='price-desc'
              checked={sortOrder === 'price-desc'}
              onChange={() => onSortOrderChange('price-desc')}
            />
            <span>Prix décroissant</span>
          </label>
        </div>
      </fieldset>

      <button className='filter-bar-reset' type='button' onClick={onReset}>
        Réinitialiser les filtres
      </button>
    </aside>
  )
}

export default FiltreBar
