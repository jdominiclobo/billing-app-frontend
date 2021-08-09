import React, { useState } from "react";
import { connect } from "react-redux";
// import Swal from "sweetalert2";

import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { OutlinedInput } from "@material-ui/core";

import { startRegisterUser } from "../../actions/userAction";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 275,
        border: "2px",
        display: "flex",
        flexWrap: "wrap",
      },
      margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  // const validation = () => {
  //   let isValid = true;
  //   if (
  //     !username ||
  //     !email ||
  //     !email.includes("@") ||
  //     !businessName ||
  //     !address ||
  //     !password
  //   ) {
  //     isValid = false;
  //     // Swal.fire({
  //     //   icon: "warning",
  //     //   title: "Oops...",
  //     //   text: "enter appropriate details",
  //     // });
  //   }
  //   return isValid;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validation()) {
    const formData = {
      username,
      email,
      businessName,
      address,
      password,
    };
    const redirect = () => {
      return props.history.push("/users/login");
    };
    props.dispatch(startRegisterUser(formData, redirect));
    // }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div align="center">
      <h1>Register</h1>

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="usernname"
            type="text"
            label="Username"
            required={true}
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="email"
            type="text"
            label="Email"
            required={true}
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="businessName"
            type="text"
            label="Business name"
            required={true}
            value={businessName}
            variant="outlined"
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="address"
            label="Address"
            required={true}
            rows={5}
            value={address}
            multiline
            variant="outlined"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              required={true}
              onChange={(e) => setPassword("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </div>
        <br />
        <div>
          <Button variant="contained" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
export default connect()(Register);
