import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  footer: {
    width: "100%",
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(248,240,227)",
    color: "rgb(0,0,0)",
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    fontSize: 20,
    lineHeight: "0.5%",
    padding: "0.2%",
    textAlign: "center",
  },
  image: {
    flexWrap: "wrap",
    flex: 1,
    height: 30,
    lineHeight: "0.5%",
  },
}));
