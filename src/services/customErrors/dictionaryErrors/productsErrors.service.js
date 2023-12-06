export const getProductsError = () => {
  // DATABASE
  return `
        Ocurrió un error al obtener los productos de la base de datos
    `;
};

export const getProductByIdError = (pid) => {
  // PARAM
  return `
        Ocurrió un error al obtener el producto con ID "${pid}"
        
        El dato debe ser alfanumérico y de un producto existente
    `;
};

export const addProductError = (product) => {
  // BODY
  return `        
        Todos los campos son obligatorios:

        * Título: debe ser un texto. Se recibió: "${product.title}"
        * Descripción: debe ser una lista. Se recibió: "${product.description}"
        * Código: debe ser único y un texto (alfanumérico). Se recibió: "${product.code}"
        * Precio: debe ser un número mayor o igual a 0. Se recibió: "${product.price}"
        * Stock: debe ser un número mayor o igual a 0. Se recibió: "${product.stock}"
        * Categoría: debe ser un texto, las opciones son "blanca" o "negra". Se recibió: "${product.category}"
    `;
};

export const updateProductParamError = (pid) => {
  // PARAM
  return `
        Ocurrió un error al actualizar el producto con ID "${pid}"
        
        El dato debe ser alfanumérico y de un producto existente
    `;
};

export const updateProductError = (product) => {
  // BODY
  return `
        Los campos a actualizar deben ser váidos:

        Título: debe ser un texto. Se recibió: "${product.title}"
        Descripción: debe ser una lista. Se recibió: "${product.description}"
        Código: debe ser único y un texto (alfanumérico). Se recibió: "${product.code}"
        Precio: debe ser un número mayor o igual a 0. Se recibió: "${product.price}"
        Stock: debe ser un número mayor o igual a 0. Se recibió: "${product.stock}"
        Categoría: debe ser un texto, las opciones son "blanca" o "negra". Se recibió: "${product.category}"
    `;
};

export const deleteProductError = (pid) => {
  // PARAM
  return `
        Ocurrió un error al eliminar el producto con ID "${pid}"

        El dato debe ser alfanumérico y de un producto existente
    `;
};

export const mockingProductsError = () => {
  // DATABASE
  return `
        Ocurrió un error al crear los productos con faker
    `;
};
