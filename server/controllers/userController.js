const { users, addUser, findUserById, updateUserForms } = require('../db/users');

const registerUser = (req, res, socketService) => {
  const { name, email } = req.body;

  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
    forms: {}
  };

  addUser(newUser);

  socketService.emitRegistrationComplete();

  res.status(201).send({
    message: "Jugador registrado correctamente",
    user: newUser,
  });
};

const updateBodyMeasurements = (req, res, socketService) => {
  const { userId, shoulders, waist, hips } = req.body;
  const user = findUserById(userId);

  if (!user) {
    return res.status(404).send({ message: "Usuario no encontrado" });
  }

  // Lógica para determinar tipo de cuerpo
  let bodyType = "";

  const diffShouldersHips = Math.abs(shoulders - hips);
  const diffWaistShoulders = shoulders - waist;
  const diffWaistHips = hips - waist;

  if (diffShouldersHips <= 3 && diffWaistShoulders > 8 && diffWaistHips > 8) {
    bodyType = "reloj de arena";
  } else if (hips - shoulders > 5) {
    bodyType = "triángulo (pera)";
  } else if (shoulders - hips > 5) {
    bodyType = "triángulo invertido";
  } else if (Math.abs(shoulders - hips) <= 3 && Math.abs(shoulders - waist) <= 5) {
    bodyType = "rectángulo";
  } else if (waist > shoulders && waist > hips) {
    bodyType = "ovalado";
  } else {
    bodyType = "indefinido";
  }

  updateUserForms(userId, 'bodyMeasurements', { shoulders, waist, hips, bodyType });

  socketService.emitFormComplete(userId, "body-measurements");

  res.status(201).send({
    message: "Medidas del cuerpo registradas correctamente",
    user
  });
};


const updateSkinTone = (req, res, socketService) => {
  const { userId, skinTone } = req.body;
  const user = findUserById(userId);

  if (!user) {
    return res.status(404).send({ message: "Usuario no encontrado" });
  }

  updateUserForms(userId, 'skinTone', skinTone);

  socketService.emitFormComplete(userId, "skin-tone");

  res.status(201).send({
    message: "Tono de piel registrado correctamente",
    user
  });
};

const updateHairColor = (req, res, socketService) => {
  const { userId, hairColor } = req.body;

  if (!hairColor) {
    return res.status(400).send({ message: "Faltan datos" });
  }

  const user = findUserById(userId);
  if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

  updateUserForms(userId, 'hairColor', hairColor);

  socketService.emitFormComplete(userId, "hair-color");
  console.log("user despues de cabello",user);

  res.status(201).send({
    message: "Color de cabello registrado correctamente",
    user
  });
};

const updateEyeColor = (req, res, socketService) => {
  const { userId, eyeColor } = req.body;

  if (!eyeColor) {
    return res.status(400).send({ message: "Faltan datos" });
  }

  const user = findUserById(userId);
  if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

  updateUserForms(userId, 'eyeColor', eyeColor);

  socketService.emitFormComplete(userId, "eye-color");
  console.log("user con todos sus datos",user);

  res.status(201).send({
    message: "Color de ojos registrado correctamente",
    user
  });
};

module.exports = {
  registerUser,
  updateBodyMeasurements,
  updateSkinTone,
  updateHairColor,
  updateEyeColor
}; 