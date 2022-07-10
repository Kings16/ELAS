import React, { useEffect, useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  createMuiTheme,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/core/Slider';
import Backend from "../../../../assets/functions/Backend";
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
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
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "20px",
    justify: "center",
    textAlign: "center",

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
    textAlign: "center",
    justify: "center",
    fontFamily: "Roboto",
    fontStyle: "bold",
    lineHeight: "112px",
    verticalAlign: "top",
    letterSpacing: "-1.5px",
    width: "100%",
  },
  search: {
    width: "182px",
    height: "36px",
    borderRadius: "4px",
    backgroundColor: "FB9B0E",
    color: "FB9B0E",
  },
  listed: {
    height: "100%",

  },
  resetContainer: {
    padding: theme.spacing(3),
    alignItems: "center",
  },
  buttons: {
    marginTop: 10,
    width: 50,
    fontVariant: "small-caps",
  },
  formControl: {
    //margin: theme.spacing(0),
    minWidth: 140,
    maxWidth: 140
  }
}));






// for (let study of studyprogram) {
//       if (!courses.includes(study.subject_type))
//         courses.push(study.subject_type)
//       if (!Swss.includes(study.sws))
//         Swss.push(study.sws)
//       if (!languages.includes(study.language))
//       languages.push(study.language)
//       for (let tita of study.timetable) {
//         if (!Days.includes(tita.day))
//           Days.push(tita.day)
//         for (let frm in tita.time) {
//           if (!Times.includes(frm["from"]))
//             Times.push(frm["from"])

//         }
//       }
//     }
  



const marksTime = [
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
  },
  {
    value: 11,
  },
  {
    value: 12,
  },
  {
    value: 13,
  },
  {
    value: 14,
  },
  {
    value: 15,
  },
  {
    value: 16,
  },
  {
    value: 17,
  },
  {
    value: 18,
  },
  {
    value: 19,

  },
  {
    value: 20,

  },

];


export default function Filters(props) {
  const {getCoursesByIds} = props
  
  const classes = useStyles();
  
  
  const [studyprogram, setStudyProgram] = useState(props.studyprogram);
  console.log(studyprogram)

  const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 50;
const MenuProps = {
  props: {
    style: {
      Height:1000 ,
      width: 250,
    },
  },
};
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

const courses = [];
const languages = [];
const Times = [];
const Days = [];
const Swss = [];
const filterAllVaribles = () =>{
  for (let study of studyprogram) {
    if (!courses.includes(study.subject_type))
      courses.push(study.subject_type)
    if (!Swss.includes(study.sws))
      Swss.push(study.sws)
    if (!languages.includes(study.language))
      languages.push(study.language)
    for (let tita of study.timetable) {
      if (!Days.includes(tita.day))
        Days.push(tita.day)
      for (let frm in tita.time) {
        if (!Times.includes(frm["from"]))
          Times.push(frm["from"])
        }
      }
  }
}
  filterAllVaribles();
  const mm = Math.min.apply(Math, Swss) ;   
  const ll = Math.max.apply(Math, Swss);   // 12
  

  
  // const { studyPrograms } = props;

  // const [studyProgramid, setStudyProgramid] = useState();
  // const [lectures, setLectures] = useState([]);
  // const [lecturesLoading, setLecturesLoading] = useState(false);

  // const fetchLectures = async () => {
  //   setLecturesLoading(true);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/studycompass/get_lectures_with_root_id?id=${studyProgramid}`
  //     );
  //     const response2 = await Backend.get(
  //       "/studycompass/get_lectures_with_root_id",
  //       { params: { id: studyProgramid } }
  //     ).then((res) => {
  //       // setStudyprograms(response.data);
  //       return res.data;
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error! status: ${response.status}`);
  //     }
  //     const result = await response.json();
  //     setLectures(result);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLecturesLoading(false);
  //     getLectureCourse();
  //   }
  // };

  // const getLectureCourse = () => {
  //   props.getlectures(lectures);
  // };
  
  const [coursetype, setcourse] = React.useState(courses);
  const [language, setlanguage] = React.useState(languages);
  const [dayz, setdyaz] = React.useState(Days);
  const [swz, setswz] = React.useState([mm ,ll]); // sws
  const [ttime, settime] = React.useState([]);
  const [searchtext,setname] = React.useState() // search
  const [value, setValue] = React.useState([8, 20]); // time
  const filters = [coursetype,language,dayz,swz,value,searchtext]

  React.useEffect(() =>{
    filterCourses()
  },[coursetype,language,dayz,swz,searchtext,value]
  )


  console.log(filters)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterCourses = () => { 
    let filteredCoursesIds = [];

    for (let study of studyprogram){
        if(coursetype.includes(study.subject_type)){
          console.log('coursetype: ', coursetype);
          if(language.includes(study.language)){ 
            console.log('language: ', language);
            if(swz[0] <= parseInt(study.sws) && swz[1] >= parseInt(study.sws)){
              console.log('swz[0]:',swz[0]);
              console.log('swz[1]:',swz[1]);
              for (let tt of study.timetable){
                if(dayz.includes(tt.day)){
                  console.log('dayz:',dayz);
                  if(value[0] <= valueteReverse(tt.time.from)){
                    console.log('value[0]:',value[0]);
                    if(value[1] >= valueteReverse(tt.time.to)){
                      console.log('value[1]:',value[1]);
                      if (! filteredCoursesIds.includes(study.id))
                        filteredCoursesIds.push(study.id)
                    }
                  }
                }
              }
            }
          }
        }
      }
    console.log("filtered Courses IDs: ", filteredCoursesIds);
    getCoursesByIds(filteredCoursesIds);

  };



  // old but working but too long
  // const filterCourses = () => { 
  //   let filteredCoursesIds = [];
    
  //   for (let study of studyprogram){

  //       if(coursetype.includes(study.subject_type)){
  //         console.log("coursetype in filterCourses Function:",coursetype )
  //         console.log("coursetype.includes(study.subject_type)");
  //         if(language.includes(study.language)){
  //           console.log("language.includes(study.language)");
  //           if(swz[0] <= parseInt(study.sws) && swz[1] >= parseInt(study.sws)){
  //             console.log("swz[0] <= parseInt(study.sws) && swz[1] >= parseInt(study.sws)");
              
  //             let bothDaysAreIn = false
  //             console.log("study.timetable", study.timetable)
  //             for (let tt of study.timetable){
  //               console.log("tt.day:", tt.day);
                
                
  //               if(dayz.includes(tt.day)){
  //                 console.log("dayz.includes(tt.day)")
  //                 bothDaysAreIn = true
  //               }
  //               else if (! dayz.includes(tt.day)){
  //                 console.log("! dayz.includes(tt.day)")
  //                 bothDaysAreIn = false
  //                 break
  //               }
  //             }
  //             if(bothDaysAreIn){
  //               let bothTimesAreIn = false
                
  //               for (let tt of study.timetable){
  //                 console.log("Time zu Int gemacht", valueteReverse(tt.time.from))
  //                 console.log("tt.time.from:", tt.time.from);
  //                 console.log("tt.time.to:", tt.time.to);
  //                 console.log("value[0]:", value[0]);
  //                 console.log("value[1]:", value[1]);
  //                 console.log("valueteReverse(tt.time.from):",valueteReverse(tt.time.from))
  //                 console.log("valueteReverse(tt.time.to):",valueteReverse(tt.time.to))
  //                 if(value[0] <= valueteReverse(tt.time.from)){
  //                   console.log("value[0] <= valueteReverse(tt.time.from)")
  //                   if(value[1] >= valueteReverse(tt.time.to)){
  //                     console.log("value[1] >= valueteReverse(tt.time.to)")
  //                     bothTimesAreIn = true
  //                   }
  //                 }
  //                 else if (!( value[0] <= valueteReverse(tt.time.from))){
  //                   bothTimesAreIn = false
  //                   break
  //                 }

  //               console.log("bothDaysAreIn:", bothDaysAreIn);
  //               console.log("bothTimesAreIn:", bothTimesAreIn);
  //               }
  //               if (bothTimesAreIn){
  //                 //If all filter condition are sucsessfull we push the id of this lecture into an Array
  //                 filteredCoursesIds.push(study.id)
  //               }
  //               else if (bothTimesAreIn){
  //                 continue
  //               }
                  
  //             }
  //             else if (bothDaysAreIn){
  //               continue
  //             } 
  //           }

  //           }
  //         }
        
    
  //   console.log("coursetype",coursetype);
  //   console.log("language",language);
  //   console.log("swz[0]",swz[0]);
  //   console.log("swz[1]",swz[1]);
  //   console.log("dayz: ",dayz)
  //   console.log("study.id:", study.id);
  //   console.log("study.subject_type:", study.subject_type);
  //   console.log("language:", study.language);
  //   console.log("study.sws:", study.sws);
  //   console.log("study.timetable:", study.timetable );

  //   console.log("::::::::::::::::::::::::::::", );
  //       }
  //   console.log("filtered Courses IDs: ", filteredCoursesIds);
  //   getCoursesByIds(filteredCoursesIds);
    
  // };
    

  const handlecourseChange = (event) => {
    console.log("Coursetypes in aktuellen Filterlisten:",event.target.value);
    setcourse(event.target.value);

  };
  const handlelangeChange = (event) => {
    console.log("Languges in aktuellen Filterlisten",event.target.value);
    setlanguage(event.target.value);
  };

  const handlesearchChange = (event) => {
    console.log("Search in aktuellen Filterlisten",event.target.value);
    setname(event.target.value);
  };

  const handletimeChange = (event, newValue) => {
    setValue(newValue);
  };

  const handledayzChange = (event) => {
    console.log("Dayz in aktuellen Filterlisten",event.target.value);
    setdyaz(event.target.value);
  };
  const handleswzChange = (event, newValue) => {
    console.log("Sws in aktuellen Filterlisten", newValue);
    setswz(newValue);
  };

  function valuetext(swz) {
    return `${swz}h`;
  }

  function valuete(value) {
    return `${value}:00`;
  }
  function valueteReverse(value){
    return parseInt(value.split(":")[0])
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
          
        <Grid container xs={12} direction="row" spacing={1}>


          <Grid item>
            {/* Course Type */}
            <FormControl className={classes.formControl} variant="filled">
            <InputLabel id="demo-simple-select-label" margin='dense' >Course Type</InputLabel>
            <Select
              multiple
              style={{backgroundColor : 'white'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coursetype}
              label="Course Type"
              onChange={
                handlecourseChange
                }
              renderValue={(selected) => selected.join(', ')}
            >
              {courses.map((name) => (
                <MenuItem key={name} value={name}   >
                  <ListItemText primary={name} />
                  <Checkbox 
                  checked={ (coursetype.indexOf(name) > -1 ) }
                   
                  />

                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>

          <Grid item>
            {/* Language */}
            <FormControl className={classes.formControl} variant="filled">
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                disableUnderline
                multiple
                value={language}
                label="Language"
                onChange={
                  handlelangeChange
                }
                renderValue={(selected) => selected.join(', ')}
                >
                  {languages.map((name) => (
                  <MenuItem key={name} value={name}   >
                  <ListItemText primary={name}  />
                  <Checkbox checked={language.indexOf(name) > -1}
                  /></MenuItem>
                  ))}
              </Select>
          </FormControl>
          </Grid>
          <Grid item>
            {/* Day */}
          <FormControl className={classes.formControl} variant="filled">
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
             style={{backgroundColor : 'white'}}
             
              labelId="demo-simple-select-label"
              multiple
              id="demo-simple-select"
              value={dayz}
              label="Day"
              onChange={handledayzChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {Days.map((name) => (
                <MenuItem key={name} value={name}   >
                  <ListItemText primary={name} />
                  <Checkbox 
                  checked={dayz.indexOf(name) > -1} 
                  />
                         {/* change the value ZB Di. -> tuersday */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>

          
          <Grid item>
          {/* Time */}
          <FormControl className={classes.formControl} variant="filled">
            <InputLabel id="demo-simple-select-label" variant="filled">Time</InputLabel>
            <Select
             style={{backgroundColor : 'white'}}
             
              labelId="demo-simple-select-label"
              multiple  
              id="demo-simple-select"
              value={value}
              label="Time"
              renderValue={(selected) => selected.join(' - ')}
            >
              <MenuItem style={{ height: "100px", }} >
              {/* <TextField disabled label="from"  value={value} > </TextField> */}
 
              <Typography>{value[0]}:00 - {value[1]}:00</Typography>
              
              {/* <TextField disabled label="to" defaultValue="20:00" > </TextField> */}
              </MenuItem>
              <MenuItem style={{ height: "100px", }} >
                <Slider
                 style={{backgroundColor : 'white'}}
                 variant="filled"
                  getAriaValueText={valuete}
                  value={value}
                  onChange={handletimeChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="discrete-slider-custom"
                  marks={marksTime}
                  valueLabelFormat={valuete}
                  min={8}
                  max={20}
                />
              </MenuItem>
            </Select>
          </FormControl>
          </Grid>

          

          <Grid item>
            {/* SWS */}
          <FormControl className={classes.formControl}  variant="filled">
            <InputLabel id="demo-simple-select-label" variant="filled">SWS</InputLabel>
            <Select
             style={{backgroundColor : 'white'}}
             
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={swz}
              label="SWS"
              renderValue={(swz) => swz.join(' - ')}
              MenuProps={MenuProps}
            >
              <MenuItem style={{ height: "100px", }} >
              <Typography>{swz[0]}h - {swz[1]}h</Typography>
              </MenuItem>
              <MenuItem style={{ height: "100px", }} >
                <Slider
                  getAriaValueText={valuetext}
                  value={swz}
                  onChange={handleswzChange}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valuetext}
                  aria-labelledby="discrete-slider-custom"
                  min={mm}
                  max={ll}

                />
              </MenuItem>

            </Select>
          </FormControl>
          </Grid>


          <Grid item>
            {/* search */}
          <TextField style={{ width: "200px", backgroundColor : 'white'}}
            id="input-with-icon-textfield"
            aria-label="center"
            value={searchtext}
            onChange={handlesearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="center">
                  <SearchIcon style={{ color: "#000", }}>  </SearchIcon>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            label="Search for courses"
          />
        </Grid>
        </Grid>
        
      </React.Fragment>
    </ThemeProvider>
  );
}