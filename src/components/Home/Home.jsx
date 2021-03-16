import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import UploadResumeComponent from '../UploadResumeComponent';

export default function HideAppBar() {
  return (
    <Container>
      <Box my={2}>
        <UploadResumeComponent />
      </Box>
    </Container>
  );
}
