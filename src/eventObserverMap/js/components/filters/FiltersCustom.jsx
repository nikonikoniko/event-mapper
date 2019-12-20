import React, { Component } from 'react';
import {
  map,
} from 'lodash/fp';

import {
  customFilterConfigs,
} from '../../../../filters';

import Tags from './types/TagsFilter.jsx';
import Select from './types/Select.jsx';


const components = {
  tagsFilter: Tags,
  select: Select,
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
