import React from "react"
import PropTypes from "prop-types"
import {
  Typography,
  InputAdornment,
  IconButton,
  Button,
  TextField,
  Grid,
  Tooltip,
} from "@material-ui/core"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import { useStyles } from "./styles"
import Card from "@material-ui/core/Card"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import { handleInput } from "../../services/HandleInput"

import { disablebAddField } from "../../services/validationAddField"

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
  setGlobalError,
}) {
  const classes = useStyles()
  const isObject = (arg) => {
    return !!arg && arg.constructor === Object
  }
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
                                key={proj[Object.keys(proj)]["Team"]}
                                className={classes.input}
                                label="Team"
                                variant="outlined"
                                defaultValue={proj[Object.keys(proj)]["Team"]}
                                onBlur={(e) =>
                                  handleInput(
                                    setGlobalError,
                                    e.target.value,
                                    setSingleFieldProject(
                                      e.target.value,
                                      proj,
                                      "Team",
                                      indexProj
                                    )
                                  )
                                }
                              />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <TextField
                                className={classes.input}
                                fullWidth
                                key={proj[Object.keys(proj)]["$description"]}
                                label="Description"
                                variant="outlined"
                                defaultValue={
                                  proj[Object.keys(proj)]["$description"]
                                }
                                onBlur={(e) =>
                                  handleInput(
                                    setGlobalError,
                                    e.target.value,
                                    setSingleFieldProject(
                                      e.target.value,
                                      proj,
                                      "$description",
                                      indexProj
                                    )
                                  )
                                }
                              />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <TextField
                                className={classes.input}
                                key={proj[Object.keys(proj)]["Skills"]}
                                fullWidth
                                variant="outlined"
                                label="Skills"
                                defaultValue={proj[Object.keys(proj)]["Skills"]}
                                onBlur={(e) =>
                                  handleInput(
                                    setGlobalError,
                                    e.target.value,
                                    setSingleFieldProject(
                                      e.target.value,
                                      proj,
                                      "Skills",
                                      indexProj
                                    )
                                  )
                                }
                              />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Typography>
                                Responsibilities
                                <>
                                  {disablebAddField(
                                    proj[Object.keys(proj)]["Responsibilities"]
                                  ) ? (
                                    <Tooltip
                                      title="Please fill all input fields"
                                      placement="right"
                                    >
                                      <span>
                                        <IconButton
                                          variant="contained"
                                          disabled={disablebAddField(
                                            proj[Object.keys(proj)][
                                              "Responsibilities"
                                            ]
                                          )}
                                          onClick={() =>
                                            addFieldResponsibility(proj, indexProj)
                                          }
                                        >
                                          <AddIcon />
                                        </IconButton>
                                      </span>
                                    </Tooltip>
                                  ) : (
                                    <IconButton
                                      variant="contained"
                                      disabled={disablebAddField(
                                        proj[Object.keys(proj)]["Responsibilities"]
                                      )}
                                      onClick={() =>
                                        addFieldResponsibility(proj, indexProj)
                                      }
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  )}
                                </>
                              </Typography>
                            </Grid>
                            {proj[Object.keys(proj)]["Responsibilities"].map(
                              (res, index) => (
                                <Grid item sm={12} xs={12} key={res}>
                                  <OutlinedInput
                                    className={classes.input}
                                    fullWidth
                                    defaultValue={res}
                                    onBlur={(e) =>
                                      handleInput(
                                        setGlobalError,
                                        e.target.value,
                                        setValueResponsibility(
                                          e.target.value,
                                          proj,
                                          index,
                                          indexProj
                                        )
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
                              variant="contained"
                              color="secondary"
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
                        key={defaultValue}
                        label={label}
                        variant="outlined"
                        defaultValue={defaultValue}
                        onBlur={(e) =>
                          handleInput(
                            setGlobalError,
                            e.target.value,
                            setSingleObjectField(e.target.value, key, label)
                          )
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
  setGlobalError: PropTypes.bool,
}
