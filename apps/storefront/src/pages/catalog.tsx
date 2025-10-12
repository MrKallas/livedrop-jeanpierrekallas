import { listProducts } from "../lib/api";
import { useCart } from "../lib/store";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { fmt } from "../lib/format";

export default function Catalog(){
  const [q,setQ] = useState("");
  const add = useCart(s=>s.add);
  const items = listProducts();
  const shown = useMemo(()=>items.filter(p=>{
    const hay = (p.title+" "+p.tags.join(" ")).toLowerCase();
    return hay.includes(q.toLowerCase());
  }),[items,q]);
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-full" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shown.map(p=>(
          <div key={p.id} className="border rounded p-3">
            <img src={p.image} alt="" className="w-full h-24 object-contain" loading="lazy"/>
            <div className="font-medium mt-2">{p.title}</div>
            <div className="text-sm">{fmt(p.price)}</div>
            <div className="flex gap-2 mt-2">
              <Link to={`/p/${p.id}`} className="underline text-sm">View</Link>
              <button className="text-sm px-2 py-1 border rounded" onClick={()=>add(p.id)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
