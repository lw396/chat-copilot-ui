import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// api
import { removeToken } from 'utils/auto';

// assets
import { LogoutOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();

  const handleLogout = async () => {
    removeToken();
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Typography variant="subtitle1">admin</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 100,
                  minWidth: 150,
                  maxWidth: 150,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    {open && (
                      <>
                        <List
                          component="nav"
                          sx={{
                            p: 0,
                            '& .MuiListItemIcon-root': { minWidth: 40, color: theme.palette.grey[500] }
                          }}
                        >
                          <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                              <LogoutOutlined />
                            </ListItemIcon>
                            <ListItemText primary="注销" />
                          </ListItemButton>
                        </List>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
