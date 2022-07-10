import React, { useState ,useEffect} from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Paper,
  IconButton,
  AddIcon,
  RemoveIcon,
  Icon,
  Collapse,
  Button,
  Typography,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import LinkIcon from "@material-ui/icons/Link";
import NavigationIcon from "@material-ui/icons/Navigation";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SchoolIcon from "@material-ui/icons/School";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import classNames from "classnames";
import KeyWordCloud from "./KeyWordCloud";

import German from "../res/German.png";
import English from "../res/English.png";
import Turkish from "../res/Turkish.png";
import Dutch from "../res/Dutch.png";







//reandom color generation for avater
const muiStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

//quick translation
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
const fday = (e) => {
  switch (e) {
    case "Mo.":
      return "Monday";
    case "Di." || "Tu.":
      return "Tuesday";
    case "Wed..":
      return "Wednesday";
    case "Do.":
      return "Thursday";
    case "Fr.":
      return "Friday";
    default:
      return e;
  }
};

const fInitials = (e) => {
  const initials = e.charAt(0);
  return initials.toUpperCase();
};

const Courses = (props) => {
  const classes = muiStyles;
  const search = useLocation().search;

  return (
    <>
      <Paper elevation={3} style={{ padding: 24 }}>
        <Grid
          container
          spacing={3}
          xs={12}
          direction="row"
          alignItems="center"
          style={{ paddingLeft: 80 }}
        >
          <Grid xs={2} className={classes.sorter}>
            <Typography>Time</Typography>
          </Grid>
          <Grid xs={1} style={{ marginLeft: "40px" }}>
            <Typography>Workload</Typography>
          </Grid>
          <Grid
            xs={5}
            item
            className={classes.sorter}
            container
            spacing={0}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={false} md={false}>
              <ArrowDownwardIcon />
            </Grid>
            <Grid item>
              <Typography>Title</Typography>
            </Grid>
          </Grid>
          <Grid xs={2} item className={classes.sorter}>
            <Typography>Course Type</Typography>
          </Grid>

          <Grid xs={1} item className={classes.sorter}>
            <Typography>Detail</Typography>
          </Grid>
        </Grid>

        <Grid></Grid>
      </Paper>
    </>
  );
};

const Course = (props) => {
  //All necessary destructuring

  const [studyprogram, setStudyProgram] = useState(props.studyprogram);
  /////////////New Code for Filters added in UDEStudyCompass for Kingston
  useEffect(() =>{
    return () => {};
  },[studyprogram]);
  /////////////
  
  
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
    selected,
    persons,

    timetable,
    study_programs,
  } = studyprogram || {};

  const [courseSelected, setCourseSelected] = useState(isSelected);

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

  const [isOpen, setToggle] = useState(false);

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

  const classes = muiStyles();

  const handleSelectCourse = () => {
    props.handleAddById(id);
  };

  return (
    <>
      {!isSelected ? (
        <Paper
          elevation={3}
          style={{ padding: "3px 24px", position: "relative" }}
        >
          {/* This line must later be uncommented and worked on after i have done with other things
                <div class="select-icon"><IconButton  onClick={() => handleSel(props)}>{selected ? <RemoveIcon/> : <AddIcon/>}</IconButton></div> */}

          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justify="space-evenly"
          >
            <Grid item xs={false} className={classes.checkbox}>
              <IconButton
                onClick={() => {
                  handleSelectCourse();
                }}
              >
                <AddBoxIcon style={{ color: "orange" }} />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              {timetable.length == 1 ? (
                <div>{`${day} ${from}-${to}`}</div>
              ) : timetable.length !== 0 ? (
                <Autocomplete
                  id="combo-box-demo"
                  options={timetable}
                  defaultValue={() => timetable[0]}
                  getOptionLabel={(option) =>
                    option.day + option.time.from + "-" + option.time.to
                  }
                  style={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
              ) : (
                <>{""}</>
              )}
            </Grid>

            <Grid item xs={1}>
              <Typography>
                {timeCom.length !== 0 ? timeCom + " hrs." : "-"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{Title}</Typography>
            </Grid>
            <Grid item xs={2} style={{ marginRight: "3px" }}>
              <Typography>
                {CourseType.split(";")
                  .map((e) => fType(e))
                  .join(", ")}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <div class="expand-icon">
                <IconButton
                  aria-label="expand row"
                  onClick={() => setToggle(!isOpen)}
                  style={{ transform: isOpen ? "rotate(180deg)" : "" }}
                >
                  {" "}
                  <KeyboardArrowDownIcon style={{ padding: 0, margin: 0 }} />
                </IconButton>
              </div>
            </Grid>
          </Grid>

          {/* Collapsible for all additional information */}
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Grid item xs={12} style={{ padding: 24 }}>
              <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item>
                  <Typography variant="h5">{Title}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={5} direction="row">
                <Grid item xs={7} container direction="column" spacing={10}>
                  <Grid item container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h6">Professor(s)</Typography>
                    </Grid>
                    {persons.map((result) => (
                      <Grid
                        item
                        container
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <Grid item>
                          <Avatar
                            className={classes.avatarName}
                            style={{ backgroundColor: randoxmizedHex() }}
                          >
                            {fInitials(result.name)}
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <Typography>{result.name}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h6">Topics</Typography>
                    </Grid>
                    <Grid item>
                      {keywords.length > 0 ? (
                        <KeyWordCloud keywords={keywords} />
                      ) : (
                        "No Keywords"
                      )}
                    </Grid>
                  </Grid>

                  <Grid></Grid>
                </Grid>

                <Grid
                  item
                  xs={5}
                  container
                  direction="column"
                  justify="center"
                  spacing={6}
                >
                  <Grid item container direction="row" spacing={10}>
                    <Grid xs={6} item container direction="column" spacing={1}>
                      <Grid item container direction="row" spacing={10}>
                        <Grid
                          xs={6}
                          item
                          container
                          direction="column"
                          spacing={1}
                        >
                          <Grid item>
                            <Typography variant="h6">Time</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>{`${from}-${to}`}</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          xs={6}
                          item
                          container
                          direction="column"
                          spacing={1}
                        >
                          <Grid item>
                            <Typography variant="h6">Rhythm</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>{fryhthm(rhythm)}</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          xs={6}
                          item
                          container
                          direction="column"
                          spacing={1}
                        >
                          <Grid item>
                            <Typography variant="h6">Day</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>{fday(day)}</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          xs={1}
                          item
                          container
                          direction="column"
                          spacing={0}
                        >
                          <Grid item>
                            <Typography variant="h6">E-Learn</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>
                              {elearn !== "" ? elearn : ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs={4} item container direction="column" spacing={1}>
                      <Grid item>
                        <Typography variant="h6">Duration</Typography>
                      </Grid>
                      <Grid item container direction="column" spacing={2}>
                        {duration !== "" ? (
                          <>
                            <Grid item container direction="column" spacing={1}>
                              <Grid item>
                                <Typography variant="h6">From</Typography>
                              </Grid>
                              <Grid item>
                                <Typography>{duFrom}</Typography>                                
                              </Grid>
                            </Grid>
                            <Grid item container direction="column" spacing={1}>
                              <Grid item>
                                <Typography variant="h6">To</Typography>
                              </Grid>
                              <Grid item><Typography>{duTo}</Typography></Grid>
                            </Grid>
                          </>
                        ) : (
                          <Grid item>
                            <Typography>{null}</Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h6">Description</Typography>
                    </Grid>
                    <Grid item>
                      
                      <Typography>{Description !== "" ? Description : "No Description"}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item container direction="column" spacing={1}>
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

                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      startIcon={
                        <Icon>
                          <SchoolIcon />
                        </Icon>
                      }
                    >
                      <a
                        href={link}
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          color: "text.primary",
                        }}
                      >
                        TO LSF
                      </a>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        </Paper>
      ) : (
        ""
      )}
    </>
  );
};

export default Courses;
export { Course };
