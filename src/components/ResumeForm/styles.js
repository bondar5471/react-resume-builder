import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  main: {
    padding: "20px",
  },
  arrayInput: {
    marginTop: theme.spacing(1),
  },
  section: {
    marginTop: "15px",
    padding: "16px",
  },
  sectionForms: {
    marginTop: "15px",
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
