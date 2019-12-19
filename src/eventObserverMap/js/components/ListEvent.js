import React, { Component } from 'react';
import {size, map} from 'lodash/fp';
// import {location, eventTitle} from '../containers/helpers';

function zeroPad(num, places) { // eslint-disable-line
  var zero = places - num.toString().length + 1; // eslint-disable-line
  return Array(+(zero > 0 && zero)).join("0") + num; // eslint-disable-line
}

export default class ListEvidence extends Component {
  render() {
    const i = this.props.event;
    return (
      <div // eslint-disable-line
        className={'listevent item'}
        onClick={
          this.props.selector
        }
      >
        <div className="columns">
          <div className="col-3 col-sm-12">
            <img
              src="https://imgplaceholder.com/420x320"
              width="100%"
              height="auto"
              alt=""
            />
          </div>
          <div className="col-9 col-sm-12 infocol">
            <div className="col-12 col-sm-12">
              <h5>{i.id}</h5>
            </div>
            <div className="col-12 col-sm-12" >
              <small>
                {i.Country} - {i.City}
              </small>
            </div>
            <div className="col-12 col-sm-12">
              {map(t =>
                <div>#{t}</div>
              , i.tags)}

            </div>
            <div className="col-2 col-sm-12 countu">
              {size(i.units) > 0 ?
                <small>{size(i.units)} <i className="fa fa-video-camera" /></small>
              : ''}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
