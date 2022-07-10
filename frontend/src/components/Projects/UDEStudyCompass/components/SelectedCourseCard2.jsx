import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Paper,
  IconButton,
  AddIcon,
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
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { makeStyles } from "@material-ui/core/styles";

import classNames from "classnames";
import KeyWordCloud from "./KeyWordCloud";

import German from "../res/German.png";
import English from "../res/English.png";
import Turkish from "../res/Turkish.png";
import Dutch from "../res/Dutch.png";

const SelectedCourse2 = (props) => {
  const { selectedCourse } = props;

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
  } = selectedCourse || {};

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

  const langFlag = (language) => {
    switch (language.split(";")[0]) {
      case "TÃ¼rkisch":
        return Turkish;
      case "Deutsch":
        return German;
      case "Englisch":
        return English;
      case "NiederlÃ¤ndisch":
        return Dutch;
      default:
        return "";
    }
  };
  const fType = (e) => {
    switch (e) {
      case "Vorlesung":
        return "Lecture";
      case "Übung":
        return "Exercise";
      case "Praxisprojekt":
        return "Lab Project";
      case "Vorlesung/Übung":
        return "Lecture/Exercise";

      case "Blockseminar":
        return "Block Seminar";

      case "Vorlesung/Ãœbung":
        return "Lecture/Exercise";
      case "Ãœbung":
        return "Exercise";
      case "Einfuhrung":
        return "Introductory Event";
      case "Pratikum":
        return "Introductory Event";
      case "Einzelveranstaltung":
        return "One Time Event";
      case "Übung/Praktikum":
        return "Exercise / Lab";
      case "Tutorium":
        return "Tutorial";

      default:
        return e;
    }
  };

  const fryhthm = (e) => {
    switch (e) {
      case "wÃ¶ch.":
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
  const ftime = (e) => {
    const time = e.subString(0, 1);
    return time;
  };

  const fInitials = (e) => {
    const initials = e.charAt(0);
    return initials.toUpperCase();
  };

  ///////////////////
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const handleShowMoreDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  //handling remove course
  const handleRemoveCourse = () => {
    props.handleRemoveById(id);
  };

  ///handling remove course from history
  // const handRemoveFromHistoryById = () => {
  //   props.handRemoveFromHistoryById(id);
  // };

  const [isOpen, setToggle] = useState(false);
  return (
    <Paper
      display="inline-block"
      elevation={1}
      style={{ padding: "1px" }}
      xs={12}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item xs={1}>
          <IconButton>
            {!props.historyClicked ? (
              <RemoveCircleIcon
                style={{ color: "orange" }}
                onClick={() => {
                  handleRemoveCourse();
                }}
              />
            ) : (
              <AddBoxIcon
                style={{ color: "orange" }}
                //onClick={handRemoveFromHistoryById()}
              />
            )}
          </IconButton>
        </Grid>
        <Grid item xs={1}>
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
              style={{ width: 50 }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          ) : (
            <>{""}</>
          )}
        </Grid>

        {/* <Grid item xs={1}>
          <Typography>
            {timeCom.length !== 0 ? timeCom + " hrs." : "-"}
          </Typography>
        </Grid> */}
        <Grid item xs={2}>
          <Typography>{Title}</Typography>
        </Grid>
        {/* <Grid item xs={2} style={{ marginRight: "3px" }}>
          <Typography>
            {CourseType.split(";")
              .map((e) => fType(e))
              .join(", ")}
          </Typography>
        </Grid> */}

        <Grid item xs={2}>
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
            <Grid item xs={12} container direction="row" spacing={5}>
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
                      <Avatar style={{ backgroundColor: randoxmizedHex() }}>
                        {fInitials(result.name)}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography>{result.name}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} container direction="row" spacing={10}>
                <Grid xs={6} item container direction="column" spacing={1}>
                  <Grid item container direction="row" spacing={10}>
                    <Grid xs={6} item container direction="column" spacing={1}>
                      <Grid item>
                        <Typography variant="h6">Time</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{`${from}-${to}`}</Typography>
                      </Grid>
                    </Grid>
                    <Grid xs={6} item container direction="column" spacing={1}>
                      <Grid item>
                        <Typography variant="h6">Rhythm</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{fryhthm(rhythm)}</Typography>
                      </Grid>
                    </Grid>
                    <Grid xs={6} item container direction="column" spacing={1}>
                      <Grid item>
                        <Typography variant="h6">Day</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{fday(day)}</Typography>
                      </Grid>
                    </Grid>
                    <Grid xs={1} item container direction="column" spacing={0}>
                      <Grid item>
                        <Typography variant="h6">E-Learn</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{elearn !== "" ? elearn : ""}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  xs={4}
                  item
                  container
                  direction="column"
                  spacing={1}
                  style={{ marginLeft: "65px" }}
                >
                  <Grid item>
                    <Typography variant="h6">Duration</Typography>
                  </Grid>
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
                </Grid>
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "5px" }}>
              <Grid item xs={8}></Grid>
              <Grid item xs={4}>
                <IconButton onClick={handleShowMoreDetails}>
                  <Typography style={{ color: "#F39617" }}>
                    {showMoreDetails ? "LESS DETAILS" : "MORE DETAILS"}
                  </Typography>
                </IconButton>
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
                    <Typography variant="h6">Assigned Study Program</Typography>
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

            {/* <Grid
              item
              xs={5}
              container
              direction="column"
              justify="center"
              spacing={6}
            >
              <Grid item container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h6">Description</Typography>
                </Grid>
                <Grid item>
                  {Description !== "" ? Description : "No Description"}
                  <Typography></Typography>
                </Grid>
              </Grid>
              <Grid item container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h6">Assigned Study Program</Typography>
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
            </Grid> */}
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
};

export default SelectedCourse2;
