import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

//@mui
import { Button, Divider, FormHelperText, Grid, IconButton, InputAdornment, Link, OutlinedInput, Stack, Typography } from '@mui/material';

//formik
import { Formik } from 'formik';
import * as Yup from 'yup';

//icons 
import EmailIcon from '@mui/icons-material/Email';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import amazon from '../../assets/amazon.svg';
import Facebook from '../../assets/Facebook.svg';
import google from '../../assets/google.svg';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleClick = () => {
    return (
      navigate('/')
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(128, 'EmailId must be at most 128 characters').required('Email is required*'),
          password: Yup.string().max(24, 'Password must be at most 24 characters').required('Password is required*')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleClick();
            setStatus({ success: true });
            setSubmitting(false);
            console.log(values)
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Stack spacing={1} pt={2}>
                <OutlinedInput
                  id="email"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email*"
                  fullWidth
                  autoComplete="off"
                  error={Boolean(touched.email && errors.email)}
                  sx={{
                    borderRadius: '10px',
                    color: '#000',
                    fontSize: '24px',
                    fontWeight: 400,
                    height: '53px',
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailIcon sx={{ color: '#572148' }} />
                    </InputAdornment>
                  }
                />
                {touched.email && errors.email && (
                  <FormHelperText error sx={{ color: 'red' }}>
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1} pt={2}>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="-password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disableRipple
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? (
                          <RemoveRedEyeIcon sx={{ color: '#572148' }} />
                        ) : (
                          <VisibilityOffIcon sx={{ color: '#572148' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Password*"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="end" alignItems="end" spacing={2} pt={2}>
                <Link variant="body2" component={RouterLink} to="/forgetpassword" color='#572148'>
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>

            <Grid item xs={12} pt={2}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="logInButton">
                Sign In
              </Button>
            </Grid>

            <Grid item xs={12} pt={2}>
              <Divider>
                <Typography variant="body2" sx={{ color: '#999999' }}>OR</Typography>
              </Divider>
            </Grid>

            <Grid item xs={12} pt={2}>
              <Link >
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="requestOTPButton">
                  Request OTP
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} pt={2}>
              <Divider>
                <Typography variant="body2" sx={{ color: '#999999' }}>OR</Typography>
              </Divider>
            </Grid>

            <Grid item xs={12} pt={2}>
              <Stack direction='row' spacing={3} justifyContent='center'>
                <img src={google} alt='google' width='16%' />
                <img src={Facebook} alt='Facebook' width='16%' />
                <img src={amazon} alt='amazon' width='16%' />
              </Stack>
            </Grid>
            <Grid item xs={12} pt={2}>
              <Stack direction='row' spacing={1} justifyContent='center'>
                <Typography variant='body1'>
                  Don't have an account?
                </Typography>
                <Typography component={RouterLink} to="/signup" color='#FB580'>
                  Sign Up
                </Typography>
              </Stack>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}

export default SignInForm;