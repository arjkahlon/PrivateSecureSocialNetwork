import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  // appBarSearch: {
  //   borderRadius: 4,
  //   marginBottom: "1rem",
  //   display: "flex",
  //   padding: "16px",
  //   backgroundColor: "rgba(21,32,43,0)",
  //   color: "rgb(255,255,255)",
  // },
  gridContainer: {
    // [theme.breakpoints.down("xs")]: {
    //   flexDirection: "column-reverse",
    // },
    backgroundColor: "rgba(21,32,43,0)",
    color: "rgb(255,255,255)",
    marginTop: "7%",
    width: "100%",
  },
  image: {
    flexWrap: "wrap",
    flex: 1,
    height: 30,
    lineHeight: "0.5%",
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(248,240,227)",
    color: "rgb(0,0,0)",
    flexGrow: 1,
  },
  heading: {
    color: "rgb(0,0,0)",
    textDecoration: "none",
  },
  image: {
    marginLeft: 0,
    height: "100px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "15%",
  },
  av: {
    backgroundColor: "rgb(248,240,227)",
    color: "rgb(0,0,0)",
  },
  popup: {
      alignItems: "center",
      justifyContent: "center",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
  },
  av: {
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(50,131,252)",
  },
  logout: {
    color: "rgb(0,0,0)",
    backgroundColor: "rgb(248,240,227)",
    fontSize: 30,
  },
  homeButton: {
    color: "rgb(0,0,0)",
    backgroundColor: "rgb(248,240,227)",
    fontSize: 20,
  },
  userProfile: {
    backgroundColor: "rgb(248,240,227)",
    elevation: 0,
    height: 60,
    width: "10%",
  },
  userName: {
    display: "flex",
    justifyContent: "center",

    textAlign: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    width: "95%",
  },
  postfilter: {
    color: "rgb(0, 0, 0)",
    backgroundColor: "rgba(21,32,43,0)",
  },
}));
