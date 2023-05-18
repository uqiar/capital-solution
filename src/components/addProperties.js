import React, { useContext,useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../css/button.css";
import MyContext from "../context/appContext";

const defaultTheme = createTheme();

export default function AddProperties() {
  const appContext = useContext(MyContext);
  const { state } = appContext;
  const [form,setForm]=useState({
    propertyName: "",
    streetAddress: "",
    cityZip: "",
  })
  const [selectedDst,setSelectedDst]=useState("")
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  return (
    <div style={{ padding: "0px 20px" }}>
      <h4>ADD PROPERTY</h4>
      <Card sx={{ minWidth: 275 }}>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Select
               
                labelId="selectDst"
                 //value={age}
                name="selectDst"
                // label="Select DST"
                placeholder="Select DST"
               // onChange={(e)=>alert(e.target.value)}
                fullWidth
              >
                {
                  state?.dsts?.map((itm,key)=>(
                    <MenuItem value={itm?.basicInfo?.legalName} key={"option"+key}>{itm?.basicInfo?.legalName}</MenuItem>

                  ))
                }
              </Select>
              <TextField
                size="small"
                // value={formData.propertyName}
                margin="normal"
                fullWidth
                name="propertyName"
                label={"Property Name"}
                placeholder={"Property Name"}
                // onChange={(e) => handleChange(e)}
              />
              <TextField
                size="small"
                //   value={formData.streetAddress}
                margin="normal"
                fullWidth
                name="streetAddress"
                label={"Street Address"}
                placeholder={"Street Address"}
                //   onChange={(e) => handleChange(e)}
              />
              <TextField
                size="small"
                //   value={formData.cityZip}
                margin="normal"
                fullWidth
                name="cityZip"
                label={"City ST Zip"}
                placeholder={"City ST Zip"}
                //   onChange={(e) => handleChange(e)}
              />
              <Button
                // onClick={handleReset}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="buttonStyle"
              >
                Save
              </Button>
            </Box>
          </Container>
        </ThemeProvider>
      </Card>
    </div>
  );
}
