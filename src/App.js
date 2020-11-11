import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

//Components
import NavBar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute.js";
import themeFile from "./util/theme.js";

//Pages
import home from "./pages/Home.js";
import login from "./pages/Login.js";
import signup from "./pages/Signup.js";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    new Date(Date.now());
    // console.log(new Date(decodedToken.exp));
    // console.log(new Date(Date.now()));
    console.log("heheheh");
    // console.log("heheheh");
    // window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
