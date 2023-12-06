export const getCartsError = () => {
  // DATABASE
  return `
        Ocurrió un error al obtener los carritos de la base de datos
    `;
};

export const getCartByIdError = (cid) => {
  // PARAM
  return `
        Ocurrió un error al obtener el carrito con ID "${cid}"

        El dato debe ser alfanumérico y de un carrito existente
    `;
};

export const createCartError = () => {
  // DATABASE
  return `
        Ocurrió un error al crear el carrito en la base de datos
    `;
};

export const addProductToCartError = (cart) => {
  // BODY
  return `
        Ocurrió un error al agregar el producto al carrito

        * La cantidad debe ser un número mayor a 0. Se recibió: "${cart.products.quantity}"
    `;
};

export const updateProductsInCartError = () => {
  // BODY
  return `
        Ocurrió un error al actualizar los productos del carrito. Asegurate de que los datos sean válidos
    `;
};

export const updateProductQuantityInCartError = (cart) => {
  // BODY
  return `
        Ocurrió un error al actualizar la cantidad del producto en el carrito

        * La cantidad debe ser un número mayor a 0. Se recibió: "${cart.products.quantity}"
        * El producto debe encontrarse agregado al carrito
    `;
};

export const deleteAllProductsInCartError = (cid) => {
  // PARAM
  return `
        Ocurrió un error al vaciar el carrito con ID: "${cid}"

        El dato debe ser alfanumérico y de un carrito existente
    `;
};

export const deleteProductInCartError = (cid) => {
  // PARAM
  return `
        El producto a eliminar "${cart.products.product.title}" no se encuentra en el carrito con ID: "${cid}"
    `;
};
