const socket = io("http://localhost:5050", { path: "/real-time" });


const registerSection = document.getElementById('register-section');
const btnRegister = document.getElementById('register-btn');


const medidasSection = document.getElementById('medidas-section');
const btnMedidas = document.getElementById('medidas-btn');

const skinSection = document.getElementById('piel-section');
const btnSkin = document.getElementById('skin-btn');

const eyesSection = document.getElementById('ojos-section');
const btnEyes = document.getElementById('eyes-btn');

const hairSection = document.getElementById('cabello-section');
const btnHair = document.getElementById('hair-btn');


const resultadosSection = document.getElementById('resultados-section');

const user = {
    id: '',
    name: '',
    email: '',
    forms: {}
};


//registro
btnRegister.addEventListener('click', async (event)=>{
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    try {
        const response = await fetch('/users-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });


        if (response.ok) {
            const data = await response.json();
            console.log(data);
            user.id = data.user.id;
            user.name = data.user.name;
            user.email = data.user.email;
            console.log("Usuario registrado:", user)
            localStorage.setItem("userId", data.user.id);
            console.log("ID guardado en localStorage:", localStorage.getItem("userId"));

            registerSection.style.display = 'none';
            medidasSection.style.display = 'block';
        } else {
            console.error('Error al registrar el usuario');
        }
    } catch (error) {
        console.error(error);
    }
});


//medidas
btnMedidas.addEventListener('click', async (event)=>{
    event.preventDefault();
    const userId = Number(localStorage.getItem("userId"));
    const shoulders = document.getElementById('shoulders').value;
    const waist = document.getElementById('waist').value;
    const hips = document.getElementById('hips').value;
    try {
        const response = await fetch ('/form-body-measurements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, shoulders, waist, hips})
        });

        if (response.ok) {

            const data = await response.json();
            console.log("Medidas del cuerpo registradas correctamente");
            console.log("Usuario con medidas actualizadas:", data.user);
            medidasSection.style.display = 'none';
            skinSection.style.display = 'block';
          } else {
            console.error('Error al registrar el usuario');
          }
    } catch (error) {
        console.error(error);
    }
})
// piel
btnSkin.addEventListener('click', async (event)=>{
    event.preventDefault();
    const selectedSkin = document.querySelector('input[name="skinTone"]:checked');

    if (!selectedSkin) {
      alert("Por favor selecciona un tono de piel.");
      return;
    }
    const skinTone = selectedSkin.value;
    const userId = Number(localStorage.getItem("userId")); 
    try {
        const response = await fetch('/form-skin-tone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, skinTone })
        });

        if (response.ok) {

            const data = await response.json();
            console.log("Tono de piel registrado correctamente:", skinTone);
            console.log("Usuario con tono de piel actualizado:", data.user); 
            skinSection.style.display = 'none';
            hairSection.style.display = 'block';
        } else {
            const data = await response.json();
            alert(data.message || "Error al guardar el tono de piel");
        }
    } catch (error) {
        console.error(error);
    }
});

// cabello
btnHair.addEventListener('click', async (event)=>{
    event.preventDefault();
    const selectedHair = document.querySelector('input[name="hairColor"]:checked');
    const hairColor = selectedHair ? selectedHair.value : null; // Verifica que haya una selección

    if (!hairColor) {
        alert("Por favor selecciona un color de cabello.");
        return;
    }

    const userId = Number(localStorage.getItem("userId")); 
    try {
        const response = await fetch('/form-hair-color', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, hairColor }) // Se envía también el userId
        });

        if (response.ok) {
            const data = await response.json();  // Extraemos la respuesta como JSON
            console.log("Color de cabello registrado correctamente:", hairColor);
            console.log("Usuario con color de cabello actualizado:", data.user); // Muestra al usuario con su cabello actualizado
            hairSection.style.display = 'none';
            eyesSection.style.display = 'block';
        } else {
            const data = await response.json();
            alert(data.message || "Error al guardar el color de cabello");
        }
    } catch (error) {
        console.error(error);
    }
});

// ojos
btnEyes.addEventListener('click', async (event)=>{
    event.preventDefault();
    const selectedEye = document.querySelector('input[name="eyeColor"]:checked');
    const eyeColor = selectedEye ? selectedEye.value : null; // Verifica que haya una selección

    if (!eyeColor) {
        alert("Por favor selecciona un color de ojos.");
        return;
    }

    const userId = Number(localStorage.getItem("userId"));
    try {
        const response = await fetch('/form-eyes-color', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, eyeColor }) // Envía también el userId
        });

        if (response.ok) {
            const data = await response.json();  // Extraemos la respuesta como JSON
            console.log("Color de ojos registrado correctamente:", eyeColor);
            console.log("Usuario con color de ojos actualizado:", data.user); // Muestra al usuario con ojos actualizados
            eyesSection.style.display = 'none';
            resultadosSection.style.display = 'block';
        } else {
            const data = await response.json();
            alert(data.message || "Error al guardar el color de ojos");
        }
    } catch (error) {
        console.error(error);
    }
});
