import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  IconButton,
  Collapse,
  Button,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { orange, red, lightBlue } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import classNames from "classnames";
import KeyWordCloud from "./KeyWordCloud";

import German from "../res/German.png";
import English from "../res/English.png";
import Turkish from "../res/Turkish.png";
import Dutch from "../res/Dutch.png";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

const SelectedCoursesCard = (props) => {
  // export default function SelectedCoursesCard({dayShort, dayLong, timeOfCourseShort, timeOfCourse, titleOfCourse, professorName, professorInitials, elearn, dateFrom, dateTo,rythm  }) {
  //console.log(props);
  const { selectedCourse, addCourseToOtherList, handleRemoval } = props;

  const {
    id,
    name: Title,
    url: link,
    isSelected,
    sws: timeCom,
    subject_type: CourseType,
    language: Language,
    description: Description,
    keywords,
    persons,

    timetable,
    study_programs,
  } = selectedCourse || {};
  console.log("selected lecture:", selectedCourse);

  /*used by kingson 
  const [courseSelected, setCourseSelected] = useState(isSelected);
  */

  let profs;
  persons.map((result) => {
    profs = result;
  });
  const { name: Professors } = profs || {};

  let tTable;
  timetable.map((result) => {
    tTable = result;
  });
  const {
    day = "",
    time = "",
    rhythm = "",
    duration = "",
    elearn = "",
  } = tTable || {};
  const { from, to } = time;
  const { from: duFrom, to: duTo } = duration || {};

  //const [selected, setSelected] = useState(false);

  const classes = useStyles();
  ////// SelectedCourseCard expantion
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //////////////formating functions
  const randoxmizedHex = () => {
    const colors = [
      "#303F9F",
      "#453187",
      "#A52885",
      "#F4888B",
      "#F39617",
      "#2EB2A5",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const professorInitials = (name) => {
    //name.strip("\u00a0");
    let professorInitialsList = name.split(",\u00a0");
    let professorInitials = "";
    for (let i = 0; i < professorInitialsList.length; i++) {
      let s = professorInitialsList[i];
      professorInitials += s[0].upper();
    }
    return professorInitials;
  };
  const fday = (e) => {
    switch (e) {
      case "Mo.":
        return "Monday";
      case "Di." || "Tu.":
        return "Tuesday";
      case "Wed.":
        return "Wednesday";
      case "Mi.":
        return "Wednesday";
      case "Do.":
        return "Thursday";
      case "Fr.":
        return "Friday";
      default:
        return e;
    }
  };
  const dayLong = (day) => {
    if (day === "Mon." || day === "Mo.") return "Monday";
    if (day === "Tue." || day === "Tu.") return "Tuesday";
    if (day === "Wed." || day === "We.") return "Wednesday";
    if (day === "Thu." || day === "Th.") return "Thursday";
    if (day === "Fri." || day === "Fr.") return "Friday";
    if (day === "Sat." || day === "Sa.") return "Saturday";
    if (day === "Sun." || day === "Su.") return "Sunday";
    else return "No day stated";
  };
  const dateShortened = (date) => {
    let dateList = date.split(" ");
    return dateList[0] + dateList[1] + dateList[2] + dateList[3];
  };
  const langFlag = (language) => {
    switch (language.split(";")[0]) {
      case "Türkisch":
        return Turkish;
      case "Deutsch":
        return German;
      case "Englisch":
        return English;
      case "Niederländisch":
        return Dutch;
      default:
        return "";
    }
  };
  const fType = (e) => {
    switch (e) {
      case "Vorlesung":
        return "Lecture";
      case "�bung":
        return "Exercise";
      case "Praxisprojekt":
        return "Lab Project";
      case "Vorlesung/�bung":
        return "Lecture/Exercise";

      case "Blockseminar":
        return "Block Seminar";

      case "Vorlesung/Übung":
        return "Lecture/Exercise";
      case "Übung":
        return "Exercise";
      case "Einfuhrung":
        return "Introductory Event";
      case "Pratikum":
        return "Introductory Event";
      case "Einzelveranstaltung":
        return "One Time Event";
      case "�bung/Praktikum":
        return "Exercise / Lab";
      case "Tutorium":
        return "Tutorial";

      default:
        return e;
    }
  };
  const fryhthm = (e) => {
    switch (e) {
      case "wöch.":
        return "Weekly";
      default:
        return e;
    }
  };
  const ftime = (e) => {
    const time = e.subString(0, 1);
    return time;
  };
  const fInitials = (e) => {
    const initials = e.charAt(0);
    return initials.toUpperCase();
  };
  /////////////////// Show more Details
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const handleShowMoreDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  ////////handling remove course
  const handleRemoveCourse = () => {
    props.handleRemoveById(id);
  };

  const [isOpen, setToggle] = useState(false);

  return (
    <Card className={classes.root}>
      <Grid container direction="row" xs={12}>
        <CardHeader
          avatar={
            <IconButton
              aria-label="delete"
              /*nClick={function(event){ addCourseToOtherList(selectedCourse); handleRemoval()}}*/
              onClick={() => {
                addCourseToOtherList(selectedCourse);
                handleRemoval(selectedCourse);
              }}
            >
              {isSelected ? (
                <IndeterminateCheckBoxIcon style={{ color: "orange" }} />
              ) : (
                <AddBoxIcon style={{ color: "orange" }} />
              )}
            </IconButton>
          }
          title={
            <Grid container spacing={2} direction="row">
              <Grid item xs={5}>
                {timetable.length == 1 ? (
                  <Typography variant="body1" component="">
                    {`${day} ${from}-${to}`}
                  </Typography>
                ) : timetable.length !== 0 ? (
                  <Autocomplete
                    id="combo-box-demo"
                    options={timetable}
                    defaultValue={() => timetable[0]}
                    getOptionLabel={(option) =>
                      option.day + option.time.from + "-" + option.time.to
                    }
                    style={{ width: 125 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                ) : (
                  <>{""}</>
                )}
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body1" component="">
                  {Title}
                  {/*titleOfCourse*/}
                </Typography>
              </Grid>
            </Grid>
          }
          titleTypographyProps={{
            variant: "h6",
            align: "center",
          }}
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        />
        {/* Collapsible for all additional information */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid item className={classes.mainTitle} xs={12} align="center">
                <Typography Bigtitle variant="h5" align="center">
                  {Title}
                </Typography>
              </Grid>
              <Grid item xs={12} align="left">
                <Typography variant="body2" style={{ fontWeight: 600 }}>
                  Professors:
                </Typography>
              </Grid>
              {persons.map((result) => (
                <Grid container spacing={1} direction="row">
                  <Grid item xs={2.5}>
                    <IconButton aria-label="Professor's Profil">
                      <Avatar
                        style={{ backgroundColor: randoxmizedHex() }}
                        align="center"
                      >
                        {fInitials(result.name)}
                      </Avatar>
                    </IconButton>
                  </Grid>
                  <Grid item xs={9.5}>
                    <Typography Bigtitle variant="h6" align="center">
                      {result.name}
                    </Typography>
                  </Grid>
                </Grid>
              ))}

              <Grid container spacing={2} direction="row">
                <Grid item xs={4}>
                  <Grid container spacing={2} direction="column">
                    <Grid item>
                      <Typography
                        Bigtitle
                        variant="body1"
                        align="left"
                        fontWeight={500}
                        style={{ fontWeight: 600 }}
                      >
                        Time:
                      </Typography>
                      <Typography Bigtitle variant="body1" align="left">
                        {`${from}-${to}`}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        Bigtitle
                        variant="body1"
                        align="left"
                        style={{ fontWeight: 600 }}
                      >
                        Day
                      </Typography>
                      <Typography Bigtitle variant="body1" align="left">
                        {fday(day)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Grid container spacing={2} direction="column">
                    <Grid item>
                      <Typography
                        Bigtitle
                        variant="body1"
                        align="left"
                        style={{ fontWeight: 600 }}
                      >
                        Rythm:
                      </Typography>
                      <Typography Bigtitle variant="body1" align="left">
                        {fryhthm(rhythm)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        Bigtitle
                        variant="body1"
                        align="left"
                        style={{ fontWeight: 600 }}
                      >
                        Type of Event:
                      </Typography>
                      <Typography Bigtitle variant="body1" align="left">
                        {elearn !== "" ? elearn : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Typography
                    Bigtitle
                    variant="body1"
                    align="left"
                    style={{ fontWeight: 600 }}
                  >
                    Duration:
                  </Typography>
                  <Grid item container direction="column" spacing={2}>
                    {duration !== "" ? (
                      <>
                        <Grid item container direction="column" spacing={1}>
                          <Grid item>
                            <Typography>From</Typography>
                          </Grid>
                          <Grid item>{duFrom}</Grid>
                        </Grid>
                        <Grid item container direction="column" spacing={1}>
                          <Grid item>
                            <Typography>To</Typography>
                          </Grid>
                          <Grid item>{duTo}</Grid>
                        </Grid>
                      </>
                    ) : (
                      <Grid item>
                        <Typography>{""}</Typography>
                      </Grid>
                    )}
                  </Grid>

                  {/* <Typography Bigtitle variant="body1" align="left">
                    From
                  </Typography>
                  <Typography Bigtitle variant="body1" align="left">
                    #datafromhere
                  </Typography>
                  <Typography Bigtitle variant="body1" align="left">
                    To
                  </Typography>
                  <Typography
                    Bigtitle
                    variant="body1"
                    align="left"
                    style={{ display: "inline-block", whiteSpace: "pre-line" }}
                  >
                    /* {dateShortened({// to )
                  </Typography> */}
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ padding: "5px" }}>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                  <Button
                    MORE_DETAILS
                    style={{ color: "orange" }}
                    onClick={handleShowMoreDetails}
                  >
                    {showMoreDetails ? "LESS DETAILS" : "MORE DETAILS"}
                  </Button>
                </Grid>
              </Grid>
              {showMoreDetails ? (
                <Grid container direction="row" style={{ padding: "3px" }}>
                  <Grid item xs={12} container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h6">Description</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {Description !== "" ? Description : "No Description"}
                      </Typography>
                      <Typography></Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="column"
                    spacing={1}
                    style={{ paddingTop: "12px" }}
                  >
                    <Grid item>
                      <Typography variant="h6">
                        Assigned Study Program
                      </Typography>
                    </Grid>
                    <Grid item>
                      {study_programs.map((studyprogram) => (
                        <Typography>{studyprogram.name}</Typography>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <>{null}</>
              )}
            </Grid>
          </CardContent>
        </Collapse>
      </Grid>
    </Card>
  );
};

export default SelectedCoursesCard;
