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
} from "@material-ui/core"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import DeleteIcon from "@material-ui/icons/Delete"
import ControlPointIcon from "@material-ui/icons/ControlPoint"
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
          <>
            {/* MultiValueForm */}
            <Typography variant="h4">{key}</Typography>
            {Object.entries(value).map(([label, defaultValue]) => (
              <>
                {label === "$projects" ? (
                  <>
                    {sectionsField["SIGNIFICANT PROJECTS"].$projects.map(
                      (proj, indexProj) => (
                        <div key={Object.keys(proj)}>
                          <Typography>{Object.keys(proj)}</Typography>
                          <TextField
                            className={classes.input}
                            fullWidth
                            label="$description"
                            defaultValue={proj[Object.keys(proj)]["$description"]}
                            onChange={(e) =>
                              setSingleFieldProject(
                                e.target.value,
                                proj,
                                "$description",
                                indexProj
                              )
                            }
                          />
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
                          <IconButton
                            color="primary"
                            onClick={() => addFieldResponsibility(proj, indexProj)}
                          >
                            <ControlPointIcon />
                          </IconButton>
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
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor="single-input">
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
          </>
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
