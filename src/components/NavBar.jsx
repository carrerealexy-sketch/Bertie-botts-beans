import './NavBar.css'
import { Link } from 'react-router'

function NavBar() {
  return (
    <nav className='navbar navbar-expand site-navbar'>
      <div className='site-navbar-brand'>
        <img
          src='https://ih1.redbubble.net/image.2091716728.5254/st,small,845x845-pad,1000x1000,f8f8f8.jpg'
          alt='Logo Bertie Bott'
          className='navbar-logo'
        />
        <h1 className='navbar-title'>Wizard Wheezes</h1>
      </div>
      <div className='navbar-collapse'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/beans'>
              Shop
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/beans'>
              Vendeur
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/beans'>
              Histoire
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/beans'>
              A propos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar