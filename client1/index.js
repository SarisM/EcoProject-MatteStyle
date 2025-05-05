const socket = io("http://localhost:5050", { path: "/real-time" });

const inicio = document.getElementById('inicio');
const measurementsSection = document.getElementById('measurements-section');
const eyesSection = document.getElementById('eyes-section');
const skinSection = document.getElementById('skin-section');
const hairSection = document.getElementById('hair-section');
const resultsSection = document.getElementById('results-section');

// Escuchar el evento de registro completado
socket.on("registro-completado", (data) => {
  
  inicio.style.display = 'none';  
  measurementsSection.style.display = 'block';
});


// Escuchar el evento de formulario completado
socket.on("formulario-completado", (data) => {
    console.log("Formulario completado:", data);
  
    // Comprobar qué formulario fue completado y cambiar de secciones

    // Sección de medidas
    if (data.form === "body-measurements") {
      console.log("Formulario de medidas completado");
      measurementsSection.style.display = 'none';  
      skinSection.style.display = 'block';    
    } 
    
    // Sección de piel
    else if (data.form === "skin-tone") {
      console.log("Formulario de piel completado");
      skinSection.style.display = 'none';  
      hairSection.style.display = 'block';  
    } 
    
    // Sección de cabello
    else if (data.form === "hair-color") {
      console.log("Formulario de cabello completado");
      hairSection.style.display = 'none'; 
      eyesSection.style.display = 'block';  
    } 
    
    // Sección de ojos
    else if (data.form === "eye-color") {
      console.log("Formulario de ojos completado");
      eyesSection.style.display = 'none';  
      resultsSection.style.display = 'block'; 
    } 
    
    else {
      console.log("Formulario no reconocido:", data.form);
    }
  });