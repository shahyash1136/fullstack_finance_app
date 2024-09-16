import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Copyright from "@components/Copyright";
import { userLogin } from "@store/features/AuthSlice";
import { formValidator } from "@utils/common";
import config from "@utils/config";
import Heading from "../Text/Heading";

const Login = () => {
  const dispatch = useDispatch();
  const { error, isAuthorized } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
        email: "",
        password: "",
        rememberMe: false,
      });
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = formValidator(
      formData,
      config.validationRules.login
    );
    setCustomError(validationError);

    if (Object.keys(validationError).length === 0) {
      const loginResult = await dispatch(userLogin(formData));

      if (userLogin.fulfilled.match(loginResult)) {
        navigate("/");
      }
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "rememberMe" ? event.target.checked : value,
    }));
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
          <Heading title={"Login"} />
        </Box>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            variant='filled'
            id='email'
            label='Email Address'
            name='email'
            value={formData.email}
            autoComplete='email'
            autoFocus
            onChange={changeHandler}
            helperText={customError.email || (error && error.email)}
            error={!!customError.email || !!(error && error.email)}
          />
          <TextField
            margin='normal'
            required
            variant='filled'
            fullWidth
            value={formData.password}
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={changeHandler}
            helperText={customError.password || (error && error.password)}
            error={!!customError.password || !!(error && error.password)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value='remember'
                checked={formData.rememberMe}
                color='secondary'
                name='rememberMe'
                onChange={changeHandler}
              />
            }
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            color='secondary'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
