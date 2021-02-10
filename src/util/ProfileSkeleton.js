import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../images/noimg.png";

//MUI
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  ...theme.globalVars,
  wrapper: {
    textAlign: "center",
  },
  handle: {
    height: "20px",
    backgroundColor: theme.palette.primary.main,
    width: "60px",
    margin: "0px auto 7px auto",
  },
  fullLine: {
    height: "15px",
    backgroundColor: theme.palette.primary.lineSkeleton,
    width: "80%",
    margin: "auto",
  },
  halfLine: {
    height: "15px",
    backgroundColor: theme.palette.primary.lineSkeleton,
    width: "50%",
    margin: "auto",
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <hr />
          <div className={classes.fullLine} />
          <hr />
          <div className={classes.halfLine} />
          <hr />
          <div className={classes.halfLine} />
          <hr />
          <div className={classes.halfLine} />
          <hr />
          <hr />
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
