// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
// } from "@mui/material";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// const EditRecordModal = ({
//   record,
//   editedRecord,
//   onUpdateRecord,
//   onModalClose,
// }) => {
//   const [editRecord, setEditRecord] = useState({
//     vaccineType: "",
//     adminDate: "",
//     sideEffects: "",
//   });

//   useEffect(() => {
//     if (record) {
//       setEditRecord(record);
//     }
//   }, [record]);

//   const handleEditRecordChange = (event) => {
//     setEditRecord({
//       ...editRecord,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleDateChange = (date) => {
//     const formattedDate = date.toISOString().slice(0, 10);
//     setEditRecord({
//       ...editRecord,
//       adminDate: formattedDate,
//     });
//   };

//   const handleUpdateRecord = () => {
//     onUpdateRecord(editedRecord.index, editRecord);
//     onModalClose();
//   };

//   const handleClose = () => {
//     onModalClose();
//   };

//   return (
//     <Dialog open={!!editedRecord.record} onClose={handleClose}>
//       <DialogTitle>Edit Record</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="vaccineType"
//           label="Vaccine Type"
//           type="text"
//           value={editRecord.vaccineType}
//           onChange={handleEditRecordChange}
//           fullWidth
//         />
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             label="Administration Date"
//             value={dayjs(editRecord.adminDate)}
//             onChange={handleDateChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 margin="dense"
//                 name="adminDate"
//                 label="Administration Date"
//                 fullWidth
//               />
//             )}
//           />
//         </LocalizationProvider>
//         <TextField
//           margin="dense"
//           name="sideEffects"
//           label="Side Effects/Reactions"
//           type="text"
//           value={editRecord.sideEffects}
//           onChange={handleEditRecordChange}
//           fullWidth
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleUpdateRecord} color="primary">
//           Update
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditRecordModal;

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAuthContext } from "../contexts/AuthContext";

const EditRecordModal = ({ record, onModalClose, onUpdateRecord }) => {
  const { authState } = useAuthContext();

  const [editedRecord, setEditedRecord] = useState(null);

  useEffect(() => {
    setEditedRecord(record);
  }, [record]);

  const handleEditRecordChange = (event) => {
    setEditedRecord({
      ...editedRecord,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    setEditedRecord({
      ...editedRecord,
      adminDate: formattedDate,
    });
  };

  const handleUpdateRecord = async () => {
    try {
      const updatedRecord = {
        vaccineType: editedRecord.vaccineType,
        adminDate: editedRecord.adminDate,
        sideEffects: editedRecord.sideEffects,
      };
      await fetch(
        `/api/vaccination-records/${authState.user.id}/${editedRecord._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify(updatedRecord),
        }
      );
      onUpdateRecord(editedRecord.index, editedRecord);
      onModalClose();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleClose = () => {
    onModalClose();
  };

  return (
    <Dialog open={!!editedRecord} onClose={handleClose}>
      <DialogTitle>Edit Record</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="vaccineType"
          label="Vaccine Type"
          type="text"
          value={editedRecord?.vaccineType || ""}
          onChange={handleEditRecordChange}
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Administration Date"
            value={dayjs(editedRecord?.adminDate)}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                name="adminDate"
                label="Administration Date"
                fullWidth
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          margin="dense"
          name="sideEffects"
          label="Side Effects/Reactions"
          type="text"
          value={editedRecord?.sideEffects || ""}
          onChange={handleEditRecordChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateRecord} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRecordModal;
