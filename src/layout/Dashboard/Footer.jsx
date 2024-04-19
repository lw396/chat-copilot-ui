// material-ui
import { Stack, Typography } from "@mui/material";

const Footer = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ p: "24px 16px 0px", mt: "auto" }}
  >
    <Typography variant="caption">&copy; All rights reserved</Typography>
  </Stack>
);

export default Footer;
