import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

//Redux Stuff
import { connect } from "react-redux";

import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.globalVars,
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.errors && !nextProps.loading) {
      this.setState({
        body: "",
      });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.postId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { errors } = this.state;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on post"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="Submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
