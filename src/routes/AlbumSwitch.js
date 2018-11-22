import React, {Component} from 'react'
import { Switch, Route } from "react-router-dom";
import NotFound from '../containers/NotFound';
import Album from '../containers/Album';
import Home from '../containers/Home';
import Photo from '../containers/Photo';

class AlbumSwitch extends Component {
  render() {
    let { location } = this.props;
    return (
      <div>
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route exact path="/album/:id" component={Album} />
          <Route exact path="/album/:id/photo/:id" component={Photo} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default AlbumSwitch;