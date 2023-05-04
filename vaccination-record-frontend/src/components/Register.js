import React, { useState } from "react";
import { register } from "../services/userService";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/system";
import MUIAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const ContainerStyled = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8),
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = (
  {
    /*...*/
  }
) => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match");
  //     setOpen(true);
  //     return;
  //   }
  //   try {
  //     const response = await register({
  //       firstName,
  //       lastName,
  //       birthDate,
  //       email,
  //       password,
  //     });
  //     console.log(response);
  //     setUser(response.data.userData);
  //     // console.log(response.data);
  //     // setSuccessMessage("Registration Successful");
  //     if (response.message === "User created") {
  //       navigate("/login");
  //     } else {
  //       setErrorMessage(response.message);
  //       setOpen(true);
  //     }
  //   } catch (error) {
  //     setErrorMessage(error.response);
  //     console.error("Registration error:", error);
  //     setOpen(true);
  //   }
  // };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match");
  //     setOpen(true);
  //     return;
  //   }
  //   try {
  //     const response = await register({
  //       firstName,
  //       lastName,
  //       birthDate,
  //       email,
  //       password,
  //     });
  //     console.log(response);
  //     if (response.data && response.data.userData) {
  //       setUser(response.data.userData);
  //       setSuccessMessage("Registration successful");
  //       navigate("/login");
  //     } else {
  //       setErrorMessage("Registration failed");
  //       setOpen(true);
  //     }
  //   } catch (error) {
  //     setErrorMessage("Registration error");
  //     console.error("Registration error:", error);
  //     setOpen(true);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setOpen(true);
      return;
    }
    try {
      const response = await register({
        firstName,
        lastName,
        birthDate,
        email,
        password,
      });
      console.log(response);
      // setUser(response.data.userData);
      setSuccessMessage("Registration Successful");
      navigate("/login");
    } catch (error) {
      // setErrorMessage(error.response.data.message);
      console.error("Registration error:", error);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ContainerStyled maxWidth="sm">
      <PaperStyled>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Birth Date"
                type="date"
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage || successMessage}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </ContainerStyled>
  );
};

export default Register;
