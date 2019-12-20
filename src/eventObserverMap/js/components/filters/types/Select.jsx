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
      <div>
        <h6>{key}</h6>
        { map((k) =>
          <button
            className={`btn tagbutton ${filters[key] && filters[key].includes(k) ? 'on' : ''}`}
            onClick={() => toggleTags(k)}
          >
            { k }
          </button>
        , buttons)}
      </div>
    );
  }
}
