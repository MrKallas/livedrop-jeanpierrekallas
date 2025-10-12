import { Outlet, Link } from "react-router-dom";
export default function App(){
  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4">
      <header className="flex items-center justify-between py-3">
        <Link to="/" className="text-xl font-bold">Storefront v1</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/">Catalog</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <Outlet/>
    </div>
  );
}
