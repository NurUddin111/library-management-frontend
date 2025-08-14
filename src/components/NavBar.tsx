import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [isOpen]);

  const links = [
    { title: "All Books", path: "/books" },
    { title: "Add Book", path: "/create-book" },
    { title: "Borrow Summary", path: "/borrow-summary" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-amber-100/80 backdrop-blur-md shadow-md z-50 ">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="h-16 rounded-2xl shadow-md"
            src="https://i.ibb.co/8LnKgPcq/9146d460754c7c4d9055ef26d3b9b77d.jpg"
            alt="Logo"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className="px-4 py-2 text-lg font-medium text-amber-900 hover:text-white hover:bg-amber-500 rounded transition-colors duration-300"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none p-2 rounded-md hover:bg-amber-200 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className="absolute top-full left-0 w-full bg-amber-100 shadow-md overflow-hidden transition-[height] duration-300 ease-in-out rounded-b-2xl z-40"
        style={{ height: isOpen ? `${menuHeight}px` : "0px" }}
      >
        <ul className="flex flex-col space-y-2 p-4">
          {links.map((link, index) => (
            <li
              key={link.title}
              className={`transition-all duration-300 ease-in-out delay-[${
                index * 75
              }ms] ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-3"
              }`}
            >
              <Link
                to={link.path}
                className="block px-4 py-2 text-amber-900 rounded hover:bg-amber-300 hover:text-white transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
