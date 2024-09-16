import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Copyright from "@components/Copyright";
import { formValidator } from "@utils/common";
import config from "@utils/config";
import { userRegister } from "@store/features/AuthSlice";
import Heading from "../Text/Heading";

const Register = () => {
  const dispatch = useDispatch();
  const { error, isAuthorized } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [customError, setCustomError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    if (error === null) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = formValidator(
      formData,
      config.validationRules.registration
    );
    setCustomError(validationError);

    if (Object.keys(validationError).length === 0) {
      const registerResult = await dispatch(userRegister(formData));
      if (userRegister.fulfilled.match(registerResult)) {
        navigate("/");
      }
    }
  };
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}>
      <CssBaseline />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Heading title={"Sign up"} />
        </Box>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                variant='filled'
                value={formData.firstName}
                onChange={changeHandler}
                helperText={customError.firstName}
                error={!!customError.firstName}
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant='filled'
                value={formData.lastName}
                onChange={changeHandler}
                helperText={customError.lastName}
                error={!!customError.lastName}
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='filled'
                value={formData.email}
                onChange={changeHandler}
                helperText={customError.email || (error && error.email)}
                error={!!customError.email || !!(error && error.email)}
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='filled'
                value={formData.password}
                onChange={changeHandler}
                helperText={customError.password}
                error={!!customError.password}
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            color='secondary'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Register;
