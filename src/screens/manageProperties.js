import React, { useContext,useState,useEffect } from 'react';
import MyContext from "../context/appContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";

const ManageProperties = () => {
    const appContext = useContext(MyContext);
    let navigate = useNavigate();
   const [properties,setProperties]=useState([])
   useEffect(()=>{
    if(appContext?.state?.dsts?.length){
        let allProperties=[];
        appContext?.state?.dsts?.map(itm=>{
            if(itm?.property?.length){
                allProperties.push(...itm.property)
            }
        })
        setProperties(allProperties)
    }
   },[appContext])
    const { state } = appContext;
    console.log("asfsfs", state)
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };

    return (
        <div style={{ padding: "0 20px" }}>
            <h2>Properties</h2>

            <List sx={style} component="nav" aria-label="mailbox folders">
                {
                    properties?.map((pro, key) => (
                        <div key={"dstslist" + key}>
                            <ListItem button onClick={()=>{
                            }}>
                                <ListItemText primary={(key+1)+"."+pro?.propertyName} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))
                }

            </List>
        </div>
    )
}

export default ManageProperties;