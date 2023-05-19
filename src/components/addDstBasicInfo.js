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
import Grid from "@mui/material/Grid";

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
    fullLegalNameOfDst: "",
    sponsorName: "",
    numberOfProperties: "",
    numberOfUnits: "",
    dstPopertiesSector: "",
    offeringEquity: "",
    offeringDebt: "",
    percentRetainedBySponsor: "",
    totalUnitsInPortfolio: "",
    states: "",
    min1031Investment: "",
    msa: "",
    generalLocation: "",
    dstPropertiesStyle: "",
    dstPropertiesClass: "",
    numberOfProperties: "",
    percentRetainedBySponsor: "",
    totalUnitsnPortfolio: "",
    yearPropertiesBuilt: "",
    TotalDstReserves: "",
    purchasePrice: "",
    appraisedValue: "",
    yearNetOperatingIncome: "",
    yearEffectiveGrossRevenue: "",
    loanTerm: "",
    interestOnlyPeriod: "",
    fixedVariable: "",
    loanRate: "",
    lender: "",
    currentDstOccupancy: "",
    averageRemainingLeaseDuration: "",
    upreit: "",
    PPMRiskFactorsPage: "",
    useOfProceedsPage: "",
    assumptionsPage: "",
    cashFlowPage: "",
    DSTOfferingStrengthsAndOpportunities: "",
    DSTOfferingWeaknessesAndThreats: "",
    syndicationSponsorAcquisitionCosts: "",
    costs: "",
    brokerDealerDueDiligenceCosts: "",
    managingBD: "",
    TransactionCommission: "",
    FinancingFee: "",
    otherFee: "",
    thirdPartyClosingCosts: "",
    othergeneralOfferingNotes: "",
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
      fullLegalNameOfDst: "",
      sponsorName: "",
      numberOfProperties: "",
      numberOfUnits: "",
      dstPopertiesSector: "",
      offeringEquity: "",
      offeringDebt: "",
      percentRetainedBySponsor: "",
      totalUnitsInPortfolio: "",
      states: "",
      min1031Investment: "",
      msa: "",
      generalLocation: "",
      dstPropertiesStyle: "",
      dstPropertiesClass: "",
      numberOfProperties: "",
      percentRetainedBySponsor: "",
      totalUnitsnPortfolio: "",
      yearPropertiesBuilt: "",
      TotalDstReserves: "",
      purchasePrice: "",
      appraisedValue: "",
      yearNetOperatingIncome: "",
      yearEffectiveGrossRevenue: "",
      loanTerm: "",
      interestOnlyPeriod: "",
      fixedVariable: "",
      loanRate: "",
      lender: "",
      currentDstOccupancy: "",
      averageRemainingLeaseDuration: "",
      upreit: "",
      PPMRiskFactorsPage: "",
      useOfProceedsPage: "",
      assumptionsPage: "",
      cashFlowPage: "",
      DSTOfferingStrengthsAndOpportunities: "",
      DSTOfferingWeaknessesAndThreats: "",
      syndicationSponsorAcquisitionCosts: "",
      costs: "",
      brokerDealerDueDiligenceCosts: "",
      managingBD: "",
      TransactionCommission: "",
      FinancingFee: "",
      otherFee: "",
      thirdPartyClosingCosts: "",
      othergeneralOfferingNotes: "",
    });
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
    <Card sx={{ minWidth: 275 }}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
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
            <Grid container sx={{ p: 2, mt: 1 }} spacing={2}>
              {Object.entries(formData).map(([key, value]) => (
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
            <div style={{ display: "flex", columnGap: "20px" }}>
              <Button
                onClick={handleAddData}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="buttonStyle"
              >
                {id ? "Update" : "Save"}
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
