import React, { Component } from "react";
import PropTypes from "prop-types";
import appicon from "../images/appicon.svg";
import axios from "axios";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CiruclarProgress from "@material-ui/core/CircularProgress";

const Link = require("react-router-dom").Link;

const styles = (theme) => ({
  ...theme.globalVars,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", userData)
      .then((res) => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        console.log(res.data);
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
          Login
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
            Login
            {loading && (
              <CiruclarProgress
                size={25}
                className={classes.proress}
              ></CiruclarProgress>
            )}
          </Button>
          <div>
            <small>
              Don't have an account ? Sign Up <Link to="/signup">here</Link> !
            </small>
          </div>
        </form>
        {/* <div className={classes.footerContainer}>
          <div className={classes.footer}>
            Icons made by{" "}
            <a
              target="_blank"
              href="https://www.flaticon.com/authors/freepik"
              title="Freepik"
              rel="noopener noreferrer"
            >
              Freepik
            </a>{" "}
            from{" "}
            <a
              target="_blank"
              href="https://www.flaticon.com/"
              title="Flaticon"
              rel="noopener noreferrer"
            >
              www.flaticon.com
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(login);
