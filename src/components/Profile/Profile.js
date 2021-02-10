import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import CustomIconButton from "../../util/CustomIconButton";
import ProfileSkeleton from "../../util/ProfileSkeleton";

//Redux Stuff
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Link = require("react-router-dom").Link;

const styles = (theme) => ({
  ...theme.globalVars,
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogoutUser = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <hr />
              <img src={imageUrl} alt="Profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
                hidden="hidden"
              />
              <CustomIconButton
                title="Edit Profile Image"
                onClick={this.handleEditPicture}
              >
                <PhotoCameraIcon color="primary" />
              </CustomIconButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/user/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && (
                <Fragment>
                  <Typography varient="body2">{bio}</Typography>
                  <hr />
                </Fragment>
              )}
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website
                      .substring(
                        website.indexOf(".") + 1,
                        website.lastIndexOf(".")
                      )
                      .replace(
                        website.charAt(12),
                        website.charAt(12).toUpperCase()
                      )}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
              <hr />
              <div className="profileActions">
                <EditDetails />
                <CustomIconButton
                  title="Logout User"
                  onClick={this.handleLogoutUser}
                >
                  <ExitToAppIcon color="primary" />
                </CustomIconButton>
              </div>
            </div>
          </div>
        </Paper>
      ) : (
        <div className={classes.profile}>
          <Paper className={classes.paper}>
            <hr />
            <Typography variant="body2" align="center">
              No profile found. Please login again!
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={"/login"}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={"/signup"}
              >
                Sign Up
              </Button>
            </div>
          </Paper>
        </div>
      )
    ) : (
      <ProfileSkeleton />
    );
    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
