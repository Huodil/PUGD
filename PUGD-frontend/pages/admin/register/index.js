import React, { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import { REGISTER_MUTATION } from "@/graphql/mutations/user.mutation";
import TextBox from "@/components/ui/TextBox";
import Button from "@/components/ui/Button";

export function signup() {
  const [register] = useMutation(REGISTER_MUTATION);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const onSubmitHandler = (e) => {
    console.log("dfdsfdsf");

    e.preventDefault();
    if (password === password2) {
      register({
        variables: {
          username: username,
          password: password,
        },
      })
        .then(() => {
          alert("User created succefully");
          Router.push("/auth/login");
        })
        .catch((ss) => alert(ss));
    } else {
      alert(" PAsswords don't match ");
    }
  };
  return (
    <div className="register-container">
      <div className="card animate">
        <div className="card-content ">
          <form onSubmit={onSubmitHandler}>
            <TextBox
              type="text"
              label="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
            <TextBox
              type="password"
              label="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <TextBox
              type="password"
              label="password"
              onChange={(event) => setPassword2(event.target.value)}
              value={password2}
            />
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
        </div>
      </div>

      <style jsx>
        {`
          .register-container {
            height: 100vh;
          }
          .uk-icon {
            margin-left: 10px;
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
}

signup.Layout = AdminLayout;
export default signup;
