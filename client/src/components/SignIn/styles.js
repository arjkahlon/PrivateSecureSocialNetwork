import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    "& .MuiContainer-root": {
      width: "100%",
    },
  },
  aboutUs: {
    backgroundColor: "rgb(248,240,227)",
    color: "rgb(0,0,0)",
    width: "53%",
    height: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    justifyContent: "center",
    verticalAlign: "center",
    alignItems: "center",
    marginTop: "9%",
    fontSize: "35px",
  },

  logout: {
    paddingLeft: "10%",
    paddingRight: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "73%",
    height: "20%",
    verticalAlign: "center",
    fontSize: "20px",
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(50,131,252)",
  },

  googleButton: {
    paddingLeft: "10%",
    paddingRight: "10%",
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(50,131,252)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    verticalAlign: "center",
    fontSize: "20px",
  },

  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
}));
