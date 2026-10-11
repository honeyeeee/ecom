/**
 * POST /backend/cart/add — order page se selected variant backend cart mein save
 * Body: { productId, quantity?, size?, color?, imageUrl? }
 */

export async function addToCart({
  productId,
  quantity = 1,
  size = "",
  color = "",
  imageUrl = "",
  image = "",
}) {
  const res = await fetch("/backend/cart/add", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
      size,
      color,
      imageUrl: imageUrl || image,
    }),
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
