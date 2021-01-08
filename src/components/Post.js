import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import CustomIconButton from "../util/CustomIconButton";

//MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";

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
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.post.postId
      )
    ) {
      return true;
    } else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { body, createdAt, userImage, userHandle, likeCount, commentCount },
      user: { authenticated },
    } = this.props;

    const likeButton = !authenticated ? (
      <CustomIconButton title="Like">
        <Link to="/login">
          <FavoriteBorder color="primary"></FavoriteBorder>
        </Link>
      </CustomIconButton>
    ) : this.likedPost() ? (
      <CustomIconButton title="Unlike Post" onClick={this.unlikePost}>
        <FavoriteIcon color="primary"></FavoriteIcon>
      </CustomIconButton>
    ) : (
      <CustomIconButton title="Like Post" onClick={this.likePost}>
        <FavoriteBorder color="primary"></FavoriteBorder>
      </CustomIconButton>
    );

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
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>
            {likeCount} {likeStr}
          </span>
          <CustomIconButton title="Comment">
            <ChatIcon color="primary"></ChatIcon>
          </CustomIconButton>
          <span>
            {commentCount} {commentStr}
          </span>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(Post));
