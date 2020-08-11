import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link'; 
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useLazyQuery } from '@apollo/react-hooks'
import { LOGIN_QUERY } from '@/graphql/queries/user.query';
import Router from 'next/router'  

function SignInComponent() {

  const [login, { error, data }] = useLazyQuery(LOGIN_QUERY);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const onSubmitHandler = (e)=>{
    e.preventDefault();
    login({
      variables: {
        username: username,
        password: password
      }
    });
  }


  if (data && data.login) {
    localStorage.setItem('token', data.login.token);
    Router.push('/')
  }

  return (
    <div className="login-container float-right" >
      <div className="float-right login-form">
        <div className="row h-100">
          <div className="col-sm-12 my-auto">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className="paper">

                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className="form" noValidate
                  onSubmit={ onSubmitHandler}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    onChange={event => { setUsername(event.target.value) }}
                    value={username}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign In
                  </Button>
                  {error ? <div color="danger">{String(error)}</div> : null}
                </form>
              </div>

            </Container>
          </div>
        </div>
      </div>
      <style jsx >
        {`
     
        .login-form{
            width:400px;
            background:white;
            padding:50px 0;
            height:100%;
        }
        .login-container{
          height:100vh;
          background-image: url(/images/flat-bg.jpg);
          background-repeat: no-repeat;
          background-size: cover;
       } 
       .paper {
        display: flex;
        // margin-top: 64px;
        align-items: center;
        flex-direction: column;
      },
      .form {
        width: 100%;
        // margin-top: 8px;
      },
        `}
      </style>
    </div>
  );
}
export default SignInComponent;