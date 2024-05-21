import React from "react";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { preload } from "swr";

// project import
import useAuth from "hooks/useAuth";
import useScriptRef from "hooks/useScriptRef";
import IconButton from "components/@extended/IconButton";
import AnimateButton from "components/@extended/AnimateButton";
import { fetcher } from "utils/axios";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

// ============================|| JWT - LOGIN ||============================ //

const AuthLogin = () => {
  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "admin",
          password: "admin",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("用户不能为空"),
          password: Yup.string().max(255).required("密码不能为空"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.username, values.password);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              preload("v1/user", fetcher);
            }
          } catch (err) {
            console.error(err.msg);
            if (scriptedRef.current) {
              setOpen(true);
              setStatus({ success: false });
              setErrors({ submit: err.msg });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">用户名</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="username"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="请输入用户名"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                </Stack>
                {touched.username && errors.username && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-login"
                  >
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">密码</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="请输入密码"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    登录
                  </Button>
                </AnimateButton>
              </Grid>

              <Snackbar
                open={open && errors !== undefined}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
              >
                <Alert
                  severity="error"
                  variant="filled"
                  onClose={handleCloseAlert}
                >
                  {errors.submit}
                </Alert>
              </Snackbar>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
