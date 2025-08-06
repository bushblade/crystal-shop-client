import { Link, NavLink } from 'react-router'
import CartIcon from './icons/CartIcon'

export default function Navbar() {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Site Title */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              Eclipsia Crystals
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${isActive ? 'bg-gray-700' : ''} hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium`
                }
              >
                All Crystals
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? 'bg-gray-700' : ''} hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium`
                }
              >
                About Us
              </NavLink>
            </div>
          </div>

          {/* Cart Icon */}
          <div className="ml-4 flex items-center">
            <button
              type="button"
              className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-label="View shopping cart"
            >
              <CartIcon />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
