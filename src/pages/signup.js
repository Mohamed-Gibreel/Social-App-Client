import React, { Component } from "react";
import PropTypes from "prop-types";
import appicon from "../images/appicon.svg";
import axios from "axios";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CiruclarProgress from "@material-ui/core/CircularProgress";

const Link = require("react-router-dom").Link;

const styles = (theme) => ({
  ...theme.globalVars,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };

    axios
      .post("/signup", newUserData)
      .then((res) => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push("/"); // redirect to home page
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data.errors
            ? err.response.data.errors
            : err.response.data,
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { loading, errors } = this.state;
    return (
      <div className={classes.formContainer}>
        <img src={appicon} alt="AppIcon" className={classes.appIcon} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            error={errors.email ? true : false}
            helperText={errors.email}
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            error={errors.password ? true : false}
            helperText={errors.password}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={this.state.confirmPassword}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            value={this.state.handle}
            error={errors.handle ? true : false}
            helperText={errors.handle}
            onChange={this.handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress
                size={25}
                className={classes.proress}
              ></CircularProgress>
            )}
          </Button>
          <div>
            <small>
              Already have an account ? Log in <Link to="/login">here</Link> !
            </small>
          </div>
        </form>
      </div>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(signup);
