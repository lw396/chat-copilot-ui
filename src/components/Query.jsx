import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Query = ({ open, title, content, action, handleClose }) => {
  return (
    <Box>
      <Dialog fullWidth={true} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={action}>
            <FormattedMessage id="confirm" />
          </Button>
          <Button onClick={handleClose} autoFocus>
            <FormattedMessage id="cancel" />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

Query.propTypes = {
  title: PropTypes.object,
  content: PropTypes.object,
  action: PropTypes.func,
  handleClose: PropTypes.func,
};

export default Query;
