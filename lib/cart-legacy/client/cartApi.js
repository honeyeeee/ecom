/**
 * Archived cart API client — not wired to UI.
 * Restore imports from here when rebuilding cart.
 */

export async function fetchCartProducts() {
  const data = await fetch("/backend/backendCart/cartProducts", {
    credentials: "include",
  });
  const response = await data.json();
  return response.products || [];
}

export async function addToCart({ productId, quantity = 1 }) {
  const data = await fetch("/backend/backendCart/addToCart", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return data.json();
}

export async function deleteCartProduct(id) {
  const data = await fetch("/backend/backendCart/delteProduct", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  return data.json();
}
