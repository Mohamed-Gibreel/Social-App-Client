import React, { Component } from "react";
import PropTypes from "prop-types";
import appicon from "../images/appicon.svg";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CiruclarProgress from "@material-ui/core/CircularProgress";

//Redux Stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

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
      errors: {},
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.UI.errors) {
      const errors = props.UI.errors;
      return { errors };
    }
    return null;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;

    const errors = this.state.errors;

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
            <small style={{ color: "#fff" }}>
              Don't have an account ? Sign Up <Link to="/signup">here</Link> !
            </small>
          </div>
        </form>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user, UI: state.UI });

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
