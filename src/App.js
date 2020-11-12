import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Components
import NavBar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
import themeFile from "./util/theme";

//Pages
import home from "./pages/Home";
import login from "./pages/Login";
import signup from "./pages/Signup";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("FBIdToken");
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}>
                {/* <Redirect to="/login"></Redirect> */}
              </Route>
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
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
