import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import CustomIconButton from "../../util/CustomIconButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";
//MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";

const Link = require("react-router-dom").Link;
var relativeTime = require("dayjs/plugin/relativeTime");

const style = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
  content: {
    padding: 25,
  },
};

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId}></DeletePost>
      ) : null;

    const likeStr = likeCount === 1 ? "like" : "likes";
    const commentStr = commentCount === 1 ? "comment" : "comments";
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title={"Profile Image"}
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/user/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>
            {likeCount} {likeStr}
          </span>
          <CustomIconButton title="Comment">
            <ChatIcon color="primary"></ChatIcon>
          </CustomIconButton>
          <span>
            {commentCount} {commentStr}
          </span>
          {deleteButton}
          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(style)(Post));
