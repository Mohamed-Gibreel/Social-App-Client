import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomIconButton from "../../util/CustomIconButton";
import CreatePost from "../Post/CreatePost";
import Notifications from "./Notifications";

//MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//Icons
import HomeIcon from "@material-ui/icons/Home";

const Link = require("react-router-dom").Link;

const createPost = <CreatePost />;

class navbar extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { authenticated } = this.props;
    return (
      <AppBar style={{ backgroundColor: "#424242" }}>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              {createPost}
              <CustomIconButton title="Go to Homepage" component={Link} to="/">
                <HomeIcon />
              </CustomIconButton>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Log In
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(navbar);
