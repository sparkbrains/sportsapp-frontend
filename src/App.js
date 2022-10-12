import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperAdimin from "./component/Page/Super_Adimin/SuperAdimin";
import Login from "./component/Page/Login/Login";
import SignUp from "./component/Page/SignUp/SignUp";
import Forgetpassword from "./component/Page/ForgetPassword/Forgetpassword";
import Changepassword from "./component/Page/ForgetPassword/Changepassword";
import { PrivateRoutes, GuestRoutes } from "./component/useAuth/PrivateRoute";
import Sportscenterowner from "./component/Page/Super_Adimin/Sportscenterowner/Sportscenterowner";
import Coachmanagement from "./component/Page/Super_Adimin/Coachman/Coachmanagement";
import Usermanagement from "./component/Page/Super_Adimin/Userman/Usermanagement";
import Categorymanagement from "./component/Page/Super_Adimin/Categoryman/Categorymanagement";
import Setting from "./component/Page/Super_Adimin/Setting/Setting";
import Addcategory from "./component/Page/Super_Adimin/Categoryman/Addcategory";
import AddCoach from "./component/Page/Super_Adimin/Coachman/Addcoach";
import Addnew from "./component/Page/Super_Adimin/Sportscenterowner/Addnew";
import AddUser from "./component/Page/Super_Adimin/Userman/Adduser";
import Editcoach from "./component/Page/Super_Adimin/Coachman/Editcoach";
import Editcategory from "./component/Page/Super_Adimin/Categoryman/Editcategories";
import EditUser from "./component/Page/Super_Adimin/Userman/Edituser";
import Editnew from "./component/Page/Super_Adimin/Sportscenterowner/Editnew";
import AppLayout from "./layout/appLayout";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<GuestRoutes />}>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/forgetpassword" element={<Forgetpassword />} />
            <Route
              exact
              path="/changepassword/:id"
              element={<Changepassword />}
            />
            <Route exact path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path={`/sportscenterowner`} element={<Sportscenterowner />} />
            <Route path={`/coachmanagement`} element={<Coachmanagement />} />
            <Route path={`/usermanagement`} element={<Usermanagement />} />
            <Route path={`/categorymanagement`} element={<Categorymanagement />} />
            <Route path={`/settings`} element={<Setting />} />
            <Route path={`/addcategory`} element={<Addcategory />} />
            <Route path={`/addcoach`} element={<AddCoach />} />
            <Route path={`/addnew`} element={<Addnew />} />
            <Route path={`/adduser`} element={<AddUser />} />
            <Route path={`/editcoach/:id`} element={<Editcoach />} />
            <Route path={`/editcategory/:id`} element={<Editcategory />} />
            <Route path={`/edituser/:id`} element={<EditUser />} />
            <Route path={`/editnew/:id`} element={<Editnew />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
