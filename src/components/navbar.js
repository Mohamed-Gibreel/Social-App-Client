import React, { Component } from "react";

//MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const Link = require("react-router-dom").Link;

class navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/login">
            Log In
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default navbar;
