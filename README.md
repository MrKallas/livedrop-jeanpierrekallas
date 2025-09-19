# Live Drops — Flash-Sale & Follow Platform (by Jean Pierre Kallas)

**Repo name:** `livedrop-jeanpierrekallas`  

This is my solution to the system design exercise for Live Drops. I designed the architecture, data model, flows, and APIs to handle flash sales at scale.

---

## 1) High-Level Approach

- No overselling via reservations + atomic inventory decrement  
- Idempotent ordering via `Idempotency-Key`  
- Low-latency reads via GraphQL BFF, Redis cache, and Search index  
- Reliable notifications & cache invalidation via Outbox + Event Bus  
- Cursor-based pagination for products, followers, following, and drops  
- Targets: Reads ≥ 500 RPS, Orders ≥ 150 RPS, Notifications ≤ 2s

---

## 2) System Diagram (Excalidraw)

https://excalidraw.com/#json=dsg1ggeKXtvb5ND9ScWS-,9wd5Ay2iAilL0EsomahcPw

---

## 3) Data Model — ER Diagram (Excalidraw)

https://excalidraw.com/#json=5pF5hM_C92AuMOh9K_w43,XaC-4bAtGBQ-PfQOOHHMrw

---

## 4) Order Flow — No Oversell (Excalidraw)

https://excalidraw.com/#json=in87TRl-4RSa4o0ak5M4h,DzPGftL_pyrhgoqsfhvm7A

---

## 5) Pagination Flow (Excalidraw)

https://excalidraw.com/#json=G5RUqjN7gOo0ZfspiUYlg,phbN9zwQbKHqHjQ61E3eyA

---

## 6) Notifications Fanout (Excalidraw)

https://excalidraw.com/#json=Jb9vgOnzUF_8RicgbpFHX,u-G5SNGi-vsXk45OWbRuWQ

---

## 7) Public API (GraphQL)

```graphql
query Drops($status: DropStatus!, $after: String) {
  drops(status: $status, first: 20, after: $after) {
    edges {
      node { id status startsAt endsAt product { id title price } stock { available } }
      cursor
    }
    pageInfo { hasNextPage endCursor }
  }
}

query Creator($creatorId: ID!) {
  creator(id: $creatorId) {
    id handle name
    meFollows
    followers(first: 20) {
      edges { node { id name } cursor }
      pageInfo { hasNextPage endCursor }
    }
  }
}

mutation PlaceOrder($input: PlaceOrderInput!) {
  placeOrder(input: $input) {
    order { id status total }
    stock { available }
  }
}
```

**REST (fallback):**
- `GET /drops?status=live&limit=20&after=<cursor>`  
- `GET /creators/:id/followers?limit=20&after=<cursor>`  
- `POST /orders` + `Idempotency-Key` header; body: `{ dropId, qty, paymentMethodId }`

---

## 8) Requirements Mapping

- Follow/unfollow creators → FOLLOWS  
- List followers/following → indices + cursor pagination  
- Check if A follows B → composite lookup `(user_id, creator_id)`  
- Create products & schedule drops → PRODUCTS, DROPS  
- Browse products & drops (upcoming/live/ended) → Search/Index + status filters  
- Pagination for browsing/followers → cursor everywhere  
- Ordering during drops → reservation-first + idempotency  
- Spike handling → CDN, cache, sharded fanout, autoscaling
