// Import the necessary modules
import mongoose from "mongoose";
import VaccineSchedule from "./models/VaccineSchedule.js";
import vaccineScheduleData from "./assets/vaccine_schedule.json" assert { type: "json" };

// Define your MongoDB connection string
const MONGODB_URI =
  "mongodb+srv://tussiri:ookkfaHIkZQvDphu@portfoliocluster.qtrd7qh.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

(async () => {
  // Iterate through the vaccine schedule data and save it to the database
  for (const ageGroup in vaccineScheduleData) {
    const scheduleData = vaccineScheduleData[ageGroup];

    const vaccineScheduleEntry = new VaccineSchedule({
      ageGroup: ageGroup,
      vaccines: scheduleData,
    });

    try {
      await vaccineScheduleEntry.save();
      console.log(`Saved vaccine schedule for ${ageGroup}`);
    } catch (err) {
      console.error(`Error saving vaccine schedule for ${ageGroup}:`, err);
    }
  }

  // Close the database connection
  mongoose.connection.close(() => {
    console.log("Database connection closed");
  });
})();
