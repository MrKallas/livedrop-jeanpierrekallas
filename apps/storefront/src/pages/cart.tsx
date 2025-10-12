import { useCart } from "../lib/store";
import { listProducts, placeOrder } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { fmt } from "../lib/format";

export default function Cart(){
  const { lines, inc, dec, remove, clear } = useCart();
  const nav = useNavigate();
  const products = listProducts();
  const rows = lines.map(l=>({ ...products.find(p=>p.id===l.id)!, qty:l.qty }));
  const total = rows.reduce((s,r)=>s + r.price*r.qty, 0);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Cart</h1>
      {rows.length===0 && <div>Empty. <Link to="/">Go shop</Link></div>}
      {rows.map(r=>(
        <div key={r.id} className="flex items-center justify-between border-b py-2">
          <div>{r.title}</div>
          <div className="flex items-center gap-2">
            <button className="border rounded px-2" onClick={()=>dec(r.id)}>-</button>
            <span>{r.qty}</span>
            <button className="border rounded px-2" onClick={()=>inc(r.id)}>+</button>
          </div>
          <div>{fmt(r.price*r.qty)}</div>
          <button className="underline text-sm" onClick={()=>remove(r.id)}>Remove</button>
        </div>
      ))}
      {rows.length>0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="font-medium">Total: {fmt(total)}</div>
          <div className="flex gap-3">
            <button className="underline" onClick={clear}>Clear</button>
            <button className="px-3 py-2 border rounded" onClick={()=>{
              const { orderId } = placeOrder(lines);
              clear();
              nav(`/order/${orderId}`);
            }}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
