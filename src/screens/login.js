import  React,{useContext,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyContext from "../context/appContext";

import { useNavigate } from "react-router-dom";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const appContext = useContext(MyContext);
    let navigate = useNavigate();
   const [formData,setFormData]=useState({
     email:"",
    password:""
   })
   const [isSubmit,setIsSubmit]=useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true)
    if(!formData.password){
        return
    }
    const user={
      email: formData.email,
      password: formData.password,
      token:formData.password
    };
    const __set = JSON.stringify(user);
      localStorage.setItem("__set", __set);
      appContext.setTokensFromLocalStorage(user.token);
      appContext.updateState("user", user);
      navigate("/");
  };
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
            <TextField
              margin="normal"
              error={isSubmit&&!formData.password}
              helperText={isSubmit&&!formData.password&&"Required Field"}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
         
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}