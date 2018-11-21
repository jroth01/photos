import React, {Component} from 'react'
import { Switch, Route } from "react-router-dom";
import NotFound from '../NotFound';
import Album from '../Album';
import Home from '../Home';
import Photo from '../Photo';

class AlbumSwitch extends Component {
  previousLocation = this.props.location;
  componentWillUpdate(nextProps) {
    let { location } = this.props;
    if (
      nextProps.history.action !== "POP" && !location.state
    ) {
      this.previousLocation = this.props.location;
    }
  }
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