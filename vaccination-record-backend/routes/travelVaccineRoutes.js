import express from "express";
import TravelVaccineRecommendation from "../models/TravelVaccineRecommendation.js";

const router = express.Router();

router.get("/recommendations/:country", async (req, res) => {
  try {
    const { country } = req.params;
    const recommendation = await TravelVaccineRecommendation.findOne({
      country,
    });
    if (!recommendation) {
      return res.status(404).json({
        message:
          "No travel vaccination recommendations found for the specified country.",
      });
    }
    res.status(200).json(recommendation);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching travel vaccination recommendations.",
      error,
    });
  }
});

export default router;
