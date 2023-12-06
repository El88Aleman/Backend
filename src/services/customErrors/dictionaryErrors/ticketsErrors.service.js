export const purchaseCartError = (ticket) => {
  // BODY
  return `
        Ocurrió un error al crear el ticket de compra
        
        * El código debe ser un texto alfanumérico único. Se recibió: "${ticket.code}"
        * El precio total es obligatorio y debe ser un número. Se recibió: "${ticket.amount}"
        * El dato del comprador es obligatorio. Se recibió: "${ticket.purchaser}"
        * El carrito no puede estar vacío
    `;
};

export const rejectedProductsPurchaseCartError = (ticket) => {
  // BODY
  return `
        Estos productos no se compraron por falta de stock: ${ticket.productsRejectedInCart}
    `;
};

export const getTicketsError = () => {
  // DATABASE
  return `
        Ocurrió un error al obtener los tickets de compra de la base de datos
    `;
};

export const getTicketByIdError = (tid) => {
  // PARAM
  return `
        Ocurrió un error al obtener el ticket de compra con ID "${tid}"

        El dato debe ser alfanumérico y de un ticket existente

    `;
};
