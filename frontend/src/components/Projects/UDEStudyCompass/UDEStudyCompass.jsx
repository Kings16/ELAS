import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";

const UDEStudyCompass = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Grid container style={{ paddingTop: 24 }}>
      <Grid item xs={0} md={1} />
      {/* <Grid item xs style={{ backgroundColor: "#fff", height: "100vh" }}> */}
      <Grid item xs>
        {/* TODO: Your new components here */}
        <Typography variant="h2" align="center">
          New StudyCompass Homepage
        </Typography>
      </Grid>
      <Grid item xs={0} md={1} />
    </Grid>
  );
};

export default UDEStudyCompass;
