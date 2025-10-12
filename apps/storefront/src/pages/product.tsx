import { useParams, Link } from "react-router-dom";
import { getProduct, listProducts } from "../lib/api";
import { useCart } from "../lib/store";
export default function Product(){
  const { id } = useParams();
  const p = id ? getProduct(id) : undefined;
  const add = useCart(s=>s.add);
  if(!p) return <div>Not found</div>;
  const related = listProducts().filter(x=>x.id!==p.id && x.tags.some(t=>p.tags.includes(t))).slice(0,3);
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={p.image} alt="" className="w-full h-64 object-contain" loading="lazy"/>
      <div>
        <h1 className="text-2xl font-semibold mb-2">{p.title}</h1>
        <p className="mb-2">{p.stockQty>0 ? "In stock" : "Out of stock"}</p>
        <div className="flex gap-2">
          <button className="px-3 py-2 border rounded" onClick={()=>add(p.id)}>Add to cart</button>
          <Link className="underline px-3 py-2" to="/cart">Go to cart</Link>
        </div>
        <h2 className="mt-6 font-medium">Related</h2>
        <ul className="list-disc ml-5">{related.map(r=><li key={r.id}><Link to={`/p/${r.id}`} className="underline">{r.title}</Link></li>)}</ul>
      </div>
    </div>
  );
}
