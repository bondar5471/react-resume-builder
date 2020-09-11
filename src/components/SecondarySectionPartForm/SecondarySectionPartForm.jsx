import React from "react"
import PropTypes from "prop-types"
import {
  Typography,
  InputAdornment,
  IconButton,
  Button,
  TextField,
  Grid,
} from "@material-ui/core"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import { useStyles } from "./styles"
import Card from "@material-ui/core/Card"
import OutlinedInput from "@material-ui/core/OutlinedInput"

import { debounce } from "../../services/debounce"

export default function SecondarySectionPartForm({
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
  const debounceSetSingleField = React.useCallback(
    debounce(setSingleFieldProject, 300),
    []
  )
  const debounceSetValueResponsibility = React.useCallback(
    debounce(setValueResponsibility, 300),
    []
  )

  const debounceSetSingleObjectField = React.useCallback(
    debounce(setSingleObjectField, 300),
    []
  )
  return (
    <>
      {Object.entries(sectionsField).map(([key, value]) =>
        isObject(value) ? (
          <Card className={classes.section}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {key}
              {key === "TOOLS & FRAMEWORKS" ? (
                <IconButton onClick={handleOpenTsForm}>
                  <AddIcon />
                </IconButton>
              ) : null}
            </Typography>
            <Grid container spacing={2} justify="flex-start">
              {Object.entries(value).map(([label, defaultValue]) => (
                <>
                  {label === "$projects" ? (
                    <>
                      {sectionsField["SIGNIFICANT PROJECTS"].$projects.map(
                        (proj, indexProj) => (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography
                                fontStyle="italic"
                                className={classes.projTitle}
                                variant="subtitle2"
                                gutterBottom
                              >
                                {Object.keys(proj)}
                              </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <TextField
                                fullWidth
                                className={classes.input}
                                label="Team"
                                variant="outlined"
                                defaultValue={proj[Object.keys(proj)]["Team"]}
                                onChange={(e) =>
                                  debounceSetSingleField(
                                    e.target.value,
                                    proj,
                                    "Team",
                                    indexProj
                                  )
                                }
                              />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <TextField
                                className={classes.input}
                                fullWidth
                                label="Description"
                                variant="outlined"
                                defaultValue={
                                  proj[Object.keys(proj)]["$description"]
                                }
                                onChange={(e) =>
                                  debounceSetSingleField(
                                    e.target.value,
                                    proj,
                                    "$description",
                                    indexProj
                                  )
                                }
                              />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <TextField
                                className={classes.input}
                                fullWidth
                                variant="outlined"
                                label="Skills"
                                defaultValue={proj[Object.keys(proj)]["Skills"]}
                                onChange={(e) =>
                                  debounceSetSingleField(
                                    e.target.value,
                                    proj,
                                    "Skills",
                                    indexProj
                                  )
                                }
                              />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Typography>
                                Responsibilities
                                <IconButton
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    addFieldResponsibility(proj, indexProj)
                                  }
                                >
                                  <AddIcon />
                                </IconButton>
                              </Typography>
                            </Grid>
                            {proj[Object.keys(proj)]["Responsibilities"].map(
                              (res, index) => (
                                <Grid item sm={12} xs={12} key={index}>
                                  <OutlinedInput
                                    className={classes.input}
                                    fullWidth
                                    key={index}
                                    defaultValue={res}
                                    onChange={(e) =>
                                      debounceSetValueResponsibility(
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
                                </Grid>
                              )
                            )}
                            <Button
                              title={`Remove project ${Object.keys(proj)}`}
                              onClick={() => removeProject(indexProj)}
                              endIcon={<DeleteIcon />}
                            >
                              {`Remove project ${Object.keys(proj)}`}
                            </Button>
                          </>
                        )
                      )}
                    </>
                  ) : (
                    <Grid item sm={6} xs={12}>
                      <TextField
                        className={classes.input}
                        key={label}
                        label={label}
                        variant="outlined"
                        defaultValue={defaultValue}
                        onChange={(e) =>
                          debounceSetSingleObjectField(e.target.value, key, label)
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
                    </Grid>
                  )}
                </>
              ))}
            </Grid>
          </Card>
        ) : null
      )}
    </>
  )
}

SecondarySectionPartForm.propTypes = {
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
