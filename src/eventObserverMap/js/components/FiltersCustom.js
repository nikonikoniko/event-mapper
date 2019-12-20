import React, { Component } from 'react';
import {
  map,
} from 'lodash/fp';

import {
  customFilterConfigs,
} from '../../../filters';


class Tags extends Component {
  render() {
    const {
      filterConfig
    } = this.props;
    const {
      key,
      config: {
        max: maximumNumber,
      }
    } = filterConfig;

    return (
        <div>im a tag {key} {maximumNumber}}</div>
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
        hello
      {map(createComponentByType, customFilterConfigs)}
      goodbye
      </div>
    );
  }

}
