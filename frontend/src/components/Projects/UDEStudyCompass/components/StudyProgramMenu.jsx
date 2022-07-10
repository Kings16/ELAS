import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Backend from "../../../../assets/functions/Backend";
import {
  Divider,
  Box,
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import ExploreIcon from "@material-ui/icons/Explore";
//import { studyprogram } from "./data/studyprograms";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { styled } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FB9B0E",
    },
    secondary: {
      main: "#FB9B0E",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontVariant: "small-caps",
    alignContent: "center",
  },
  card: {
    borderRadius: 15,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  label: {
    fontSize: 18,
  },
  box: {
    alignContent: "center",
    width: "100%",
    marginTop: "20px",
    justify: "center",
    textAlign: "center",
  },
  boxx: {
    alignContent: "center",
    width: "100%",
    justify: "center",
    textAlign: "left",
  },
  wel: {
    fontSize: 20,
    justify: "center",
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.15px",
  },
  heading: {
    fontSize: 96,
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto",
    fontStyle: "bold",
    lineHeight: "112px",
    verticalAlign: "top",
    letterSpacing: "-1.5px",
    width: "100%",
  },
  headingdialog: {
    fontSize: 24,
    justify: "center",
    textAlign: "center",
    fontFamily: "Roboto",
    fontStyle: "bold",
    lineHeight: "112px",
    verticalAlign: "center",
    letterSpacing: "-1.5px",
    width: "100%",
  },
  study: {
    color: "#3C56BA",
  },
  campass: {
    color: "#FB9B0E",
  },
  search: {
    width: "182px",
    height: "36px",
    borderRadius: "4px",
    backgroundColor: "FB9B0E",
    color: "FB9B0E",
  },
  explore: {
    color: "FB9B0E",
    fontsize: 96,
  },
  aboutlogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    justify: "center",
    textAlign: "center",
    fontFamily: "Roboto",
    fontStyle: "bold",
    verticalAlign: "center",
    letterSpacing: "-1.5px",
    width: "100%",
  },

  aboutss: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: 24,
    justify: "center",
    textAlign: "center",
    fontFamily: "Roboto",
    fontStyle: "bold",
    verticalAlign: "center",
    letterSpacing: "-1.5px",
    width: "100%",
  },
  lightbox: {
    display: "none",
  },
  hidelightbox: {
    display: "none",
  },
  resetContainer: {
    padding: theme.spacing(3),
    alignItems: "center",
  },
  aboutlink: {
    fontWeight: 467,
    fontSize: 15,
    letterSpacing: 0.15,
    color: "#303F9F",
  },
  extre: {
    fontStyle: "bold",
    fontFamily: "Roboto",
    marginBottom: "30px",
    marginTop: "10px",
  },
  buttons: {
    marginTop: 10,
    width: 50,
    fontVariant: "small-caps",
  },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(10),
    width: "100%",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const CourseMenu = (props) => {
  const { studyPrograms } = props;

  const [studyProgramid, setStudyProgramid] = useState();
  const [lectures, setLectures] = useState([]);
  const [lecturesLoading, setLecturesLoading] = useState(false);

  const fetchLectures = async () => {
    setLecturesLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/studycompass/get_lectures_with_root_id?id=${studyProgramid}`
      );
      const response2 = await Backend.get(
        "/studycompass/get_lectures_with_root_id",
        { params: { id: studyProgramid } }
      ).then((res) => {
        // setStudyprograms(response.data);
        return res.data;
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setLectures(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLecturesLoading(false);
      getLectureCourse();
    }
  };

  const getLectureCourse = () => {
    props.getlectures(lectures);
  };

  ////////////////////////////////////Sending only filtered data to filter component

  //////////////////////////////////

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Container maxWidth="sm">
          <Box className={classes.box}>
            <Typography variant="h6" className={classes.wel}>
              Welcome to
            </Typography>
          </Box>
          <Box className={classes.box}>
            <Typography variant="h1" className={classes.heading}>
              <Typography variant="body" className={classes.campass}>
                <ExploreIcon
                  variant="body"
                  style={{
                    fontSize: "96px",
                  }}
                >
                  {" "}
                </ExploreIcon>
              </Typography>
              <Typography variant="body" className={classes.study}>
                Study
              </Typography>
              <Typography variant="body" className={classes.campass}>
                Compass
              </Typography>
            </Typography>
          </Box>

          <Box className={classes.box}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              className={classes.box}
              options={studyPrograms}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                setStudyProgramid(value.id);
              }}
              style={{ width: 650 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for your studyprogram"
                  variant="outlined"
                />
              )}
            />
          </Box>
          <Box className={classes.box}>
            <Button
              onClick={() => {
                fetchLectures();
                getLectureCourse();
              }}
              variant="contained"
              style={{ backgroundColor: "#FB9B0E", color: "white" }}
              className={classes.search}
            >
              {" "}
              <SearchIcon> </SearchIcon>Search
            </Button>
          </Box>
          <Box className={classes.box}>
            {" "}
            <Divider variant="middle" />{" "}
          </Box>

          <Box className={classes.box}>
            <Link href="#" underline="none" onClick={handleClickOpen}>
              {"What is StudyCompass?"}
            </Link>
          </Box>

          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            maxWidth="lg"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            ></BootstrapDialogTitle>
            <DialogContent>
              <Typography variant="h1" className={classes.aboutlogo}>
                <Typography variant="body" className={classes.campass}>
                  <ExploreIcon
                    variant="body"
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    {" "}
                  </ExploreIcon>
                </Typography>
                <Typography
                  variant="body"
                  style={{
                    fontSize: "40px",
                  }}
                  className={classes.study}
                >
                  Study
                </Typography>
                <Typography
                  variant="body"
                  style={{
                    fontSize: "40px",
                  }}
                  className={classes.campass}
                >
                  Camposs
                </Typography>
              </Typography>
              <Box className={classes.boxx}>
                <Typography variant="h5" className={classes.extre}>
                  About Study Compass{" "}
                </Typography>
              </Box>
              <Box className={classes.boxx}>
                <Typography gutterBottom>
                  This tool helps you in planning of subjects that you can take
                  in one semester. You will get an overview of all the courses
                  offered by your study program in that semester. Afterwards you
                  can select the courses you like and see their comparison based
                  on course rating and time overlapping.
                </Typography>
              </Box>

              <Box className={classes.boxx}>
                <Typography variant="h6" className={classes.extre}>
                  This Tool Offers
                </Typography>
              </Box>
              <Box className={classes.boxx}>
                <Typography gutterBottom>
                  Visual analysis to support decision making on the selection of
                  the courses
                </Typography>
              </Box>
              <Box className={classes.boxx}>
                <Typography gutterBottom>
                  Based on course catalog data
                </Typography>
              </Box>
              <Box className={classes.boxx}>
                <Typography gutterBottom>
                  Planning courses according to the semesters
                </Typography>
              </Box>
              <Box className={classes.boxx}>
                <Typography gutterBottom>
                  Students can select the courses and be able to compare them
                  based on various aspects such as recommendation,
                  understandability and so on which are done by those who have
                  already passed the listed course
                </Typography>
              </Box>
              <Box className={classes.box}>
                {" "}
                <Divider
                  mt={"30px"}
                  mb={"30px"}
                  className={classes.extre}
                  variant="middle"
                />{" "}
              </Box>
              <Box className={classes.aboutss}>
                <Link href="#" className={classes.aboutlink}>
                  {"About Universty"}
                </Link>
                <Link href="#" className={classes.aboutlink}>
                  {"Study Courses"}
                </Link>
                <Link href="#" className={classes.aboutlink}>
                  {"Faculties"}
                </Link>
                <Link href="#" className={classes.aboutlink}>
                  {"International Office"}
                </Link>
              </Box>
            </DialogContent>
          </BootstrapDialog>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default CourseMenu;
