import React, { Component } from 'react';
import {map, isEmpty, concat, compact} from 'lodash/fp';
import Promise from 'bluebird';
import t from '../../../translations';
import {location, eventTitle, eventSummary} from '../containers/helpers';

import {api} from '../api';

const mapW = map.convert({cap: false});


export default class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
    };
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.props.clearUnit();
      this.props.clear();
    };
    this.props.scroll();
    if (isEmpty(this.state.units) && this.props.event && !isEmpty(this.props.event.units)) {
      Promise.each(
        this.props.event.units,
        (uid) => api.get(`units/${uid}`)
            .then(u => this.setState({units: concat(this.state.units, u)}))
            .catch(() => {
              console.log(`failed retrieving ${uid}`);
            })
      )
      .catch(console.log);
    }
  }

  componentDidUpdate() {
    // console.log(this.props.event.units);
    //
    // if (isEmpty(this.state.units) &&
    // this.props.event && !isEmpty(this.props.event.units)) {
    //   Promise.reduce(
    //     this.props.event.units,
    //     (acc, uid) => {
    //       console.log(uid);
    //       return api.get(`units/${uid}`).then(concat(acc)).catch(() => {
    //         console.log(`failed retrieving ${uid}`);
    //         return Promise.resolve(acc);
    //       });
    //     },
    //     []
    //   ).then(us => this.setState({units: compact(us)}))
    //   .catch(console.log);
    // }
  }

  render() {
    const i = this.props.event;
    return (
      <div className="columns event">


        <div className="col-7 eventcol col-sm-12">
          <button
            className="btn btn-orange back-button"
            onClick={this.props.clear}
          >
            ← {t('back to database')}
          </button>

          <h3>{i.id}</h3>

        </div>
        <div className="col-5 eventcol obscol col-sm-12">
          <br />
          <br />


        </div>
      </div>
    );
  }
}
