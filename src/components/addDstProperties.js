import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import "../css/button.css";

export default function BasicTable({ appContext }) {
  let { id } = useParams();
  let navigate = useNavigate();
  const { state } = appContext;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: "",
    streetAddress: "",
    cityZip: "",
  });
  const [list, setList] = useState([]);
  useEffect(() => {
    if (id) {
      const allDSTs = appContext.state.dsts;
      const findBasicInfo = allDSTs.find((itm) => itm.id == id);
      if (findBasicInfo) {
        setList(findBasicInfo?.property?.length ? findBasicInfo?.property : []);
      }
    }
  }, [id]);

  const handleSubmit = () => {
    let dsts = appContext.state.dsts;
    if (id) {
      dsts = dsts.map((itm) => {
        if (itm.id == id) {
          itm.property = itm.property
            ? [...itm.property, formData]
            : [formData];
        }
        return itm;
      });
      let copyList = [...list];
      copyList.push(formData);
      setList(copyList);
      appContext.updateState("dsts", dsts);
      toast("New record updated successfully", { type: "success" });
    } else {
      dsts.push({ id: dsts.length + 1, property: [formData] });
      appContext.updateState("dsts", dsts);
      navigate("/add-dst/" + dsts.length);
      toast("New record added successfully", { type: "success" });
    }
    setShowAddEditModal(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Property Name</TableCell>
            <TableCell align="center">Street Address</TableCell>
            <TableCell align="right">City ST Zip</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, key) => (
            <TableRow
              key={"yeild" + key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.propertyName}
              </TableCell>
              <TableCell align="center">{row.streetAddress}</TableCell>
              <TableCell align="right">{row.cityZip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: "flex", columnGap: "20px" }}>
        <Button
          onClick={() => setShowAddEditModal(true)}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, ml: 2 }}
          className="buttonStyle"
        >
          Add
        </Button>
      </div>

      <BootstrapDialog
        onClose={() => setShowAddEditModal(false)}
        aria-labelledby="customized-dialog-title"
        open={showAddEditModal}
      >
        <Card sx={{ minWidth: 600, padding: 2 }}>
          <h4>Add Property</h4>
          <Divider />

          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              value={formData.propertyName}
              margin="normal"
              fullWidth
              name="propertyName"
              label={"Property Name"}
              placeholder={"Property Name"}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              size="small"
              value={formData.streetAddress}
              margin="normal"
              fullWidth
              name="streetAddress"
              label={"Street Address"}
              placeholder={"Street Address"}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              size="small"
              value={formData.cityZip}
              margin="normal"
              fullWidth
              name="cityZip"
              label={"City ST Zip"}
              placeholder={"City ST Zip"}
              onChange={(e) => handleChange(e)}
            />

            <div style={{ display: "flex", columnGap: "20px" }}>
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="buttonStyle"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowAddEditModal(false);
                }}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="buttonStyle"
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Card>
      </BootstrapDialog>
    </TableContainer>
  );
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
