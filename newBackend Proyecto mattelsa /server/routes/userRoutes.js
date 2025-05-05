const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const setupSocketService = require('../services/socketService');

const setupUserRoutes = (io) => {
  const socketService = setupSocketService(io);

  router.post("/users-register", (req, res) => userController.registerUser(req, res, socketService));
  router.post("/form-body-measurements", (req, res) => userController.updateBodyMeasurements(req, res, socketService));
  router.post("/form-skin-tone", (req, res) => userController.updateSkinTone(req, res, socketService));
  router.post("/form-hair-color", (req, res) => userController.updateHairColor(req, res, socketService));
  router.post("/form-eyes-color", (req, res) => userController.updateEyeColor(req, res, socketService));

  return router;
};

module.exports = setupUserRoutes; 