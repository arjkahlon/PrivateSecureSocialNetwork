import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      backgroundColor: "rgb(248,240,227)",
      color: "rgb(0,0,0)",
    },
    color: "rgb(0,0,0)",
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "rgb(248,240,227)",
    color: "rgb(0,0,0)",
    marginTop: "5%",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    color: "rgb(0,0,0)",
  },
  labeltext: {
    color: "rgb(0,0,0)",
  },
  text: {
    color: "rgb(0,0,0)",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
    color: "rgb(0,0,0)",
  },
  buttonSubmit: {
    marginBottom: 10,
    color: "rgb(255,255,255)",
    backgroundColor: "rgb(50,131,252)",
  },
}));
