import "./App.css";
// import { RequireAuth } from "./component/useAuth/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperAdimin from "./component/Page/Super_Adimin/SuperAdimin";
// import User from "./component/Page/User/User";
// import Coaches from "./component/Page/Coaches/Coaches";
// import Sportscenterowner from "./component/Page/Super_Adimin/Sportscenterowner/Sportscenterowner";
// import Sportscenterowner from "./component/Page/Sportscenterowner/Sportscenterowner";
import Login from "./component/Page/Login/Login";
import SignUp from "./component/Page/SignUp/SignUp";
import Forgetpassword from "./component/Page/ForgetPassword/Forgetpassword";
import Changepassword from "./component/Page/ForgetPassword/Changepassword";
// import {AuthProvider} from ""
import PrivateRoutes from "./component/useAuth/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/forgetpassword" element={<Forgetpassword />} />
          <Route
            exact
            path="/changepassword/:id"
            element={<Changepassword />}
          />
          <Route exact path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/superadmin" element={<SuperAdimin />} />
            {/* <Route path="/user" element={<User />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/sportscenterowner" element={<Sportscenterowner/>} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
