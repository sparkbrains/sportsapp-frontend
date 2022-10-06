import "./App.css";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import SuperAdimin from "./component/Page/Super_Adimin/SuperAdimin";
import User from "./component/Page/User/User";
import Coaches from "./component/Page/Coaches/Coaches";
import Sportscenterowner from "./component/Page/Sportscenterowner/Sportscenterowner";
import Login from "./component/Page/Login/Login";
import SignUp from "./component/Page/SignUp/SignUp";
import Forgetpassword from "./component/Page/ForgetPassword/Forgetpassword";
import Changepassword from "./component/Page/ForgetPassword/Changepassword";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/forgetpassword" component={Forgetpassword} />
          <Route exact path="/changepassword/:id" component={Changepassword} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/superadmin" component={SuperAdimin} />
          <Route path="/user" component={User} />
          <Route path="/coaches" component={Coaches} />
          <Route path="/sportscenterowner" component={Sportscenterowner} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
