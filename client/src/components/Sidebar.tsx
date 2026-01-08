import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/categories', label: 'Category', icon: '📁' },
    { path: '/subcategories', label: 'Subcategory', icon: '📂' },
    { path: '/products', label: 'Products', icon: '📦' },
  ];

  const getIcon = (label: string) => {
    switch (label) {
      case 'Home':
        return '🏠';
      case 'Category':
        return '📁';
      case 'Subcategory':
        return '📂';
      case 'Products':
        return '📦';
      default:
        return '•';
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-purple-600 to-purple-700 text-white min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">digitalflake</h2>
        </div>
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === '/categories' && location.pathname === '/categories') ||
                (item.path === '/subcategories' && location.pathname === '/subcategories') ||
                (item.path === '/products' && location.pathname === '/products');
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-yellow-400 text-purple-900 font-semibold'
                        : 'text-white hover:bg-purple-500'
                    }`}
                  >
                    <span className="text-lg">{getIcon(item.label)}</span>
                    <span>{item.label}</span>
                    {isActive && <span className="ml-auto">→</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;


