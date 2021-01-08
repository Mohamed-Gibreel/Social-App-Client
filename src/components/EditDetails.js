import React, { Component, Fragment } from "react";
import CustomIconButton from "../util/CustomIconButton";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { setUserData } from "../redux/actions/userActions";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.globalVars,
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

class EditDetails extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      bio: "",
      website: "",
      location: "",
    };
  }

  setOpen = (value) => {
    this.setState({
      open: value,
    });
  };

  handleClickOpen = () => {
    this.setOpen(true);
  };

  handleClose = () => {
    this.setOpen(false);
  };

  handleSubmit = () => {
    const userData = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
    };
    this.props.setUserData(userData);
    this.setOpen(false);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    const {
      user: { credentials },
    } = this.props;
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  }

  render() {
    const {
      classes,
      user: {
        credentials: { bio, website, location },
      },
    } = this.props;

    return (
      <Fragment>
        <CustomIconButton
          title="Edit User Details"
          className={classes.buttons}
          onClick={this.handleClickOpen}
        >
          <EditIcon color="primary" />
        </CustomIconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit User Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                label="Bio"
                type="text"
                placeholder="A short description of yourself."
                defaultValue={bio}
                multiline
                rows="2"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                label="Location"
                type="text"
                placeholder="Where you live."
                defaultValue={location}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                label="Website"
                type="text"
                placeholder="Name of your website."
                defaultValue={website}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  user: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  setUserData,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditDetails));
