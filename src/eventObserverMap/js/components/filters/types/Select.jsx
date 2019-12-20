import React, { Component } from 'react';
import {
  map,
  pipe,
  flatten,
  uniq,
  compact,
  take,
} from 'lodash/fp';

export default class Select extends Component {
  render() {
    const {
      filterConfig,
      units,
      filters,
      setFilter,
    } = this.props;
    const {
      key,
      config: {
        max: maximumNumber,
      }
    } = filterConfig;

    const buttons = pipe(
      map(key),
      flatten,
      uniq,
      compact,
      take(maximumNumber),
    )(units);

    const toggleTags = (v) => {
      const current = filters[key];
      setFilter({
        [key]: v === current ? '' : v,
      });
    };

    return (
      <div className="container filter selectfilter">
        <div className="columns">
          <div className="col-2">
            <h6>{key}</h6>
          </div>
          <div className="col-10">
            { map((k) =>
              <button
                className={`btn tagbutton ${filters[key] && filters[key].includes(k) ? 'on' : ''}`}
                onClick={() => toggleTags(k)}
              >
                { k }
              </button>
            , buttons)}
          </div>
        </div>
      </div>
    );
  }
}
