import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "rgba(21,32,43,0)",
    color: "rgb(255,255,255)",
    position: "sticky",
    zIndex: 5,
  },
  heading: {
    color: "rgb(255,255,255)",
    textDecoration: "none",
    backgroundColor: "rgba(21,32,43,0)",
  },
  image: {
    marginLeft: "14px",
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(21,32,43,0)",
    height: "100px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(21,32,43,0)",
  },
  av: {
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(0,0,0,0)",
  },
  popup: {
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(21,32,43,0)",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(21,32,43,0)",
  },
  av: {
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(21,32,43,0)",
  },
  logout: {
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(21,32,43,0)",
  },

  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(21,32,43,0)",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(21,32,43,0)",
  },
}));
