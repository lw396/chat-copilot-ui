import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

export default function SimpleSnackbar({ message, type }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  console.log(message);
  setOpen(true);

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionProps={{ onExited: handleExited }}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

SimpleSnackbar.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
};

// SimpleSnackbar.defaultProps = {
//   message: 'This is a success message!',
//   type: 'success'
// };
