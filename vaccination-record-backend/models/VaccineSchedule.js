import mongoose from "mongoose";

const VaccineScheduleSchema = new mongoose.Schema({
  ageGroup: {
    type: String,
    required: true,
  },
  vaccines: [
    {
      name: {
        type: String,
        required: true,
      },
      timing: {
        type: String,
        required: true,
      },
    },
  ],
});

const VaccineSchedule = mongoose.model(
  "VaccineSchedule",
  VaccineScheduleSchema
);
export default VaccineSchedule;
