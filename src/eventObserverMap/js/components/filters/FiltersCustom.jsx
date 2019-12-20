import React, { Component } from 'react';
import {
  map,
} from 'lodash/fp';

import translator from '../../../../translations';
import {
  customFilterConfigs,
} from '../../../../filters';

import Slider from '../Range.jsx';

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
      updateRange,
      onSearchChange,
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
      <span>
        <div className="collectionsearch">
          <input
            placeholder={translator('Type to Search...')}
            id="searchbox"
            type="text"
            onChange={onSearchChange}
          />
        </div>
        <div className="filters">
          <Slider updateRange={updateRange} />
          {map(createComponentByType, customFilterConfigs)}
        </div>
      </span>
    );
  }

}
