import { create } from "zustand";
type Line = { id:string; qty:number };
type CartState = {
  lines: Line[];
  add:(id:string)=>void; inc:(id:string)=>void; dec:(id:string)=>void; remove:(id:string)=>void; clear:()=>void;
};
const saved = typeof localStorage!=="undefined" ? localStorage.getItem("cart") : null;
const initial: Line[] = saved ? JSON.parse(saved) : [];
export const useCart = create<CartState>((set)=>({
  lines: initial,
  add:id=>set(s=>save({lines:upsert(s.lines,id,1)})),
  inc:id=>set(s=>save({lines:upsert(s.lines,id,1)})),
  dec:id=>set(s=>save({lines:dec1(s.lines,id)})),
  remove:id=>set(s=>save({lines:s.lines.filter(l=>l.id!==id)})),
  clear:()=>set(save({lines:[]})),
}));
function save(state:{lines:Line[]}){ localStorage.setItem("cart",JSON.stringify(state.lines)); return state; }
function upsert(lines:Line[], id:string, by:number){ const i=lines.findIndex(l=>l.id===id); if(i===-1) return [...lines,{id,qty:by}]; const c=[...lines]; c[i]={...c[i],qty:c[i].qty+by}; return c; }
function dec1(lines:Line[], id:string){ const i=lines.findIndex(l=>l.id===id); if(i===-1) return lines; const c=[...lines]; const q=c[i].qty-1; if(q<=0) return c.filter(l=>l.id!==id); c[i]={...c[i],qty:q}; return c; }
