import React,{useState,useContext} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddDstBasicInfo from '../components/addDstBasicInfo'
import AddDstYield from '../components/addDstYield'
import AddDstProperties from '../components/addDstProperties'

import MyContext from "../context/appContext";

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

const AddDST=()=>{
    const [value, setValue] = useState(0);
    const appContext = useContext(MyContext);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
        <div style={{padding:"0px 20px"}}>
       <h4>ADD DST</h4>
       <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="DST Basic info"  />
          <Tab label="Yields" />
          <Tab label="Properties"  />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <AddDstBasicInfo appContext={appContext}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <AddDstYield appContext={appContext}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <AddDstProperties appContext={appContext}/>
      </TabPanel>
    </Box>
        </div>
    )
}

export default AddDST;

