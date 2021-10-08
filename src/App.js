import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";
import axios from "axios";

function App() {

  const {user} = useContext(Context);
  axios.defaults.baseURL = 'https://hello-me-blog.herokuapp.com/api/';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  
  return (
    <Router>
    <TopBar/>
    {/* <Home/> */}
    {/* <Single/> */}
    {/* <Write></Write> */}
    {/* <Settings/> */}
    {/* <Login/> */}
    {/* <Register/> */}
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route path='/register'>
        {!user ? <Register/> : <Home/>}
      </Route>
      <Route path='/login'>
        {!user? <Login/> : <Home/>}
      </Route>
      <Route path='/write'>
        {user? <Write/> : <Home/>}
      </Route>
      <Route path='/settings'>
        {user? <Settings/> : <Home/>}
      </Route>
      <Route path='/post/:postId'>
        <Single/>
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
