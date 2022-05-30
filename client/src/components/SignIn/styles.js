import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    "& .MuiContainer-root": {
      width: "100%",
    },
  },
  aboutUs: {
    color: "rgb(0,0,0)",
    width: "30%",
    height: 300,
    justifyContent: "justify",
    verticalAlign: "right",
    alignItems: "justify",
    marginTop: "20%",
    marginBottom: "20%",
    fontSize: "20px",
    marginLeft: 0,
  },
  image: {
    marginTop: "20%",
    marginBottom: "20%",
    marginRight: 0,
    height: 300,
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
