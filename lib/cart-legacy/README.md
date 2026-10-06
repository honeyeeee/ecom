# Cart legacy (archived)

Cart API and client helpers were removed from the live UI on purpose so cart can be rebuilt cleanly.

## Client

- `client/cartApi.js` — `fetchCartProducts`, `addToCart`, `deleteCartProduct` (cookie auth, same URLs as before).

## Server routes (restore into App Router)

Copy each file back under `app/backend/backendCart/`:

| Archive file | Live path |
|--------------|-----------|
| `server/addToCart.route.js` | `app/backend/backendCart/addToCart/route.js` |
| `server/cartProducts.route.js` | `app/backend/backendCart/cartProducts/route.js` |
| `server/delteProduct.route.js` | `app/backend/backendCart/delteProduct/route.js` |

Mongoose model remains at `app/backend/db/cart.js`.

## Endpoints (when routes are restored)

- `GET /backend/backendCart/cartProducts` — list cart lines (populate `productId`)
- `POST /backend/backendCart/addToCart` — body `{ productId, quantity }`
- `DELETE /backend/backendCart/delteProduct` — body `{ id }` (cart line `_id`)
