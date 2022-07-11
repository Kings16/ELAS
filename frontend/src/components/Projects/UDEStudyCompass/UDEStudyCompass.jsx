import {
  Button,
  Grid,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import Schedule from "./components/Schedule";
import Courses from "./components/Courses";
import { Course } from "./components/Courses";
import CourseMenu from "./components/StudyProgramMenu";
import Backend from "../../../assets/functions/Backend";
import StudyCompassFilters from "./components/Filters";
import SemesterOverviewCard from "./components/SemesterOverviewCard";
import SelectedCoursesCard from "./components/SelectedCourseCard";
import SelectedCourse2 from "./components/SelectedCourseCard2";
import ExploreIcon from "@material-ui/icons/Explore";
import HistoryIcon from "@material-ui/icons/History";
import IconButton from "@material-ui/core/IconButton";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: "12px",
  },
}));

const UDEStudyCompass = () => {
  const [studyPrograms, setStudyprograms] = useState("");
  const [lectures, setLectures] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [historyClicked, setHistoryClicked] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(lectures);
  const [filterPorcessed, setFilterPorcessed] = useState(true);
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [hoursWeekly, setHoursWeekly] = useState(0);
  const handleHostoryToggle = () => {
    setHistoryClicked(!historyClicked);
  };

  useEffect(() => {
    Backend.get("/studycompass/get_studyprograms").then((response) => {
      setStudyprograms(response.data);
    });
  }, []);

  //These useEffects are needed to rerender the Courses in Realtime (if filteredCourses is change it will not render and then render again with the Condition for the filteredCourses.map-function in the return Statement)
  useEffect(() => {
    if (filterPorcessed === false) {
      setFilterPorcessed(true);
    }
  }, [filterPorcessed]);

  useEffect(() => {
    setFilterPorcessed(false);
  }, [filteredCourses]);

  ////////////////////
  //This function is needed to set the filteredCourses-State
  const getCoursesByIds = (filteredCoursesIds) => {
    console.log("getCoursesByIds erreicht!");
    let filteredCourses = [];

    for (let lecture of lectures) {
      if (
        filteredCoursesIds.includes(lecture.id) &&
        !selectedCourses.includes(lecture)
      ) {
        filteredCourses.push(lecture);
      }
    }
    setFilteredCourses(filteredCourses);
    console.log("filteredCourses:", filteredCourses);
    //setFilterPorcessed(true);
  };

  ///////////the method helps to get lecture data from the child component of homepage
  ///it also modifies the recieved data by adding field 'isSelected'. needed for removing element on click

  const getLectures = (data) => {
    data.map((el) => (el["isSelected"] = false));

    setLectures(data);
  };

  ///////the method removes course from the list of courses and add it to another list
  //which is then used for data representation in the selected courses
  const handleAddCoursesById = (courseId) => {
    console.log("courseId used to added to SelectedCourses:", courseId);
    let tempSelectedCourses = selectedCourses;
    let totals = hoursWeekly;
    for (let lecture of lectures) {
      if (lecture.id === courseId) {
        lecture.isSelected = true;
        tempSelectedCourses.push(lecture);
        totals = hoursWeekly + parseInt(lecture.sws);
        const lecturesAfterRemove = lectures.filter((el) => el.id !== courseId);
        setLectures(lecturesAfterRemove);
      }
    }
    setHoursWeekly(totals);
    console.log("Total SWSs: ", hoursWeekly);
    console.log("tempSelectedCourses  added from Courses", tempSelectedCourses);
    setSelectedCourses(tempSelectedCourses);
    console.log("selectedCourses after added from Courses", selectedCourses);
  };

  //////////////////////////////////////////// not in use by anything

  // const handRemoveCourseFromHistoryById = (courseId) => {
  //   for (let lecture of lectures) {
  //     if (lecture.id === courseId) {
  //       setSelectedCourses([...selectedCourses, lecture]);
  //       const newHistoryafterRemove = selectedCoursesHistory.filter(
  //         (el) => el.id !== courseId
  //       );
  //       setSelectedCoursesHistory(newHistoryafterRemove);
  //     }
  //   }
  // };
  ///removes courses from selected Courses and add it back the main course component
  const [selectedCoursesHistory, setSelectedCoursesHistory] = useState([]);
  // const handRemoveCourseById = (courseId) => {
  //   for (let lecture of lectures) {
  //     if (lecture.id === courseId) {
  //       lecture.isSelected = false;
  //     }
  //   }
  //   for (let lecture of selectedCourses) {
  //     if (lecture.id === courseId) {
  //       setSelectedCoursesHistory([...selectedCoursesHistory, lecture]);
  //       // const lecturesAfterRemove = selectedCourses.filter(
  //       //   (el) => el.id !== courseId
  //       // );
  //       // setSelectedCourses(lecturesAfterRemove);
  //     }
  //   }
  //   console.log("History");
  //   console.log(selectedCoursesHistory);
  // };
  const clearHistory = () => {
    setSelectedCoursesHistory([]);
  };
  /////////////////

  const [showSchedule, setShowSchedule] = useState(false);
  // const of Snackbar
  const [snackPack, setSnackPack] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [lastCourseSwapped, setLastCourseSwapped] = useState(undefined);
  //React to handling Changes for Snackbar
  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpenSnackBar(true);
    } else if (snackPack.length && messageInfo && openSnackBar) {
      // Close an active snack when a new one is added
      setOpenSnackBar(false);
    }
  }, [snackPack, messageInfo, openSnackBar]);
  const handleRemoval = (selectedCourse) => {
    setOpenSnackBar(true);
    if (selectedCourse.selected === true) {
      let message = "Selected course restored";

      console.log(message);
      setMessageInfo(true);
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
      setLastCourseSwapped(selectedCourse);
    } else {
      let message = "Selected course removed";
      console.log(message);
      setMessageInfo(true);
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
      setLastCourseSwapped(selectedCourse);
    }
  };
  const handleUndo = (messageInfo) => {
    console.log("messageInfo:", messageInfo);
    console.log("message:", messageInfo.message);
    console.log("lastCourseSwapped", lastCourseSwapped);
    if (
      lastCourseSwapped !== undefined &&
      messageInfo.message === "Selected course removed"
    ) {
      console.log("Back to Selected");

      addCourseToSelected(lastCourseSwapped);
      setOpenSnackBar(false);
    }
    if (
      lastCourseSwapped !== undefined &&
      messageInfo.message === "Selected course removed"
    ) {
      console.log("Back to History");
      addCourseToHistory(lastCourseSwapped);
      setOpenSnackBar(false);
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  const handleExited = () => {
    setMessageInfo(undefined);
  };

  //////Functions to use for SelecedCourseCard handling
  const addCourseToSelected = (course) => {
    //tempöräre Liste erschaffen die gleich den selectedCourses ist
    let temp = selectedCourses;
    console.log("Course added to selected", course);
    course.isSelected = true;
    //Den Course in selectedCourses pushen
    /*check if it's already in */
    if (temp.every((c) => c.id !== course.id)) {
      temp.push(course);
    }
    console.log("selectedCoursesHistory:", temp);
    setSelectedCourses(temp);
    let filteredCourses = selectedCoursesHistory.filter(
      (c) => c.id !== course.id
    );
    setSelectedCoursesHistory(filteredCourses);
    console.log("selectedCoursesHistory:", filteredCourses);
    setHoursWeekly(hoursWeekly + parseInt(course.sws));
    handleRemoval("Seleced Course restored");
  };
  const addCourseToHistory = (course) => {
    let temp = selectedCoursesHistory;
    course.isSelected = false;
    console.log("Course added to history", course);
    temp.unshift(course);
    console.log("selectedCoursesHistory: ", temp);
    setSelectedCoursesHistory(temp);
    let filteredCourses = selectedCourses.filter((c) => c.id !== course.id);
    setSelectedCourses(filteredCourses);
    console.log("selectedCourses:", filteredCourses);
    setHoursWeekly(hoursWeekly - parseInt(course.sws));
    handleRemoval("Selected Course removed");
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  ////Modal Properties here
  const classes = useStyles();
  const [openDialogeToChangeStudyprogram, setOpenDialogeToChangeStudyprogram] =
    React.useState(false);

  const handleOpen = () => {
    setOpenDialogeToChangeStudyprogram(true);
  };
  const handleClose = () => {
    setOpenDialogeToChangeStudyprogram(false);
  };
  const handleBackSelectedPage = () => {
    setLectures([]);
    setSelectedCourses([]);
    handleClose([]);
  };

  //////////////

  return (
    <>
      <Grid container style={{ padding: 5 }}>
        <Grid item xs={0} md={1} />
        {/* <Grid item xs style={{ backgroundColor: "#fff", height: "100vh" }}> */}
        <Grid item xs>
          {/* TODO: Your new components here */}

          <Grid container spacing={5}>
            {lectures.length === 0 ? (
              <Grid item xs={12}>
                <CourseMenu
                  studyPrograms={studyPrograms}
                  getlectures={getLectures}
                />
              </Grid>
            ) : (
              <>
                <Grid
                  container
                  direction="row"
                  style={{ paddingTop: "42px" }}
                  alignItems="center"
                  justify="space-evenly"
                >
                  <Grid
                    item
                    xs={10}
                    style={{
                      fontSize: "32px",

                      fontFamily: "Roboto",
                      fontStyle: "bold",
                      lineHeight: "112px",
                      verticalAlign: "top",
                      letterSpacing: "-1.5px",
                      width: "100%",
                    }}
                  >
                    <Typography variant="body" style={{ color: "#FB9B0E" }}>
                      <ExploreIcon
                        variant="body"
                        style={{
                          fontSize: "32px",
                        }}
                      ></ExploreIcon>
                    </Typography>
                    <Typography variant="body" style={{ color: "#3C56BA" }}>
                      Study
                    </Typography>
                    <Typography variant="body" style={{ color: "#FB9B0E" }}>
                      Compass
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography>
                      <Button onClick={handleOpen}>
                        <BorderColorIcon />
                        change study program
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  spacing={5}
                  style={{ paddingTop: "24px" }}
                >
                  <Grid
                    item
                    xs={4}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    spacing={4}
                    //alignItems="center"
                  >
                    <Grid item container direction="row" spacing={1}>
                      <Grid item>
                        <Typography>Your Semester Overview</Typography>
                      </Grid>
                      <Grid item>
                        {" "}
                        <SemesterOverviewCard
                          hoursWeekly={hoursWeekly}
                          isOverlapping={isOverlapping}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      ite
                      container
                      direction="row"
                      spacing={1}
                      style={{ marginTop: "42px" }}
                    >
                      <Grid
                        item
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-evenly"
                      >
                        <Grid
                          item
                          xs={5}
                          style={{ color: "#F39617" }}
                          container
                          direction="row"
                          onClick={handleHostoryToggle}
                        >
                          {!historyClicked ? (
                            <Typography variant="body2">
                              Selected Cousres:
                            </Typography>
                          ) : (
                            <Typography variant="body2">History: </Typography>
                          )}
                        </Grid>
                        <Grid item>
                          <Button
                            aria-label="history"
                            style={{ color: "orange" }}
                          >
                            {!historyClicked ? (
                              <HistoryIcon
                                style={{ color: "orange" }}
                                onClick={() =>
                                  setHistoryClicked(!historyClicked)
                                }
                              ></HistoryIcon>
                            ) : (
                              <FormatListBulletedIcon
                                style={{ color: "orange" }}
                                onClick={() => {
                                  setHistoryClicked(!historyClicked);
                                }}
                              ></FormatListBulletedIcon>
                            )}
                            <Typography
                              onClick={() => setHistoryClicked(!historyClicked)}
                            >
                              {!historyClicked ? "History" : "Selected Courses"}
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item>
                          {/* {!historyClicked ? (
                            <Grid container direction="row" alignItems="center">
                              <Grid item XS={1}>
                                <IconButton>
                                  <HistoryIcon style={{ color: "#F39617" }} />
                                </IconButton>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography>History</Typography>
                              </Grid>
                            </Grid>
                          ) : (
                            <>
                              <Grid container direction="row" spacing={5}>
                                <Grid item xs={1}>
                                  <IconButton>
                                    <FormatListBulletedIcon
                                      style={{ color: "#F39617" }}
                                    />
                                  </IconButton>
                                </Grid>
                                <Grid item xs={1}>
                                  Selected Coureses
                                </Grid>
                              </Grid>
                              <Grid container direction="row">
                                <Grid item></Grid>
                                {selectedCoursesHistory.length > 0 ? (
                                  <Grid item>
                                    <IconButton onClick={clearHistory}>
                                      <Typography
                                        style={{
                                          color: "#F39617",
                                          fontSize: "11px",
                                        }}
                                      >
                                        Clear History
                                      </Typography>
                                    </IconButton>
                                  </Grid>
                                ) : (
                                  <>{null}</>
                                )}
                              </Grid>
                            </>
                          )} */}
                        </Grid>
                      </Grid>
                      <Grid container direction="column" spacing={2}>
                        {historyClicked ? (
                          selectedCoursesHistory.length !== 0 ? (
                            selectedCoursesHistory.map((course) => (
                              <Grid item>
                                <SelectedCoursesCard
                                  selectedCourse={course}
                                  addCourseToOtherList={addCourseToSelected}
                                  handleRemoval={handleRemoval}
                                />
                              </Grid>
                            ))
                          ) : (
                            <Grid item>
                              <Typography
                                variant="h4"
                                style={{ color: "#9e9e9e", padding: "30px" }}
                              >
                                Course History is Empty
                              </Typography>
                            </Grid>
                          )
                        ) : (
                          selectedCourses.map((course) => (
                            <Grid item>
                              <SelectedCoursesCard
                                selectedCourse={course}
                                addCourseToOtherList={addCourseToHistory}
                                handleRemoval={handleRemoval}
                              />
                            </Grid>
                          ))
                        )}
                      </Grid>
                      {/* {!historyClicked ? (
                        selectedCourses.length !== 0 ? (
                          <>
                            {" "}
                            {selectedCourses.map((selectedCourse) => (
                              <Grid item xs={12}>
                                <SelectedCourse2
                                  selectedCourse={selectedCourse}
                                  handleRemoveById={handRemoveCourseById}
                                />
                              </Grid>
                            ))}{" "}
                          </>
                        ) : (
                          <Grid item>
                            <Typography
                              variant="h4"
                              style={{ color: "#9e9e9e", padding: "30px" }}
                            >
                              Please Select a Course
                            </Typography>
                          </Grid>
                        )
                      ) : (
                        <>
                          {selectedCoursesHistory.length !== 0 ? (
                            <>
                              {selectedCoursesHistory.map((selectedCourse) => (
                                <Grid item xs={12}>
                                  <SelectedCourse2
                                    selectedCourse={selectedCourse}
                                    handleRemoveById={handRemoveCourseById}
                                    historyClicked={historyClicked}
                                    handRemoveFromHistoryById={
                                      handRemoveCourseFromHistoryById
                                    }
                                  />
                                </Grid>
                              ))}
                            </>
                          ) : (
                            <Grid item>
                              <Typography
                                variant="h4"
                                style={{ color: "#9e9e9e", padding: "30px" }}
                              >
                                Course History is Empty
                              </Typography>
                            </Grid>
                          )}
                        </>
                      )} */}
                    </Grid>
                  </Grid>
                  <Grid item xs={8} container direction="row" spacing={0}>
                    <Grid item xs={12}>
                      <StudyCompassFilters
                        studyprogram={lectures}
                        getCoursesByIds={getCoursesByIds}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      direction="row"
                      spacing={2}
                      style={{ marginTop: 42 }}
                    >
                      <Grid item xs={12}>
                        {" "}
                        <Courses />
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justify="space-evenly"
                      >
                        {filterPorcessed
                          ? filteredCourses.map((filteredCourse) => {
                              return (
                                <Grid item xs={12}>
                                  <Course
                                    studyprogram={filteredCourse}
                                    handleAddById={handleAddCoursesById}
                                  />
                                </Grid>
                              );
                            })
                          : null}

                        {
                          /* // :
                    // lectures.map((studyprogram) => (
                    //   <Grid item xs={12}>
                    //     <Course
                    //       studyprogram={studyprogram}
                    //       handleAddById={/*handleAddCoursesById}
                    //     />
                    //   </Grid>
                    // ))
                     /*  /////////////to here */
                          //    */
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={0} md={1} />
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDialogeToChangeStudyprogram}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDialogeToChangeStudyprogram}>
          <Grid className={classes.paper}>
            <Grid item>
              <Typography variant="h5" style={{ fontWeight: "100px" }}>
                Are you sure?
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                If you proceed, your content will be{" "}
                <span style={{ color: "#ff0000" }}>deleted</span>.<br></br> Are
                you sure you want to change the study program?
              </Typography>
            </Grid>
            <Grid item container direction="row">
              <Grid item>
                <IconButton onClick={handleClose}>
                  <Typography
                    style={{
                      backgroundColor: "#9e9e9e",
                      color: "000000",
                      padding: "8px",
                      borderRadius: "3px",
                    }}
                  >
                    Nevermind
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={handleBackSelectedPage}>
                  <Typography
                    style={{
                      backgroundColor: "#2E2EFF",
                      color: "#FFFFFF",
                      padding: "8px",
                      borderRadius: "3px",
                    }}
                  >
                    Proceed
                  </Typography>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
      <Snackbar
        textColour="orange"
        bodyStyle={{ color: "orange" }}
        style={{ color: "orange" }}
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        openDialogeToChangeStudyprogram={openDialogeToChangeStudyprogram}
        autoHideDuration={7000}
        onClose={handleClose}
        onExited={handleExited}
      >
        <SnackbarContent
          message={messageInfo ? messageInfo.message : undefined}
          action={
            <React.Fragment>
              <Button
                color="inherit"
                size="small"
                onClick={
                  //handleClose
                  /*not working because I can't access the message
                    {messageInfo.message} === "Selected course removed"
                      ? handleUndoToSelect()
                      : message === "Selected course removed"
                      ? handleUndoToHistory()
                      : setMessageInfo(false)
                    */
                  //this is also not working because I can't access the message
                  handleUndo({ messageInfo })
                }
              >
                UNDO
              </Button>
            </React.Fragment>
          }
          style={{
            backgroundColor: "orange",
          }}
        />
      </Snackbar>
    </>
  );
};

export default UDEStudyCompass;
