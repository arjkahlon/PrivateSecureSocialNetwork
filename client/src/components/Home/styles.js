import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
}));
