import * as React from "react";
import { Alert, Snackbar } from "@mui/material";

const Alerting = ({ type, content }) => {
  const [open, setOpen] = React.useState(content !== "");
  const handleCloseAlert = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert severity={type} variant="filled">
          {content}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Alerting;
