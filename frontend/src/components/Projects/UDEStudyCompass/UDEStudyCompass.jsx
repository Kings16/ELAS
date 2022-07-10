import { Button, Grid, Typography } from "@material-ui/core";
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
  const [addedCourses, setAddedCourses] = useState([]);
  const [historyClicked, setHistoryClicked] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(lectures)
  const handleHostoryToggle = () => {
    setHistoryClicked(!historyClicked);
  };

  useEffect(() => {
    Backend.get("/studycompass/get_studyprograms").then((response) => {
      setStudyprograms(response.data);
    });
  }, []);

  useEffect(() =>{
    return () => {};
  },[filteredCourses]);
  
  const getCoursesByIds = (filteredCoursesIds) =>{
    console.log("getCoursesByIds erreicht!")
    let filteredCourses =[];
    for (let lecture of lectures){
      if (filteredCoursesIds.includes(lecture.id) && ! addedCourses.includes(lecture) ){
        filteredCourses.push(lecture)
      }
    }
    setFilteredCourses (filteredCourses);
    console.log("filteredCourses:", filteredCourses)
    //setFilterPorcessed(true);
    
  }

  ///////////the method helps to get lecture data from the child component of homepage
  ///it also modifies the recieved data by adding field 'isSelected'. needed for removing element on click

  const getLectures = (data) => {
    data.map((el) => (el["isSelected"] = false));

    setLectures(data);
  };

  ///////the method removes course from the list of courses and add it to another list
  //which is then used for data representation in the selected courses
  const handleAddCoursesById = (courseId) => {
    for (let lecture of lectures) {
      if (lecture.id === courseId) {
        lecture.isSelected = true;
        const lecturesAfterRemove = lectures.filter((el) => el.id !== courseId);
        //setLectures(lecturesAfterRemove);
        setAddedCourses([...addedCourses, lecture]);
      }
    }
  };

  ////////////////////////////////////////////

  const handRemoveCourseFromHistoryById = (courseId) => {
    for (let lecture of lectures) {
      if (lecture.id === courseId) {
        setAddedCourses([...addedCourses, lecture]);
        const newHistoryafterRemove = historyCourses.filter(
          (el) => el.id !== courseId
        );
        setHistoryCourses(newHistoryafterRemove);
      }
    }
  };
  ///removes courses from selected Courses and add it back the main course component
  const [historyCourses, setHistoryCourses] = useState([]);
  const handRemoveCourseById = (courseId) => {
    for (let lecture of lectures) {
      if (lecture.id === courseId) {
        lecture.isSelected = false;
      }
    }
    for (let lecture of addedCourses) {
      if (lecture.id === courseId) {
        setHistoryCourses([...historyCourses, lecture]);
        const lecturesAfterRemove = addedCourses.filter(
          (el) => el.id !== courseId
        );
        setAddedCourses(lecturesAfterRemove);
      }
    }
    console.log("History");
    console.log(historyCourses);
  };
  const clearHistory = () => {
    setHistoryCourses([]);
  };
  /////////////////

  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  ////Modal Properties here
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleBackSelectedPage = () => {
    setLectures([]);
    setAddedCourses([]);
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
                  <Grid
                    item
                    xs={2}
                    container
                    direction="row"
                    alignItems="center"
                    justify="space-evenly"
                  >
                    <Grid item>
                      <Typography>
                        <IconButton onClick={handleOpen}>
                          <BorderColorIcon />
                        </IconButton>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>change study program</Typography>
                    </Grid>
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
                    //alignItems="center"
                    spacing={4}
                  >
                    <Grid item container direction="row" spacing={1}>
                      <Grid item>
                        <Typography>Your Semester Overview</Typography>
                      </Grid>
                      <Grid item>
                        {" "}
                        <SemesterOverviewCard />
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
                        <Grid item xs={7}>
                          <Typography>Selected Courses</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          style={{ color: "#F39617" }}
                          container
                          direction="row"
                          onClick={handleHostoryToggle}
                        >
                          {!historyClicked ? (
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
                                {historyCourses.length > 0 ? (
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
                          )}
                        </Grid>
                      </Grid>
                      {!historyClicked ? (
                        addedCourses.length !== 0 ? (
                          <>
                            {" "}
                            {addedCourses.map((selectedCourse) => (
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
                          {historyCourses.length !== 0 ? (
                            <>
                              {historyCourses.map((selectedCourse) => (
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
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={8} container direction="row" spacing={0}>
                    <Grid item xs={12}>
                      <StudyCompassFilters studyprogram={lectures} getCoursesByIds={getCoursesByIds}/>
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
                        {filteredCourses.map((filteredCourse) => (
                          <Grid item xs={12}>
                            <Course
                            studyprogram={filteredCourse}
                            handleAddById={handleAddCoursesById}
                          />
                          </Grid>
                        ))
                    // :
                    // lectures.map((studyprogram) => (
                    //   <Grid item xs={12}>
                    //     <Course
                    //       studyprogram={studyprogram}
                    //       handleAddById={handleAddCoursesById}
                    //     />
                    //   </Grid>
                    // ))
                     /*  /////////////to here */ 
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
    </>
  );
};

export default UDEStudyCompass;
