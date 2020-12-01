import React, { Component, Fragment } from "react";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ToolTip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconButton from "@material-ui/core/IconButton";

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
  state = {
    open: false,
  };

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
  render() {
    const { classes } = this.props;
    console.log(classes.button);
    return (
      <Fragment>
        <ToolTip title="Edit User Details">
          <IconButton
            className={classes.buttons}
            onClick={this.handleClickOpen}
          >
            <EditIcon color="primary" />
          </IconButton>
        </ToolTip>
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
                multiline
                rows="2"
                className={classes.textField}
                fullWidth
              />
              <TextField
                id="location"
                label="Location"
                type="text"
                placeholder="Where you live."
                className={classes.textField}
                fullWidth
              />
              <TextField
                name="website"
                label="Website"
                type="text"
                placeholder="Name of your website."
                className={classes.textField}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(EditDetails);
