import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./Home/assets/SENIOR GUIDE logo.svg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 FIX: check token whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 bg-white shadow-sm border-b py-3 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-12" />
            <h1 className="font-bold text-xl">
              Senior<span className="text-[#ff6b35]">Guide</span>
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-3">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 text-sm rounded-lg ${
                  isActive(link.path)
                    ? "text-[#ff6b35]"
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* BEFORE LOGIN */}
            {!isLoggedIn && (
              <>
                <Link
                  to="/admin-login"
                  className="text-sm text-gray-500 border px-3 py-1 rounded"
                >
                  Admin
                </Link>

                <Link
                  to="/register"
                  className="text-[#ff6b35] border border-[#ff6b35] px-4 py-2 rounded"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="bg-[#ff6b35] text-white px-4 py-2 rounded"
                >
                  Login
                </Link>
              </>
            )}

            {/* AFTER LOGIN */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 border px-4 py-2 rounded"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow p-4 space-y-3">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block"
            >
              {link.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link to="/admin-login">Admin</Link>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600"
            >
              Logout
            </button>
          )}

        </div>
      )}

      {/* NAVBAR HEIGHT SPACER */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;