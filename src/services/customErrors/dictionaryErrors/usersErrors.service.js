export const failSignupError = (user) => {
  // AUTH
  return `
        Ocurrió un error al completar el registro. Volve a completar los datos
        
        Todos los campos son obligatorios:

        * Nombre: debe ser un texto. Se recibió: "${user.first_name}"
        * Apellido: debe ser un texto. Se recibió: "${user.last_name}"
        * Edad: debe ser un número. Se recibió: "${user.age}"
        * Email: no debe tener una cuenta ya existente. Se recibió: "${user.email}"
    `;
};

export const failLoginError = (user) => {
  // AUTH
  return `
        Ocurrió un error al iniciar sesión. Volve a ingresar los datos de una cuenta existente

        * Email ingresado: ${user.email}
        * O contraseña incorrecta
    `;
};

export const logoutError = () => {
  // AUTH
  return `
        Ocurrió un error al cerrar la sesión. Volve a intentarlo
    `;
};

export const profileError = () => {
  // AUTH
  return `
        Ocurrió un error al obtener los datos en el perfil
    `;
};

export const getUserByIdError = (uid) => {
  // PARAM
  return `
        Ocurrió un error al obtener el usuario con ID "${uid}"

        El dato debe ser alfanumérico y de un usuario existente
    `;
};
