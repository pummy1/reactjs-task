import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PostList from './postlist/postlist';
import PostView from './postview/postview';
import UserDetail from './userdetail/userdetail';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <Switch>
              <Route exact path='/' component={PostList} />
              <Route path='/view/:id' component={PostView} />
              <Route path='/user/:id' component={UserDetail} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
