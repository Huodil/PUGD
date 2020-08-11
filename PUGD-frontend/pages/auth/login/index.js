import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks'
import { LOGIN_QUERY } from 'graphql/queries/user.query';
import Router from 'next/router'
import Head from 'next/head';
import TextBox from '@/components/ui/TextBox';
import Button from '@/components/ui/Button';
import {LOGIN_MUTATION} from "../../../graphql/mutations/user.mutation";
function SignIn() {

  const [login, { error, data }] = useLazyQuery(LOGIN_QUERY);
  //const [login, { error, data }] = useLazyQuery(LOGIN_MUTATION);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const onSubmitHandler = (e) => {

    console.log("login....")
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
    Router.push('/admin')
  }

  return (

    <React.Fragment>
      <Head>
        <link rel="stylesheet" type="text/css" href="/app-assets/css/pages/login.css"/>
      </Head>
      <div style={{ height: "100vh" }} className="login-bg">
        <div className="col s12 ">
          <div className="container">
            <div id="login-page" className="row">
              <div className="col s12 m6 l4 z-depth-4 card-panel border-radius-6 login-card bg-opacity-8">
                <form className="login-form" >
                  <div className="row">
                    <div className="input-field col s12">
                      <h5 className="ml-4">Sign in</h5>
                    </div>
                  </div>
                  <div className="row margin">
                    <TextBox icon="person_outline" label="Username"
                      name="sdfds"
                      onClick={
                        (event) => {
                          event.target.valid = false
                          console.log(event.target);

                        }
                      }
                      onChange={event => { setUsername(event.target.value) }}
                      value={username}
                      required />
                  </div>
                  <div className="row margin">

                    <TextBox icon="lock_outline" type="password" label="Password"
                      onChange={event => { setPassword(event.target.value) }}
                      value={password} />

                  </div>
                  <div className="row">
                    <div className="col s12 m12 l12 ml-2 mt-1">
                      <p>
                        <label>
                          <input type="checkbox" />
                          <span>Remember Me</span>
                        </label>
                      </p>
                    </div>
                  </div>
                  {error ?
                    <div className="card-alert card gradient-45deg-red-pink">
                      <div className="card-content white-text">
                        <p>
                          <i className="material-icons">error</i> {String(error.message)}</p>
                      </div>
                    </div> : null}
                  <div className="row" style={{ margin: "20px 0" }}>
                    <Button rounded fullwidth onClick={onSubmitHandler} >Login</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="content-overlay"/>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SignIn;