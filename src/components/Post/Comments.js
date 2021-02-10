import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Link = require("react-router-dom").Link;

const styles = (theme) => ({
  ...theme.globalVars,
  commentImage: {
    maxWidth: "100%",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: "20px",
  },
});

export class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments &&
          comments.map((comment, index) => {
            const { body, createdAt, userImage, userHandle } = comment;
            console.log(comments);
            return (
              <Fragment key={createdAt}>
                <Grid item sm={12}>
                  <Grid container>
                    <Grid item sm={2}>
                      <img
                        src={userImage}
                        alt="Profile"
                        className={classes.commentImage}
                      />
                    </Grid>
                    <Grid item sm={9}>
                      <div className={classes.commentData}>
                        <Typography
                          variant="h5"
                          component={Link}
                          to={`/user/${userHandle}`}
                          color="primary"
                        >
                          {userHandle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                        </Typography>
                        <hr className={classes.invisibleSeperator} />
                        <Typography variant="body1">{body}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                {index !== comments.length - 1 && (
                  <hr className={classes.visibleSeperator} />
                )}
              </Fragment>
            );
          })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array,
};

export default withStyles(styles)(Comments);
