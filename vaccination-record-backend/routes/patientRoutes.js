// import express from "express";
// import Patient from "../models/Patient.js";

// const router = express.Router();

// //Create a new patient
// router.post("/", async (req, res) => {
//   try {
//     const newPatient = new Patient(req.body);
//     await newPatient.save();
//     res.status(201).json(newPatient);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //Get all patient
// router.get("/", isAuthenticated, async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.status(200).json(patients);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Get a patient by ID
// router.get("/:id", isAuthenticated, getPatient, (req, res) => {
//   res.status(200).json(req.patient);
// });

// //update a patient by ID
// router.put("/:id", isAuthenticated, getPatient, async (req, res) => {
//   Object.assign(res.patient, req.body);
//   try {
//     const updatedPatient = await res.patient.save();
//     res.status(200).json(updatedPatient);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// //Delete patient by ID
// router.delete("/:id", isAuthenticated, getPatient, async (req, res) => {
//   try {
//     await res.patient.remove();
//     res.status(200).json({ message: "Patient deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Middleware
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.status(401).json({ message: "Unauthorized" });
// }

// //Middleware for getting a patient by ID
// async function getPatient(req, res, next) {
//   let patient;
//   try {
//     patient = await Patient.findById(req.params.id);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
//   res.patient = patient;
//   next();
// }
// export default router;
