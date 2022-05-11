import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundBlendMode: "darken",
    color: "rgb(255,255,255)",
  },
  border: {
    border: "solid",
    color: "rgb(0,0,0)",
  },
  fullHeightCard: {
    height: "100%",
    color: "rgb(255,255,255)",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",

    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
  grid: {
    display: "flex",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
  title: {
    padding: "0 16px",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
    backgroundColor: "rgba(0,0,0,1)",
    color: "rgb(255,255,255)",
  },
});
