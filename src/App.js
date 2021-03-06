import Header from "./components/Header";
import Footer from "./components/Footer";
import Box from "./components/Box";
import Info from "./components/Info";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LanguagesState from "./context/languages/LanguagesState";
import SortState from "./context/sort/SortState";
import UserState from "./context/user/UserState";

function App() {
  return (
    <UserState>
      <SortState>
      <LanguagesState>
        <div className="App">
          <Router basename={process.env.PUBLIC_URL}>
            <Header></Header>
            <Switch>
              <Route path="/" exact component={Box}></Route>
              <Route path="/movie_info/:movie" component={Info}></Route>
              <Route path="/register" component={Register} />
              <Route path="/signin" component={Login} />
            </Switch>
            <Footer></Footer>
          </Router>
        </div>
      </LanguagesState>
    </SortState>
    </UserState>
  );
}

export default App;
