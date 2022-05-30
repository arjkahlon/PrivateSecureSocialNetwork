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
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
    backgroundColor: "rgba(21,32,43,0)",
    color: "rgb(255,255,255)",
    marginTop: "7%",
    width: "100%",
  },
}));
