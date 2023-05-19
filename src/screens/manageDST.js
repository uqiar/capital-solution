import React, { useContext } from "react";
import MyContext from "../context/appContext";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import "../css/button.css";

const ManageDST = () => {
  const appContext = useContext(MyContext);
  let navigate = useNavigate();

  const { state } = appContext;
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <h2>DSTs</h2>

      {/* <List sx={style} component="nav" aria-label="mailbox folders">
                {
                    state?.dsts?.map((dst, key) => (
                        <div key={"dstslist" + key}>
                            <ListItem button onClick={()=>{
                                navigate(`/manage-dst/${dst.id}`)
                            }}>
                                <ListItemText primary={dst?.basicInfo?.legalName} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))
                }

            </List> */}

      {state?.dsts?.map((dst, key) => (
        <div key={"dstslist" + key} className="Dst-align">
          <p
            onClick={() => {
              navigate(`/manage-dst/${dst.id}`);
            }}
            className="Dsts-Manage"
          >
            {dst?.basicInfo?.legalName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ManageDST;
