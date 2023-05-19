import React, { useContext, useState } from "react";
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
import Grid from "@mui/material/Grid";

const defaultTheme = createTheme();

export default function AddProperties() {
  const appContext = useContext(MyContext);
  const { state } = appContext;
  const [form, setForm] = useState({
    propertyName: "",
    streetAddress: "",
    cityZip: "",
    locationDescription: "",
    msa: "",
    submarket: "",
    yearBuilt: "",
    style: "",
    class: "",
    sector: "",
    investmentStrategy: "",
    valueAddNotes: "",
    leaseType: "",
    leaseTerm: "",
    remainingYears: "",
    extensions: "",
    tenantCreditRating: "",
    currentOccup: "",
    oneBedrooms: "",
    twoBedrooms: "",
    threeBedrooms: "",
    otherUnits: "",
    totalSf: "",
    totalUnits: "",
    NumberOfBuildings: "",
    maxFloors: "",
    propertyManager: "",
    acres: "",
    topEmployerA: "",
    topEmployerB: "",
    topEmployerC: "",
    topEmployerD: "",
    topEmployerE: "",
    msaRecentPopGrowth: "",
    subMarketRecentPopGrowth: "",
    msaProjectedPopGrowth: "",
    subMarketProjectedPopGrowth: "",
    msaRecentRentGrowth: "",
    subMarketRecentRentGrowth: "",
    msaProjectedRentGrowth: "",
    subProjectedRentGrowth: "",
    otherEconomicNotes: "",
    otherDemographicNotes: "",
    unitAmenities: "",
    commonAmenities: "",
    locationNotes: "",
    miscNotes: "",
  });
  const [selectedDst, setSelectedDst] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const splitCamelCase = (word) => {
    const words = word.split(/(?=[A-Z])/);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const result = capitalizedWords.join(" ");
    return result;
  };
  return (
    <div style={{ padding: "0px 20px" }}>
      <h4>ADD PROPERTY</h4>
      <Card sx={{ minWidth: 275 }}>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main">
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
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Select
                    size="small"
                    labelId="selectDst"
                    //value={age}
                    name="selectDst"
                    // label="Select DST"
                    placeholder="Select DST"
                    // onChange={(e)=>alert(e.target.value)}
                    fullWidth
                  >
                    {state?.dsts?.map((itm, key) => (
                      <MenuItem
                        value={itm?.basicInfo?.legalName}
                        key={"option" + key}
                      >
                        {itm?.basicInfo?.legalName}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {Object.entries(form).map(([key, value]) => (
                  <Grid item xs={4} className="Grid-Gap">
                    <TextField
                      key={key}
                      size="small"
                      value={value}
                      margin="normal"
                      fullWidth
                      name={key}
                      label={splitCamelCase(key)}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
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
