// import React, { useState } from "react";
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
// // import dayjs from "dayjs";

// const AddRecordModal = ({ open, onClose, onAddRecord }) => {
//   const [newRecord, setNewRecord] = useState({
//     vaccineType: "",
//     adminDate: "",
//     sideEffects: "",
//   });

//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleNewRecordChange = (event) => {
//     setNewRecord({
//       ...newRecord,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleDateChange = (date) => {
//     const formattedDate = date.toISOString().slice(0, 10);
//     setSelectedDate(date);
//     setNewRecord({
//       ...newRecord,
//       adminDate: formattedDate,
//     });
//   };

//   const handleAddRecord = () => {
//     onAddRecord(newRecord);
//     setNewRecord({
//       vaccineType: "",
//       adminDate: "",
//       sideEffects: "",
//     });
//     setSelectedDate(null);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add New Record</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="vaccineType"
//           label="Vaccine Type"
//           type="text"
//           value={newRecord.vaccineType}
//           onChange={handleNewRecordChange}
//           fullWidth
//         />
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             label="Administration Date"
//             value={selectedDate}
//             onChange={(date) => handleDateChange(date)}
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
//           value={newRecord.sideEffects}
//           onChange={handleNewRecordChange}
//           fullWidth
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleAddRecord} color="primary">
//           Add
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddRecordModal;

import React, { useState } from "react";
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

const AddRecordModal = ({ open, onClose, onAddRecord }) => {
  const [newRecord, setNewRecord] = useState({
    vaccineType: "",
    adminDate: null,
    sideEffects: "",
  });

  const handleNewRecordChange = (event) => {
    setNewRecord({
      ...newRecord,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setNewRecord({
      ...newRecord,
      adminDate: date,
    });
  };

  const handleAddRecord = () => {
    onAddRecord(newRecord);
    setNewRecord({
      vaccineType: "",
      adminDate: null,
      sideEffects: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Record</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="vaccineType"
          label="Vaccine Type"
          type="text"
          value={newRecord.vaccineType}
          onChange={handleNewRecordChange}
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Administration Date"
            value={newRecord.adminDate}
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
          value={newRecord.sideEffects}
          onChange={handleNewRecordChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddRecord} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecordModal;
