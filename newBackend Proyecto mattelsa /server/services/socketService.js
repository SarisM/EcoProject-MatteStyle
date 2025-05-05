const setupSocketService = (io) => {
    // Emitir evento de registro completado
    const emitRegistrationComplete = () => {
      io.emit("registro-completado", {});
    };
  
    // Emitir evento de formulario completado
    const emitFormComplete = (userId, formType) => {
      io.emit("formulario-completado", {
        userId,
        form: formType
      });
    };
  
    return {
      emitRegistrationComplete,
      emitFormComplete
    };
  };
  
  module.exports = setupSocketService;
  