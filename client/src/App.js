import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "./components/NavBar";
import Footer from "./components/Footer";
import NewPaste from "./components/NewPaste";
import LatestPastes from "./components/LatestPastes";
import ShowPaste from "./components/ShowPaste";

function App() {
  return (
    <Router>
      <div className="App deep-purple lighten-5">
        <Header></Header>
        <main className="container">
          <Switch>
            <Route path="/" exact component={NewPaste}></Route>
            <Route path="/latest" component={LatestPastes}></Route>
            <Route path="/paste/:idx" component={ShowPaste}></Route>
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
