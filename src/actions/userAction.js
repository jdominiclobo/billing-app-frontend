import axios from "../config/axios";
import Swal from "sweetalert2";

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const startLoginUser = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/users/login", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.hasOwnProperty("errors")) {
          Swal.fire({
            icon: "warning",
            title: "Oops... Wrong Credentials. Please try again?",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Logged in successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
          //   console.log(response.data);
          localStorage.setItem("authToken", response.data.token);
          axios
            .get("users/account", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            })
            .then((response) => {
              const user = response.data;
              dispatch(setUser(user));
            })
            .catch((error) => {
              console.log(error);
            });
          redirect();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startGetUser = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const user = response.data;
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startRegisterUser = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/users/register", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.hasOwnProperty("errors")) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Sucessfully Registered, Now You can Log in",
            showConfirmButton: false,
            timer: 2000,
          });
          redirect();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const logoutUser = (user) => {
  return { type: "LOGOUT_USER", payload: user };
};

// export const startUserLogout = () => {
//   return (dispatch) => {
//     axios
//       .delete("/users/logout", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       })
//       .then((response) => {
//         if (response.data) {
//           console.log(response.data);
//           localStorage.removeItem("authToken");
//           dispatch(setUser({}));
//           window.location.href = "/";
//         }
//       })
//       .catch((error) => console.log(error));
//   };
// };
