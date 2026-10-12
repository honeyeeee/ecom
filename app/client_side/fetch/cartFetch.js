async function fetchCartData() {
    try {
         const data = await fetch('/backend/cart/get', {
              method: 'GET',
              credentials: 'include',
              headers: {
                   'Content-Type': 'application/json',
              },
         })
         const response = await data.json()
         if (!response.success) {
              throw new Error(response.message)
         }
         console.log('cart data from backend', response)
         return response.cart

    } catch (error) {
         console.log(error)
    }

}
export default fetchCartData
