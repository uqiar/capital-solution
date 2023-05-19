import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import DnsIcon from "@mui/icons-material/Dns";
import HomeIcon from "@mui/icons-material/Home";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#212934",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const useStyles = makeStyles({
  sidebarTopIcon: {
    color: "#fff",
  },
  sideBarText: {
    color: "#fff",
  },
  sidebarSubmenuText: {
    color: "#a48d31",
  },
});

export default function DrawerComponent({ open, setOpen }) {
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const classes = useStyles();

  const [list, setList] = React.useState([
    // {
    //   title: "Main Menu",
    //   icon: <DnsIcon />,
    //   isOpen: true,
    //   subMenu: [{ title: "Home", page: "/", icon: <HomeIcon /> }],
    // },
    {
      title: "DSTs",
      icon: <InboxIcon />,
      isOpen: false,
      subMenu: [
        { title: "Manage", page: "/manage-dst", icon: <StarBorder /> },
        { title: "Add New", page: "/add-dst", icon: <AddIcon /> },
      ],
    },
    {
      title: "Properties",
      icon: <InboxIcon />,
      isOpen: false,
      subMenu: [
        { title: "Manage", page: "/manageProperties", icon: <StarBorder /> },
        { title: "Add New", page: "/addProperties", icon: <AddIcon /> },
      ],
    },
  ]);
  const handleClick = (index) => {
    const newList = [...list];
    newList[index].isOpen = !list[index].isOpen;
    setList(newList);
  };
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
        className={classes.sidebarTop}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, pl: 2, pt: 2 }}
        >
          <img src="/1031logo.png" style={{ height: "35px" }} />
        </Typography>
      </Toolbar>
      <Divider />
      <List component="nav" sx={{ mt: 1 }}>
        <Link to="/" className="home-link">
          <ListItemButton sx={{ pb: 0, pb: 0 }}>
            <ListItemIcon style={{ color: "#fff" }}>
              <HomeIcon />
            </ListItemIcon>
            <p
              className={classes.sideBarText}
              style={{
                marginBottom: "9px",
                marginTop: "9px",
                fontSize: "17px",
              }}
            >
              Home
            </p>
          </ListItemButton>
        </Link>
        {list.map((opt, key) => {
          return (
            <>
              <ListItemButton
                key={"sidebaroption" + key}
                onClick={() => handleClick(key)}
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  {opt.icon}
                </ListItemIcon>
                <ListItemText
                  primary={opt.title}
                  className={classes.sideBarText}
                />
                {opt.isOpen ? (
                  <ExpandMore className={classes.sideBarText} />
                ) : (
                  <ExpandLess className={classes.sideBarText} />
                )}
              </ListItemButton>
              <Collapse in={opt.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {opt.subMenu.map((subOpt, subKey) => (
                    <Link
                      to={subOpt.page}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton key={"sub menue" + subKey} sx={{ pl: 4 }}>
                        <ListItemIcon style={{ color: "#a48d31" }}>
                          {subOpt.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={subOpt.title}
                          className={classes.sidebarSubmenuText}
                        />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            </>
          );
        })}
      </List>
    </Drawer>
  );
}
