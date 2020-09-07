import React from "react"
import PropTypes from "prop-types"
import {
  Typography,
  Input,
  InputAdornment,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Paper,
  Fab,
  Grid,
} from "@material-ui/core"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import { useStyles } from "./styles"

export default function SectionForm({
  sectionsField,
  setValueResponsibility,
  removeFieldResponsibility,
  addFieldResponsibility,
  setSingleObjectField,
  removeTools,
  handleOpenTsForm,
  setSingleFieldProject,
  removeProject,
}) {
  const classes = useStyles()
  const isObject = (arg) => {
    return !!arg && arg.constructor === Object
  }
  return (
    <>
      {Object.entries(sectionsField).map(([key, value]) =>
        isObject(value) ? (
          <div className={classes.main}>
            {/* MultiValueForm */}
            <Typography variant="subtitle2">{key}</Typography>
            {Object.entries(value).map(([label, defaultValue]) => (
              <>
                {label === "$projects" ? (
                  <>
                    {sectionsField["SIGNIFICANT PROJECTS"].$projects.map(
                      (proj, indexProj) => (
                        <Paper className={classes.section} key={Object.keys(proj)}>
                          <Typography className={classes.projTitle}>
                            {Object.keys(proj)}
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                fullWidth
                                label="$description"
                                defaultValue={
                                  proj[Object.keys(proj)]["$description"]
                                }
                                onChange={(e) =>
                                  setSingleFieldProject(
                                    e.target.value,
                                    proj,
                                    "$description",
                                    indexProj
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                fullWidth
                                label="Skills"
                                defaultValue={proj[Object.keys(proj)]["Skills"]}
                                onChange={(e) =>
                                  setSingleFieldProject(
                                    e.target.value,
                                    proj,
                                    "Skills",
                                    indexProj
                                  )
                                }
                              />
                            </Grid>
                          </Grid>
                          <Typography>Responsibilities</Typography>
                          {proj[Object.keys(proj)]["Responsibilities"].map(
                            (res, index) => (
                              <Input
                                className={classes.input}
                                fullWidth
                                key={index}
                                defaultValue={res}
                                onChange={(e) =>
                                  setValueResponsibility(
                                    e.target.value,
                                    proj,
                                    index,
                                    indexProj
                                  )
                                }
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      variant="contained"
                                      color="secondary"
                                      onClick={() =>
                                        removeFieldResponsibility(
                                          proj,
                                          index,
                                          indexProj
                                        )
                                      }
                                    >
                                      <RemoveCircleOutlineIcon />
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            )
                          )}
                          <Fab
                            color="primary"
                            aria-label="add"
                            onClick={() => addFieldResponsibility(proj, indexProj)}
                          >
                            <AddIcon />
                          </Fab>
                          <TextField
                            fullWidth
                            label="Team"
                            defaultValue={proj[Object.keys(proj)]["Team"]}
                            onChange={(e) =>
                              setSingleFieldProject(
                                e.target.value,
                                proj,
                                "Team",
                                indexProj
                              )
                            }
                          />
                          <IconButton
                            aria-label="Remove project"
                            color="secondary"
                            onClick={() => removeProject(indexProj)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Paper>
                      )
                    )}
                  </>
                ) : (
                  <FormControl fullWidth className={classes.section}>
                    <InputLabel
                      shrink
                      htmlFor="single-input"
                      className={classes.label}
                    >
                      {label}
                    </InputLabel>
                    <Input
                      className={classes.input}
                      key={label}
                      id="single-input"
                      defaultValue={defaultValue}
                      onChange={(e) =>
                        setSingleObjectField(e.target.value, key, label)
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            variant="contained"
                            color="secondary"
                            onClick={() => removeTools(label)}
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              </>
            ))}
            {key === "TOOLS & FRAMEWORKS" ? (
              <Button variant="contained" onClick={handleOpenTsForm}>
                Add technology stack
              </Button>
            ) : null}
          </div>
        ) : null
      )}
    </>
  )
}

SectionForm.propTypes = {
  sectionsField: PropTypes.objectOf(Object).isRequired,
  setValueResponsibility: PropTypes.func.isRequired,
  removeFieldResponsibility: PropTypes.func.isRequired,
  addFieldResponsibility: PropTypes.func.isRequired,
  setSingleObjectField: PropTypes.func.isRequired,
  removeTools: PropTypes.func.isRequired,
  handleOpenTsForm: PropTypes.func.isRequired,
  setSingleFieldProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
}
