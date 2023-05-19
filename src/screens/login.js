import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyContext from "../context/appContext";
import { makeStyles } from "@material-ui/core/styles";

import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const useStyles = makeStyles({
  backgroundScreen: {
    backgroundColor: "#111",
    height: "100vh",
  },
  signinCard: {
    padding: "10px 30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxAlign: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default function SignIn() {
  const appContext = useContext(MyContext);
  const classes = useStyles();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    if (!formData.password) {
      return;
    }
    const user = {
      email: formData.email,
      password: formData.password,
      token: formData.password,
    };
    const __set = JSON.stringify(user);
    localStorage.setItem("__set", __set);
    appContext.setTokensFromLocalStorage(user.token);
    appContext.updateState("user", user);
    navigate("/");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        className={classes.backgroundScreen}
        style={{ maxWidth: "100%" }}
      >
        <CssBaseline />
        <Box className={classes.boxAlign}>
          <div className={classes.signinCard}>
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            {/* <Typography component="h1" variant="h5">
              Sign in
            </Typography> */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <img src="/1031logo.png" style={{ height: "35px" }} />
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div className="login-field">
                <TextField
                  className="login-email-field"
                  size="small"
                  margin="normal"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  // autoFocus
                />
                <TextField
                  className="login-email-field"
                  size="small"
                  margin="normal"
                  error={isSubmit && !formData.password}
                  helperText={
                    isSubmit && !formData.password && "Required Field"
                  }
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </div>

              <div className="login-signin-btn">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: 0,
                    textTransform: "capitalize",
                    padding: "5px 25px",
                  }}
                >
                  Sign In
                </Button>
              </div>
            </Box>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
