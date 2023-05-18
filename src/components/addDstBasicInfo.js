import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../css/button.css";

const defaultTheme = createTheme();

export default function AddDstForm({ appContext }) {
  let navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      const allDSTs = appContext.state.dsts;
      const findBasicInfo = allDSTs.find((itm) => itm.id == id);
      if (findBasicInfo?.basicInfo) {
        setFormData(findBasicInfo.basicInfo);
      }
    }
  }, [id, appContext]);
  const [formData, setFormData] = useState({
    legalName: "",
    sponsorName: "",
    numberOfProperties: "",
    numberOfUnits: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    if (!formData.password) {
      return;
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddData = () => {
    let dsts = appContext.state.dsts;
    if (id) {
      dsts = dsts.map((itm) => {
        if (itm.id == id) {
          itm.basicInfo = formData;
        }
        return itm;
      });
      appContext.updateState("dsts", dsts);
      toast("New record updated successfully", { type: "success" });
    } else {
      dsts.push({ id: dsts.length + 1, basicInfo: formData });
      appContext.updateState("dsts", dsts);
      navigate("/add-dst/" + dsts.length);
      toast("New record added successfully", { type: "success" });
    }
  };
  console.log("asfasfsf", appContext.state.dsts);
  const handleReset = () => {
    setFormData({
      legalName: "",
      sponsorName: "",
      numberOfProperties: "",
      numberOfUnits: "",
    });
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              value={formData.legalName}
              margin="normal"
              fullWidth
              name="legalName"
              label="Legal Name"
              placeholder="Legal Name"
              onChange={handleChange}
            />

            <TextField
              value={formData.sponsorName}
              margin="normal"
              fullWidth
              name="sponsorName"
              label="Sponsor Name"
              placeholder="Sponsor Name"
              onChange={handleChange}
            />
            <TextField
              value={formData.numberOfProperties}
              margin="normal"
              fullWidth
              name="numberOfProperties"
              label="Number of Properties"
              placeholder="Number of Properties"
              onChange={handleChange}
              type="number"
            />
            <TextField
              value={formData.numberOfUnits}
              margin="normal"
              fullWidth
              name="numberOfUnits"
              label="Number of Units"
              placeholder="Number of Units"
              onChange={handleChange}
              type="number"
            />
            <div style={{ display: "flex", columnGap: "20px" }}>
              <Button
                onClick={handleAddData}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="buttonStyle"
              >
                {id ? "Update" : "Add"}
              </Button>
              <Button
                onClick={handleReset}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="buttonStyle"
              >
                Reset
              </Button>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    </Card>
  );
}
