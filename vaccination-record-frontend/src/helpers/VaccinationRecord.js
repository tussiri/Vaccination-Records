import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditRecordModal from "./EditRecordsModal";
// import AddRecordModal from "./AddRecordModal";

const VaccinationRecord = ({ record, index, onEdit, onDelete }) => {
  const { vaccineType, adminDate, sideEffects } = record;

  return (
    <Card
      sx={{
        maxWidth: 400,
        marginBottom: 2,
        marginLeft: 20,
        padding: 2,
        borderRadius: "1rem",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {vaccineType}
        </Typography>
        <Typography color="text.secondary">
          Date: {new Date(adminDate).toLocaleDateString()}
        </Typography>
        <Typography color="text.secondary">
          Side effects: {sideEffects || "None"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            console.log("Edit button clicked");
            onEdit(index);
          }}
        >
          Edit
          <EditIcon />
        </Button>
        <Button size="small" onClick={onDelete}>
          Delete
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default VaccinationRecord;
