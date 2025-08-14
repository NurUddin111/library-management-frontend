export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-lg font-semibold tracking-wide">📚 BookShelf</div>

        {/* Links */}
        <ul className="flex gap-6 text-sm">
          <li>
            <a href="#" className="hover:text-white transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <div className="text-xs text-zinc-500">
          © {new Date().getFullYear()} BookShelf. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
