import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  immunizationRecords: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ImmunizationRecord" },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
