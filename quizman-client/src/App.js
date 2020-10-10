import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import logo from `./logo.svg`;
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import './App.css';

import QuizState from './context/Quiz/QuizState'
// import QuizItem from './components/quizzes/QuizItem';





const App = () => {

  // const [user, setUser] = useState({});

  return (
    <QuizState>
      <Router>
        <Fragment >
          <Navbar />


          <div className="App-header">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              {/* <Route exact path='/quiz/:id' component={QuizItem} /> */}

            </Switch>


          </div>

        </Fragment>
      </Router>

    </QuizState>


  );
}

export default App;
