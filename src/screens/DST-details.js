import React, { useState, useContext, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams,useNavigate } from "react-router-dom";
import MyContext from "../context/appContext";
import ViewDetails from '../components/viewDstDetails'
import ViewDstYield from '../components/viewDstYield'
import ViewDstProperties from '../components/viewDstProperties'
import Button from '@mui/material/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Details = () => {
  let { id } = useParams()
  let navigate = useNavigate();

  const [value, setValue] = useState(0);
  const appContext = useContext(MyContext);
  const [selectedDst, setSelectedDst] = useState({})
  useEffect(() => {
    if (id) {
      const allDSTs = appContext.state.dsts;
      const findDst = allDSTs.find(itm => itm.id == id)
      if (findDst) {
        setSelectedDst(findDst)
      }
    }
  }, [id, appContext])
  console.log("asfasfasfs", selectedDst)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ padding: "0px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{selectedDst?.basicInfo?.legalName}</h4>
        <div>
          <Button
            onClick={() => {
              navigate(`/add-dst/${id}`)
            }}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit
          </Button>
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Details" />
            <Tab label="Yields" />
            <Tab label="Properties" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ViewDetails selectedDst={selectedDst?.basicInfo || {}} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ViewDstYield selectedDst={selectedDst?.yields || []} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ViewDstProperties selectedDst={selectedDst?.property || []} />
        </TabPanel>
      </Box>
    </div>
  )
}

export default Details;

