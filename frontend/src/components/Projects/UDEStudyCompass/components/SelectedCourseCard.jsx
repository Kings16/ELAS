import React, { useState } from "react";
import clsx from "clsx";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { orange, red, lightBlue } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
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

  //const [selected, setSelected] = useState(false);
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

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Grid container direction="row" xs={12}>
        <CardHeader
          avatar={
            <IconButton
              aria-label="delete"
              /*nClick={function(event){ addCourseToOtherList(selectedCourse); handleRemoval()}}*/
              onClick={() => {
                //addCourseToOtherList(selectedCourse);
                // handleRemoval(selectedCourse);
              }}
            >
              {selected ? (
                <IndeterminateCheckBoxIcon style={{ color: "orange" }} />
              ) : (
                <AddBoxIcon style={{ color: "orange" }} />
              )}
            </IconButton>
          }
          title={
            <Grid container spacing={2} direction="row">
              <Grid item xs={5}>
                <Typography variant="body1" component="">
                  {fday(day)}
                </Typography>
                <Typography variant="body1" component=""></Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body1" component="">
                  nameHERE
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

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid item className={classes.mainTitle} xs={12} align="center">
                <Typography Bigtitle variant="h5" align="center">
                  CourseTitleHere
                </Typography>
              </Grid>
              <Grid item xs={12} align="left">
                <Typography variant="body2" style={{ fontWeight: 600 }}>
                  Professors:
                </Typography>
              </Grid>
              <Grid container spacing={1} direction="row">
                <Grid item xs={2.5}>
                  <IconButton aria-label="Professor's Profil">
                    <Avatar className={classes.avatar} align="center">
                      #propIntitialshere
                    </Avatar>
                  </IconButton>
                </Grid>
                <Grid item xs={9.5}>
                  <Typography Bigtitle variant="h6" align="center">
                    ProNAMEHERE
                  </Typography>
                </Grid>
              </Grid>

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
                        tIMEoFcoursehere
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
                        #dayhere
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
                        #rythmhere
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        Bigtitle
                        variant="body1"
                        align="left"
                        style={{ fontWeight: 600 }}
                      >
                        E-Learn
                      </Typography>
                      <Typography Bigtitle variant="body1" align="left">
                        #elern
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
                  <Typography Bigtitle variant="body1" align="left">
                    From
                  </Typography>
                  <Typography Bigtitle variant="body1" align="left">
                    #datafrom
                  </Typography>
                  <Typography Bigtitle variant="body1" align="left">
                    To
                  </Typography>
                  <Typography
                    Bigtitle
                    variant="body1"
                    align="left"
                    style={{ display: "inline-block", whiteSpace: "pre-line" }}
                  ></Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} align="right">
                <Button MORE_DETAILS style={{ color: "orange" }}>
                  MORE DETAILS
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Grid>
    </Card>
  );
};

export default SelectedCoursesCard;
