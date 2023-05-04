import express from "express";
import ImmunizationRecord from "../models/ImmunizationRecord.js";

const router = express.Router();

//Create a new immunizationRecord
router.post("/", async (req, res) => {
  try {
    const newImmunizationRecord = new ImmunizationRecord(req.body);
    await newImmunizationRecord.save();
    res.status(201).json(newImmunizationRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all immunizationRecord
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const immunizationRecords = await ImmunizationRecord.find();
    res.status(200).json(immunizationRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get a immunizationRecord by ID
router.get("/:id", isAuthenticated, getImmunizationRecord, (req, res) => {
  res.status(200).json(req.immunizationRecord);
});

//update a immunizationRecord by ID
router.put("/:id", isAuthenticated, getImmunizationRecord, async (req, res) => {
  Object.assign(res.immunizationRecord, req.body);
  try {
    const updatedImmunizationRecord = await res.immunizationRecord.save();
    res.status(200).json(updatedImmunizationRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete immunizationRecord by ID
router.delete(
  "/:id",
  isAuthenticated,
  getImmunizationRecord,
  async (req, res) => {
    try {
      await res.ImmunizationRecord.remove();
      res.status(200).json({ message: "Immunization deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

//Middleware for getting a immunizationRecord by ID
async function getImmunizationRecord(req, res, next) {
  let immunizationRecord;
  try {
    immunizationRecord = await ImmunizationRecord.findById(req.params.id);
    if (!immunizationRecord) {
      return res.status(404).json({ message: "Immunization not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.immunizationRecord = immunizationRecord;
  next();
}
export default router;
