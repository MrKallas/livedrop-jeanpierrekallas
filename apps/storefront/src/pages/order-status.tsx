import { useParams } from "react-router-dom";
import { getOrderStatus } from "../lib/api";
export default function OrderStatus(){
  const { id="" } = useParams();
  const s = getOrderStatus(id);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Order {s.id}</h1>
      <p>Status: <b>{s.status}</b></p>
      {s.carrier && <p>Carrier: {s.carrier} — ETA: {s.eta}</p>}
    </div>
  );
}
