
import React, { Component } from 'react';
import {
  map,
} from 'lodash/fp';
import {filters, buttons} from '../../../filters';

export default class FiltersCustom extends Component {
  render() {
    const {
      filterClick
    } = this.props;

    return (
      <div>
        { map((k) =>
          <button
            className={`btn tagbutton ${this.state.filters.tags && this.state.filters.tags.includes(k) ? 'on' : ''}`}
            onClick={() => filterClick(k)}
          >
            { k }
          </button>
        , buttons)}
      </div>
    )
  }

}
