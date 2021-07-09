import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Fab } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { useStyles } from './styles';
import WriteResumeFile from '../WriteResumeFile';
import AddProjModal from '../AddProjModal';
import TechnologyStackForm from '../TechnologyStackForm';
import SecondarySectionPartForm from '../SecondarySectionPartForm';
import MainSectionPartForm from '../MainSectionPartForm';
import UserForm from '../UserForm';
import ResetFileAlert from '../ResetFileAlert';
import { StoreContext } from '../../store/Store';
import { observer } from 'mobx-react-lite';

const ResumeForm = observer(() => {
  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler);
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  const beforeUnloadHandler = e => {
    e.preventDefault();
    e.returnValue = 'Close without saving?';
    window.onunload = function () {
      deleteResume();
    };
  };

  const store = useContext(StoreContext);
  const classes = useStyles();
  const [showScroll, setShowScroll] = useState(false);
  const [globalError, setGlobalError] = useState(false);
  const [cancelEditFile, setCancelEditFile] = useState(false);
  const [openTsForm, setOpenTsForm] = useState(false);
  const [open, setOpen] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenTsForm = () => {
    setOpenTsForm(true);
  };

  const handleCloseTsForm = () => {
    setOpenTsForm(false);
  };

  const closeCancelEditFile = () => {
    setCancelEditFile(false);
  };

  const deleteResume = () => {
    store.resetStore();
    localStorage.removeItem('currentSha');
    localStorage.removeItem('currentPath');
  };

  const redirectToGitlab = () => {
    window.location.href = process.env.REACT_APP_GIT_REPO_URL;
    return null;
  };

  return (
    <div>
      <form>
        <Button
          fullWidth
          className={classes.button}
          color="primary"
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => setCancelEditFile(true)}
        >
          Home
        </Button>
        <Card className={classes.section}>
          <UserForm setGlobalError={setGlobalError} />
        </Card>
        <MainSectionPartForm setGlobalError={setGlobalError} />
        <SecondarySectionPartForm
          handleOpen={handleOpen}
          handleOpenTsForm={handleOpenTsForm}
          setGlobalError={setGlobalError}
        />
      </form>
      <WriteResumeFile globalError={globalError} />
      <AddProjModal handleClose={handleClose} open={open} />
      <TechnologyStackForm handleCloseTsForm={handleCloseTsForm} openTsForm={openTsForm} />
      <ResetFileAlert
        cancelEditFile={cancelEditFile}
        closeCancelEditFile={closeCancelEditFile}
        deleteResume={deleteResume}
      />
      {showScroll ? (
        <Fab
          color="primary"
          aria-label="Top"
          className={classes.scroll}
          onClick={() => scrollTop()}
        >
          <ArrowUpwardIcon />
        </Fab>
      ) : null}
      <Button
        fullWidth
        onClick={() => redirectToGitlab()}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Go to gitlab
      </Button>
      <Button
        fullWidth
        color="inherit"
        variant="outlined"
        component={Link}
        to="/reorder-block"
        className={classes.button}
      >
        Reorder pdf block
      </Button>
    </div>
  );
});

export default ResumeForm;
