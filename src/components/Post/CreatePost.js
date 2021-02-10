import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import CustomIconButton from "../../util/CustomIconButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { createPost, clearErrors } from "../../redux/actions/dataActions";

import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.globalVars,
  closeBtn: {
    float: "right",
    position: "relative",
    top: "-8px",
  },
});

class CreatePost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
    this.props.clearErrors();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (!nextProps.errors && !nextProps.loading) {
      this.setState({
        errros: {},
        open: false,
        body: "",
      });
    }
  }

  createPost = (event) => {
    event.preventDefault();
    const post = {
      body: this.state.body,
    };
    this.props.createPost(post);
  };

  render() {
    const { errors } = this.state;
    const { classes, loading } = this.props;
    return (
      <Fragment>
        <CustomIconButton title="Add a post" onClick={this.handleOpen}>
          <AddIcon />
        </CustomIconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <Fragment>Add a post !</Fragment>
            <CustomIconButton
              title="Close Button"
              btnClassName={classes.closeBtn}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </CustomIconButton>
          </DialogTitle>
          <form noValidate onSubmit={this.createPost}>
            <DialogContent>
              <TextField
                name="body"
                label="Body"
                type="text"
                placeholder="What would you like to say ?"
                multiline
                rows="3"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                type="submit"
                disabled={loading}
                variant="contained"
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  loading: state.UI.loading,
});

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { createPost, clearErrors })(
  withStyles(styles)(CreatePost)
);
