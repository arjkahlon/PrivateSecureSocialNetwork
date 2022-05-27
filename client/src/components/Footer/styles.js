import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  footer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(21,32,43,0)",
    color: "rgb(255,255,255)",
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
  },
}));
