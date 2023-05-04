// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useUserContext } from "../contexts/UserContext";

// const PrivateRoute = (props) => {
//   const { user } = useUserContext();
//   if (user) {
//     return <Route {...props} />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default PrivateRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
