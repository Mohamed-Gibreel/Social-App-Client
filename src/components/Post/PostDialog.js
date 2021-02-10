import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import CustomIconButton from "../../util/CustomIconButton";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";

//Redux Stuff
import { connect } from "react-redux";

import { getPost, clearErrors } from "../../redux/actions/dataActions";
import { CircularProgress } from "@material-ui/core";

const Link = require("react-router-dom").Link;

const styles = (theme) => ({
  ...theme.globalVars,
  profileImage: {
    maxWidth: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: "20px ",
  },
  closeBtn: {
    top: "5px",
    position: "absolute",
    left: "90%",
  },
  circularProgress: {
    textAlign: "center",
    marginTop: "50",
    marginBottom: "50",
  },
});

class PostDialog extends Component {
  state = {
    open: false,
    newPath: null,
    oldPath: null,
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    this.props.getPost(this.props.postId);
    let oldPath = window.location.pathname;
    const { userHandle, postId } = this.props;
    const newPath = `/user/${userHandle}/post/${postId}`;
    if (oldPath === newPath) {
      oldPath = `/user/${userHandle}`;
    }
    window.history.pushState(null, null, newPath);
    this.setState({ open: true });
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.props.clearErrors();
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      post: {
        comments,
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
      },
      UI: { loading },
    } = this.props;

    const likeStr = likeCount === 1 ? "like" : "likes";
    const commentStr = commentCount === 1 ? "comment" : "comments";

    const dialogMarkup = loading ? (
      <div className={classes.circularProgress}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container>
        <CustomIconButton
          title="Close Button"
          btnClassName={classes.closeBtn}
          onClick={this.handleClose}
        >
          <CloseIcon />
        </CustomIconButton>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="Profile Img"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/user/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>
            {likeCount} {likeStr}
          </span>
          <CustomIconButton title="Comment">
            <ChatIcon color="primary" />
          </CustomIconButton>
          <span>
            {commentCount} {commentStr}
          </span>
        </Grid>
        <CommentForm postId={postId} />
        <hr className={classes.visibleSeperator} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <CustomIconButton
          onClick={this.handleOpen}
          title="Expand Post"
          btnClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </CustomIconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionstoProps = {
  getPost,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionstoProps
)(withStyles(styles)(PostDialog));
