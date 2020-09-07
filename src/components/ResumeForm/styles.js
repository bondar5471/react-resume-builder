import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  main: {
    padding: "20px",
    textAlign: "center",
  },
  arrayInput: {
    marginTop: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(1),
  },
  userSection: {
    marginTop: "15px",
    padding: "10px",
  },
  sectionForms: {
    marginTop: "15px",
  },
  section: {
    padding: "10px",
    marginTop: "10px",
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
