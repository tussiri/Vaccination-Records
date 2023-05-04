import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const VaccinationRecordCard = ({ record }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Vaccine: {record.vaccineName}
        </Typography>
        <Typography color="textSecondary">
          Date Administered:{" "}
          {new Date(record.dateAdministered).toLocaleDateString()}
        </Typography>
        <Typography color="textSecondary">
          Next Dose:{" "}
          {record.nextDose
            ? new Date(record.nextDose).toLocaleDateString()
            : "N/A"}
        </Typography>
        <Typography color="textSecondary">Clinic: {record.clinic}</Typography>
      </CardContent>
    </Card>
  );
};

export default VaccinationRecordCard;
