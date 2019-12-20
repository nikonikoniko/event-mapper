import React, { Component } from 'react';
import {
  map,
  pipe,
  flatten,
  uniq,
  compact,
  take,
  contains,
  concat,
  without,
} from 'lodash/fp';

export default class Tags extends Component {
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
      const aaa = contains(v, current)
            ? without([v], current)
            : concat(current, [v]);
      setFilter({
        [key]: uniq(compact(aaa)),
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
