import React, { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import {toast} from 'react-toastify';


export default function BasicTable({ appContext }) {
  let { id } = useParams()
  let navigate = useNavigate();
    const {state}=appContext
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [formData, setFormData] = useState([{ value: "" }])
  useEffect(()=>{
    if(id){
      const allDSTs=appContext.state.dsts;
       const findBasicInfo=allDSTs.find(itm=>itm.id==id)
       if(findBasicInfo){
        setFormData(findBasicInfo?.yields?.length?findBasicInfo?.yields:[])
       }
    }
   },[id])

  const handleSubmit = () => {
    let dsts=appContext.state.dsts;
    if(id){
      dsts=dsts.map(itm=>{
        if(itm.id==id){
        itm.yields=formData
        }
        return itm
      })
      appContext.updateState("dsts",dsts);
      toast("New record updated successfully",{type:"success"})
    }else{
      dsts.push({id:dsts.length+1,yields:formData})
      appContext.updateState("dsts",dsts);
      navigate("/add-dst/"+dsts.length)
      toast("New record added successfully",{type:"success"})
    }
    setShowAddEditModal(false)
  }
  const handleChange = (e, index) => {
    const copyFormData = [...formData]
    copyFormData[index].value = e.target.value
    setFormData(copyFormData)
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell align="right">Value</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {formData.map((row,key) => (
            <TableRow
              key={"yeild"+key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: "flex", columnGap: "20px" }}>
        <Button
          onClick={() => setShowAddEditModal(true)}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {id ? "Update" : "Add"}
        </Button>

      </div>

      <BootstrapDialog
        onClose={() => setShowAddEditModal(false)}
        aria-labelledby="customized-dialog-title"
        open={showAddEditModal}>
        <Card sx={{ minWidth: 600, padding: 2 }}>
          <h4>Modify Yields</h4>
          <Divider />

          <Box
            
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >{
              formData.map((itm, key) => (
                <TextField
                  key={"yield" + key}
                  size="small"
                  value={formData[key].value}
                  margin="normal"
                  fullWidth
                  name="legalName"
                  label={"Percent Value - Year " + (key + 1)}
                  placeholder={"Percent Value - Year " + (key + 1)}
                  onChange={(e) => handleChange(e, key)}
                />
              ))
            }
            <div style={{ display: "flex", columnGap: "20px" }}>
              <Button
                onClick={() =>{
                  let copyData=[...formData];
                  copyData.push({value:""})
                  setFormData(copyData)
                }}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Add Row
              </Button>
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Save
              </Button>
              <Button
                onClick={() =>{
                 setShowAddEditModal(false)
                }}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));