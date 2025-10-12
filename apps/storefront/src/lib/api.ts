import data from "../../public/mock-catalog.json";
type Product = { id:string; title:string; price:number; image:string; tags:string[]; stockQty:number };
export function listProducts(): Product[] { return data as Product[]; }
export function getProduct(id:string){ return listProducts().find(p=>p.id===id); }
const orderStatuses = ["Placed","Packed","Shipped","Delivered"] as const;
export function getOrderStatus(id:string){
  const idx = (id.charCodeAt(0) + id.length) % orderStatuses.length;
  const status = orderStatuses[idx];
  const carrier = idx>=2 ? "MockExpress" : undefined;
  const eta = idx>=2 ? "3–5 days" : undefined;
  return { id, status, carrier, eta };
}
export function placeOrder(cart:any){
  const orderId = Math.random().toString(36).slice(2).toUpperCase().padEnd(10,"X");
  return { orderId };
}
