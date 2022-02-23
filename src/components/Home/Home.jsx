import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import UploadResumeComponent from '../UploadResumeComponent';

export default function HideAppBar({ history }) {
  return (
    <Container>
      <Box my={2}>
        <UploadResumeComponent history={history} />
      </Box>
    </Container>
  );
}
