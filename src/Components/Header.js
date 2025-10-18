import { NavLink, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <nav className="nav-tabs">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/tailor"
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
        >
          Tailor
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;