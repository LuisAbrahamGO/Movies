import Header from "./components/Header";
import Footer from "./components/Footer";
import Box from "./components/Box";
import Info from "./components/Info";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LanguagesState from "./context/languages/LanguagesState";

function App() {
  return (
    <LanguagesState>
      <div className="App">
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/" exact component={Box}></Route>
            <Route path="/movie_info/:movie" exact component={Info}></Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </div>
    </LanguagesState>
  );
}

export default App;
