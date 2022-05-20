import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      color: "rgb(255,255,255)",
    },
    color: "rgb(255,255,255)",
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "rgb(40,51,64)",
    color: "rgb(255,255,255)",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    color: "rgb(255,255,255)",
  },
  labeltext: {
    color: "rgb(136,153,166)",
  },
  text: {
    color: "rgb(255,255,255)",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
    color: "rgb(255,255,255)",
  },
  buttonSubmit: {
    marginBottom: 10,
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(71,161,235)",
  },
}));
