import React, { Component } from 'react';
import {
  map,
  pipe,
  flatten,
  uniq,
  compact,
  take,
  contains,
  difference,
  concat,
} from 'lodash/fp';

import {
  customFilterConfigs,
} from '../../../filters';


class Tags extends Component {
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
      const aaa = contains(v, filters[key])
            ? difference([v], filters[key])
            : concat(filters[key], [v]);
      setFilter({
        tags: aaa,
      });
    };


    return (
      <div>
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

const components = {
  tagsFilter: Tags,
};


export default class FiltersCustom extends Component { // eslint-disable-line
  render() {
    const {
      setFilter,
      units,
      filters,
    } = this.props;

    const createComponentByType = f => {
      // TODO make sure the components actually exist
      const C = components[f.type];
      return (
        <C
          filterConfig={f}
          setFilter={setFilter}
          filters={filters}
          units={units}
        />
      );
    };

    return (
      <div>
      {map(createComponentByType, customFilterConfigs)}
      </div>
    );
  }

}
