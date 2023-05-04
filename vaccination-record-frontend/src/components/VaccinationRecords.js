// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import VaccinationRecord from "../helpers/VaccinationRecord";
// import AddRecordModal from "../helpers/AddRecordModal";
// import EditRecordModal from "../helpers/EditRecordsModal";

// const VaccinationRecords = () => {
//   const [records, setRecords] = useState([]);
//   const [showAddRecordModal, setShowAddRecordModal] = useState(false);
//   const [editRecord, setEditRecord] = useState({ index: null, record: null });

//   const handleAddRecord = (newRecord) => {
//     setRecords([...records, newRecord]);
//   };

//   const handleUpdateRecord = (index, updatedRecord) => {
//     const updatedRecords = [...records];
//     updatedRecords[index] = updatedRecord;
//     setRecords(updatedRecords);
//   };

//   const handleDeleteRecord = (index) => {
//     const updatedRecords = [...records];
//     updatedRecords.splice(index, 1);
//     setRecords(updatedRecords);
//   };

//   const handleEditRecord = (index) => {
//     console.log("handleEditRecord called with index:", index);
//     setEditRecord({ index, record: records[index] });
//   };

//   const handleEditRecordClose = () => {
//     setEditRecord({ index: null, record: null });
//   };

//   return (
//     <>
//       {records.map((record, index) => (
//         <VaccinationRecord
//           key={index}
//           record={record}
//           index={index}
//           onEdit={handleEditRecord}
//           onDelete={() => handleDeleteRecord(index)}
//         />
//       ))}
//       <Button variant="contained" onClick={() => setShowAddRecordModal(true)}>
//         Add Record
//       </Button>
//       <AddRecordModal
//         open={showAddRecordModal}
//         onClose={() => setShowAddRecordModal(false)}
//         onAddRecord={handleAddRecord}
//       />
//       <EditRecordModal
//         editedRecord={editRecord}
//         onModalClose={handleEditRecord}
//         onUpdateRecord={handleUpdateRecord}
//       />
//     </>
//   );
// };

// export default VaccinationRecords;
import React, { useState } from "react";
import { Button } from "@mui/material";
import VaccinationRecordCard from "./VaccinationRecordCard"; // <--- import VaccinationRecordCard
import AddRecordModal from "../helpers/AddRecordModal";
import EditRecordModal from "../helpers/EditRecordsModal";

const VaccinationRecords = () => {
  const [records, setRecords] = useState([]);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [editRecord, setEditRecord] = useState({ index: null, record: null });

  const handleAddRecord = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  const handleUpdateRecord = (index, updatedRecord) => {
    const updatedRecords = [...records];
    updatedRecords[index] = updatedRecord;
    setRecords(updatedRecords);
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  const handleEditRecord = (index) => {
    console.log("handleEditRecord called with index:", index);
    setEditRecord({ index, record: records[index] });
  };

  const handleEditRecordClose = () => {
    setEditRecord({ index: null, record: null });
  };

  return (
    <>
      {records.map((record, index) => (
        <VaccinationRecordCard
          key={index}
          record={record}
          index={index}
          onEdit={handleEditRecord}
          onDelete={() => handleDeleteRecord(index)}
        />
      ))}
      <Button variant="contained" onClick={() => setShowAddRecordModal(true)}>
        Add Record
      </Button>
      <AddRecordModal
        open={showAddRecordModal}
        onClose={() => setShowAddRecordModal(false)}
        onAddRecord={handleAddRecord}
      />
      <EditRecordModal
        editedRecord={editRecord}
        onModalClose={handleEditRecordClose} // <--- fix typo
        onUpdateRecord={handleUpdateRecord}
      />
    </>
  );
};

export default VaccinationRecords;
