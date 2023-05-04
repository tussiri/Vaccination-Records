import mongoose from "mongoose";

const ImmunizationRecordSchema = new mongoose.Schema({
  vaccine: { type: String, required: true },
  dateAdministered: { type: Date, required: true },
  administeringClinic: String,
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
});

const ImmunizationRecord = mongoose.model(
  "ImmunizationRecord",
  ImmunizationRecordSchema
);
export default ImmunizationRecord;
