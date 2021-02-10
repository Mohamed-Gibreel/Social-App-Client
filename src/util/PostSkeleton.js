import React, { Fragment } from "react";
import NoImg from "../images/noimg.png";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

const style = (theme) => ({
  card: {
    display: "flex",
    marginBottom: "20px",
  },
  content: {
    width: "100%",
    flexDirection: "column",
    padding: "25px",
  },
  cover: {
    minWidth: "200px",
    objectFit: "cover",
  },
  handle: {
    width: "20%",
    height: "15px",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "7px",
  },
  date: {
    width: "30%",
    height: "10px",
    backgroundColor: theme.palette.primary.dateSkeleton,
    marginBottom: "10px",
  },
  fullLine: {
    width: "90%",
    height: "15px",
    backgroundColor: theme.palette.primary.lineSkeleton,
    marginBottom: "10px",
  },
  halfLine: {
    width: "40%",
    height: "15px",
    backgroundColor: theme.palette.primary.lineSkeleton,
    marginBottom: "10px",
  },
});

const PostSkeleton = (props) => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.content}>
        <div className={classes.handle}></div>
        <div className={classes.date}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.halfLine}></div>
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(PostSkeleton);
