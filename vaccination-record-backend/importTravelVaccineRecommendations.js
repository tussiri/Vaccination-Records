import mongoose from "mongoose";
import TravelVaccineRecommendation from "./models/TravelVaccineRecommendation.js";
import travelVaccineData from "./assets/country_vaccine_data.json" assert { type: "json" };

const MONGODB_URI =
  "mongodb+srv://tussiri:ookkfaHIkZQvDphu@portfoliocluster.qtrd7qh.mongodb.net/?retryWrites=true&w=majority";

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
  for (const country in travelVaccineData) {
    const recommendationData = travelVaccineData[country];

    const recommendation = new TravelVaccineRecommendation({
      country: country,
      yellowFever: recommendationData["Yellow fever"],
      Malaria: recommendationData["Malaria"],
      otherRequirements: recommendationData["Other requirements"],
    });

    try {
      await recommendation.save();
      console.log(`Saved travel vaccine recommendations for ${country}`);
    } catch (err) {
      console.error(
        `Error saving travel vaccine recommendations for ${country}:`,
        err
      );
    }
  }

  // Close the database connection
  mongoose.connection.close(() => {
    console.log("Database connection closed");
  });
})();
