import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import VaccinationRecords from "./VaccinationRecords";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AuthContext } from "../contexts/AuthContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addVaccinationRecord, getVaccinationRecords } from "../services/api";
import dayjs from "dayjs";
import api from "../services/api.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);
  const { user } = authState;
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [dateAdministered, setDateAdministered] = useState(new Date());
  const [nextDose, setNextDose] = useState("");
  const [clinic, setClinic] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const userId = user.id;
      if (userId) {
        getVaccinationRecords(userId)
          .then((response) => {
            setVaccinationRecords(response.data);
          })
          .catch((error) => {
            console.error("Error fetching vaccination records:", error);
          });
      }
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddRecord = () => {
    const newRecord = {
      vaccineName,
      dateAdministered,
      nextDose,
      clinic,
    };
    const userId = authState.user.id;
    api
      .addVaccinationRecord(userId, newRecord)
      .then((response) => {
        setVaccinationRecords([...vaccinationRecords, response.data]);
        setVaccineName("");
        setDateAdministered(new Date());
        setNextDose("");
        setClinic("");
      })
      .catch((error) => {
        console.error("Error adding vaccination record:", error);
      });
  };

  return (
    <>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          {authState.user
            ? `Welcome, ${authState.user.firstName}!`
            : "Loading..."}
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Add New Vaccination Record
              </Typography>
              {/*...*/}
            </Box>
            <TextField
              label="Vaccine Name"
              variant="outlined"
              fullWidth
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Administered"
                inputFormat="MM/dd/yyyy"
                value={dayjs(dateAdministered)}
                onChange={(date) => setDateAdministered(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              label="Next Dose"
              variant="outlined"
              fullWidth
              value={nextDose}
              onChange={(e) => setNextDose(e.target.value)}
            />
            <TextField
              label="Clinic"
              variant="outlined"
              fullWidth
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleAddRecord}
            >
              Add Record
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                Vaccination Records
              </Typography>
            </Box>
            {vaccinationRecords && (
              <VaccinationRecords records={vaccinationRecords} />
            )}
            <VaccinationRecords records={vaccinationRecords} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
