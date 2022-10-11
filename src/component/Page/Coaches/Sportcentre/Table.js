import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { Delete, Settings } from "@material-ui/icons";
import { Check, Close } from "@material-ui/icons";
import Paper from "@mui/material/Paper";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

export default function FloatingActionButtonZoom() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab
              style={{ textTransform: "capitalize" }}
              label="Assigned Sport Center"
              {...a11yProps(0)}
            >
              <Check />
            </Tab>
            <Tab
              style={{ textTransform: "capitalize" }}
              label="Pending Requests"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="WidgetLg">
              <table className="WidgetLgTable">
                <TableHead>
                  <TableRow>
                    <TableCell align="right"> S.No.</TableCell>
                    <TableCell align="right"> Name</TableCell>
                    <TableCell align="right"> Location</TableCell>
                    <TableCell align="right"> Email</TableCell>
                    <TableCell align="right"> Contact.No</TableCell>
                    <TableCell align="right"> Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Settings style={{ color: "#17a248" }} />
                    <Delete style={{ color: "red", marginLeft: "7px" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    <Settings style={{ color: "#17a248" }} />
                    <Delete style={{ color: "red", marginLeft: "7px" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Settings style={{ color: "#17a248" }} />
                    <Delete style={{ color: "red", marginLeft: "7px" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Settings style={{ color: "#17a248" }} />
                    <Delete style={{ color: "red", marginLeft: "7px" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    <Settings style={{ color: "#17a248" }} />
                    <Delete style={{ color: "red", marginLeft: "7px" }} />
                  </TableCell>
                </TableRow>
              </table>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="WidgetLg">
              <table className="WidgetLgTable">
                <TableHead>
                  <TableRow>
                    <TableCell align="right"> S.No.</TableCell>
                    <TableCell align="right"> Name</TableCell>
                    <TableCell align="right"> Location</TableCell>
                    <TableCell align="right"> Email</TableCell>
                    <TableCell align="right"> Contact.No</TableCell>
                    <TableCell align="right"> Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Check style={{ color: "#17a248" }} />
                    <Close style={{ color: "red", marginLeft: "8px" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    <Check style={{ color: "#17a248" }} />
                    <Close style={{ color: "red", marginLeft: "8px" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Check style={{ color: "#17a248" }} />
                    <Close style={{ color: "red", marginLeft: "8px" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Check style={{ color: "#17a248" }} />
                    <Close style={{ color: "red", marginLeft: "8px" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">#123</TableCell>
                  <TableCell align="right">Ankul</TableCell>
                  <TableCell align="right">Bihar</TableCell>
                  <TableCell align="right"> Ankul@gmail.com</TableCell>
                  <TableCell align="right"> +123-123456789</TableCell>
                  <TableCell align="right">
                    <Check style={{ color: "#17a248" }} />
                    <Close style={{ color: "red", marginLeft: "8px" }} />
                  </TableCell>
                </TableRow>
              </table>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </div>
  );
}
