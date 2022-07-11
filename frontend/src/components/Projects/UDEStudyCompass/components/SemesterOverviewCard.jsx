import React, { useState } from "react";
import clsx from "clsx";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import ErrorIcon from "@material-ui/icons/Error";
//import {useHistory} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { orange, red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  mainTitle: {},
  avatar: {
    backgroundColor: orange[400],
  },
  delete: {
    backgroundColor: orange[400],
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  button: {
    backgroundColor: orange[400],
  },
}));

const SemesterOverviewCard = (props) => {
  const { hoursWeekly, isOverlapping } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3} direction="row">
          <Grid item align="center">
            <Typography Bigtitle variant="h2" style={{ color: "blue" }}>
              {hoursWeekly}
            </Typography>
          </Grid>

          <Grid item align="center" xs={2}>
            <Typography Bigtitle variant="body1" align="left">
              Hours
            </Typography>
            <Typography Bigtitle variant="body1" align="left">
              weekly
            </Typography>
            <Typography Bigtitle variant="body1" align="left">
              load
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid container xs={6} spacing={2} direction="row">
            <Grid item align="center" xs={12}>
              <Button
                variant="contained"
                className={classes.button}
                endIcon={
                  <ArrowForwardIcon
                    style={{ color: "white" }}
                  ></ArrowForwardIcon>
                }

                // onClick={() => history.pushState()
              >
                <Typography variant="body1" style={{ color: "white" }}>
                  SHOW SCHEDULE
                </Typography>
              </Button>
            </Grid>
            <Grid container xs={10} spacing={1} direction="row">
              {isOverlapping ? (
                <ErrorIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} align="center" />
              )}
              <Grid item align="right" xs={9}>
                <Typography
                  overlapping
                  variant="body1"
                  align="center"
                  display=""
                >
                  {isOverlapping
                    ? "Overlapping schedule"
                    : "No schedule overlapping"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SemesterOverviewCard;
