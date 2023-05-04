import mongoose from "mongoose";

const TravelVaccineRecommendationSchema = new mongoose.Schema({
  country: { type: String, required: true, unique: true },
  yellowFever: {
    "Country requirement at entry": String,
    "WHO vaccination recommendation": String,
    RecommendationDetails: String,
  },
  Malaria: {
    RiskDetails: String,
    Risk: String,
    "WHO recommended prevention in risk areas": String,
  },
  Other_Requirements: String,
});

const TravelVaccineRecommendation = mongoose.model(
  "TravelVaccineRecommendation",
  TravelVaccineRecommendationSchema
);
export default TravelVaccineRecommendation;
