import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(2),
  },
  arrayInput: {
    marginTop: theme.spacing(1),
  },
  input: {
    marginTop: theme.spacing(1),
  },
  section: {
    padding: "10px",
    marginTop: "10px",
  },
  label: {
    padding: "10px",
  },
  addIcon: {
    marginTop: theme.spacing(2),
    backgroundColor: "#07689f",
    "&:hover": {
      backgroundColor: "#d6e0f0",
    },
    color: "#393b44",
  },
}))
