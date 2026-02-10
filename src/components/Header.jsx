import { Link, useLocation } from 'react-router-dom';

/**
 * Componente de navegación principal
 */
const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Título */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Mi Tienda
            </span>
          </Link>

          {/* Navegación */}
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Catálogo
            </Link>
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/admin'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Administración
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
