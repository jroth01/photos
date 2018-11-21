import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
          <Route path="/album/:id" component={Album} />
        </Switch>
      </div>
    );
  }
}

export default AlbumSwitch;