export const fmt = (n:number) => new Intl.NumberFormat(undefined,{style:"currency",currency:"USD"}).format(n);
