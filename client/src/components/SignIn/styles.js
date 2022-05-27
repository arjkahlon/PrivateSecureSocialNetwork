import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  aboutUs: {
    backgroundColor: "rgb(40,51,64)",
    color: "rgb(255,255,255)",
    width: "53%",
    height: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    justifyContent: "center",
    verticalAlign: "center",
    alignItems: "center",
    marginTop: "2%",
    fontSize: "40px",
  },

  logout: {
    color: "rgb(255,255,255)",
    paddingLeft: "10%",
    paddingRight: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "73%",
    height: "20%",
    verticalAlign: "center",
    fontSize: "20px",
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(71,161,235)",
  },

  googleButton: {
    paddingLeft: "10%",
    paddingRight: "10%",
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(71,161,235)",
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
