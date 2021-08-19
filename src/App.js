import "./App.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Home from "./components/static/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Account from "./components/auth/Account";

import { logoutUser } from "./actions/userAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
    padding: "2px",
    border: "3px",
    background: "transparent",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Bebas Neue",
  },
}));

function App(props) {
  const classes = useStyles();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      text: "You will have to log in again",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES, LOGOUT!",
    }).then((result) => {
      if (result.value === true) {
        props.dispatch(logoutUser());
        localStorage.removeItem("authToken");
        Swal.fire({
          icon: "success",
          title: "Logged Out",
        });
        window.location.href = "/";
      }
    });
  };

  return (
    <div align="sticky">
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar position="static" style={{ background: "#80ff72" }}>
            <Toolbar>
              <Typography align="left" variant="h4" className={classes.title}>
                Biller
              </Typography>

              {Object.keys(props.user).length === 0 ? (
                <>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", fontFamily: "Bebas Neue" }}
                  >
                    <Button color="default">
                      <span>Home</span>
                    </Button>
                  </Link>
                  <Link to="/users/login" style={{ textDecoration: "none" }}>
                    <Button color="default">Login</Button>
                  </Link>
                  <Link to="/users/register" style={{ textDecoration: "none" }}>
                    <Button color="default">Register</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", fontFamily: "Bebas Neue" }}
                  >
                    <Button color="default">
                      <span>Home</span>
                    </Button>
                  </Link>
                  <Link to="/account" style={{ textDecoration: "none" }}>
                    <Button color="default">Account</Button>
                  </Link>
                  <Link to="/customers" style={{ textDecoration: "none" }}>
                    <Button>Customers</Button>
                  </Link>
                  <Link
                    to="#"
                    style={{ textDecoration: "none" }}
                    onClick={handleLogout}
                  >
                    <Button color="default">Logout</Button>
                  </Link>
                </>
              )}
            </Toolbar>
          </AppBar>

          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/users/register" component={Register} />
            <Route path="/users/login" component={Login} />
            <Route path="/account" component={Account} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
