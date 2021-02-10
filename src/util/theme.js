export default {
  palette: {
    type: "dark",
    primary: {
      light: "#33c9dc",
      main: "#90caf9",
      dark: "#008394",
      contrastText: "#fff",
      lineSkeleton: "rgba(0,0,0,0.6)",
      dateSkeleton: "rgba(0,0,0,0.3)",
    },
    secondary: {
      light: "#ff633",
      main: "#d43300",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  globalVars: {
    profile: {
      paper: {
        padding: 20,
      },
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .textInfo": {
        color: "red",
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#90caf9",
        },
        "& .profileActions": {
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        },
      },
      "& .buttons-profile": {
        display: "flex",
        justifyContent: "space-between",
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
    formContainer: {
      display: "grid",
      justifyContent: "center",
      textAlign: "center",
      height: "100",
    },
    form: {
      width: "450px",
      height: "200px",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
      color: "#fff",
    },
    footer: {
      position: "fixed",
      bottom: "2%",
      left: "42%",
    },
    footerContainer: {
      display: "grid",
      justifyContent: "center",
    },
    appIcon: {
      margin: "20px auto 20px auto",
      width: 125,
      height: "auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    customError: {
      color: "red",
      fontSize: ".8 rem",
    },
    button: {
      margin: "15px",
      position: "relative",
      textAlign: "center",
    },
    progress: {
      position: "absolute",
      left: "50",
      textAlign: "center",
    },
    invisibleSeperator: {
      border: "none",
      margin: "4px",
    },
    visibleSeperator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
  },
};
