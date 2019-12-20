import React, { Component } from 'react';
import {size, map, compact} from 'lodash/fp';
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
      src="https://i.pickadummy.com/600x400?contrast=-2"
              width="100%"
              height="auto"
              alt=""
            />
          </div>
          <div className="col-9 col-sm-12 infocol">
        <span>{i.id}</span>
            <div className="col-12 col-sm-12">
              <h5>{i.name}</h5>
            </div>
            <div className="col-12 col-sm-12" >
              <small>
                {i.Country} - {i.City}
              </small>
            </div>
            <div className="col-12 col-sm-12">
              {map(t =>
                <span>#{t} </span>
                   , compact(i.tags))}

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
