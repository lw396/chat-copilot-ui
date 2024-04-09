// material-ui
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO ||============================== //
const Div = styled('div')(({ theme }) => ({
  height: theme.spacing(2)
}));

const Logo = () => {
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <Div>
        <Typography variant="h2" gutterBottom>
          ChatCopilot
        </Typography>
      </Div>
    </>
  );
};

export default Logo;
