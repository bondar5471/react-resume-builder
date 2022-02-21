import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, Typography, IconButton } from '@material-ui/core';
import { useStickyState } from '../../services/StickyState';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default function ReorderBlock({ history }) {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('resumeFields'))) {
      history.push('/');
    }
  }, []);

  const classes = useStyles();
  const userField = JSON.parse(localStorage.getItem('resumeFields'))
    ? JSON.parse(localStorage.getItem('resumeFields')).cv.$person
    : [];
  const [sectionsField, setSectionField] = useStickyState(
    JSON.parse(localStorage.getItem('resumeFields'))
      ? JSON.parse(localStorage.getItem('resumeFields')).cv.$person
      : [],
    'updatedSectionState',
  );

  const checkReorderKey = key => {
    const keys = Object.keys(sectionsField);
    const itFirst = keys[0] === key;
    const itLast = keys[keys.length - 1] === key;
    return {
      disabled: {
        first: itFirst,
        last: itLast,
      },
    };
  };

  const swap = (input, oldIndex, newIndex) => {
    let keys = Object.keys(input);
    let values = Object.values(input);
    move(keys, oldIndex, newIndex);
    move(values, oldIndex, newIndex);
    let result = values.reduce(function (result, field, index) {
      result[keys[index]] = field;
      return result;
    }, {});
    return result;
  };

  const move = (array, from, to) => {
    let numberOfDeletedElm = 1;
    const elm = array.splice(from, numberOfDeletedElm)[0];
    numberOfDeletedElm = 0;
    array.splice(to, numberOfDeletedElm, elm);
  };

  const changeOrderUp = currentIndex => {
    const moveTo = currentIndex - 1;
    setSectionField(swap(sectionsField, currentIndex, moveTo));
  };

  const changeOrderDown = currentIndex => {
    const moveTo = currentIndex + 1;
    setSectionField(swap(sectionsField, currentIndex, moveTo));
  };

  const renderItemByType = value => {
    let type;
    if (Array.isArray(value)) {
      type = 'array';
    } else {
      type = typeof value;
    }
    switch (type) {
      case 'string':
        return <Paper>{value}</Paper>;
      case 'array':
        return (
          <span>
            {value.map(item => (
              <Paper key={item}>{item}</Paper>
            ))}
          </span>
        );
      case 'object':
        return (
          <React.Fragment>
            {Object.entries(value).map(([key, value]) => (
              <React.Fragment key={value}>
                {key === '$projects' ? (
                  <>
                    <h4>Project list...</h4>
                  </>
                ) : (
                  <div>
                    <h4>{key}</h4>
                    <p key={key}>{value}</p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      default:
        return;
    }
  };

  return (
    <Paper className={classes.main}>
      <Typography variant="h2" align="center">
        PDF sections preview
      </Typography>
      <Paper>
        {Object.entries(userField).map(([key, value]) => (
          <div key={key} className={classes.user}>
            <Typography>{`${key.substring(1)}: ${value}`}</Typography>
          </div>
        ))}
      </Paper>
      <Paper className={classes.sectionBlock}>
        {Object.entries(sectionsField).map(([key, value], index) => (
          <Paper key={key} className={classes.resumeBlock}>
            <Typography variant="h4">{key}</Typography>
            {renderItemByType(value)}
            <div>
              <IconButton
                color="primary"
                aria-label="Up"
                disabled={checkReorderKey(key).disabled.first}
                onClick={() => changeOrderUp(index)}
              >
                <ArrowUpwardIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                color="secondary"
                aria-label="Down"
                disabled={checkReorderKey(key).disabled.last}
                onClick={() => changeOrderDown(index)}
              >
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </div>
          </Paper>
        ))}
      </Paper>
      <Button fullWidth variant="outlined" component={Link} to="/">
        Save
      </Button>
    </Paper>
  );
}

ReorderBlock.propTypes = {
  history: PropTypes.object,
};
