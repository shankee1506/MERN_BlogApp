import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from 'axios';

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
    
    
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
        sendLoginrequest();
    }


    const sendLoginrequest = async() => {
        const response = await axios.post('http://localhost:8000/api/user/login', ({
            email: inputs.email,
            password: inputs.password
        })).catch((err) => {
            console.log(err)
        });

        const data = await response.data;
        return data;
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {" "}
            {isSignup ? "LogIn" : "SignUp"}
          </Typography>

          {!isSignup && (
            <TextField
              name="name"
              type={"name"}
              placeholder="Name"
              margin="normal"
              onChange={handleChange}
            />
          )}
          <TextField
            name="email"
            type={"email"}
            placeholder="Email"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="password"
            type={"password"}
            placeholder="Password"
            margin="normal"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup ? "SignUp" : "LogIn"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
