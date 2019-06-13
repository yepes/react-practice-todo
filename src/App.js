import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TodoContainer from './TodoContainer';
import ProjectContainer from './ProjectContainer';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/projects/">Projects</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={TodoContainer} />
                    <Route path="/projects/" component={ProjectContainer} />
                </div>
            </Router>
        )
    }
}

export default App;