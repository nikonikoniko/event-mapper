import React, { Component } from 'react';
import moment from 'moment';

import {map} from 'lodash/fp';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import t from '../../../translations';
import {timeMeOut, location} from '../containers/helpers';
import {params} from '../store/params';


export default class DatabaseComponent extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.typechange = this.typechange.bind(this);
    this.collectionchange = this.collectionchange.bind(this);

    this.afterchange = this.afterchange.bind(this);
    this.beforechange = this.beforechange.bind(this);

    this.state = {
      searchterm: params.filters.term || this.props.filters.term,
      typing: false,
    };
  }

  search(e) {
    this.props.typing(true);
    const term = e.target.value;
    this.setState({searchterm: term});
    timeMeOut(() => {
      this.props.update({term});
      this.props.typing(false);
    });
  }

  afterchange(e) {
    const date = e;
    timeMeOut(() => {
      const d = date ? moment(date).format('YYYY-MM-DD') : null;
      this.props.update({after: d});
    });
  }

  beforechange(e) {
    const date = e;
    timeMeOut(() => {
      const d = date ? moment(date).format('YYYY-MM-DD') : null;
      this.props.update({before: d});
    });
  }

  render() {
    const {
      filters,
      reset,
      meta,
    } = this.props;

    return (
      <div>
        <div className="filter">
          <h5>{ t('Search')}</h5>
          <input value={this.state.searchterm} type="text" onChange={this.search} />
          <h5><small>{ t('Limited to 100 results')}</small></h5>
        </div>

        <div className="filter">
          <h5>{t('After Date')}</h5>
          <DatePicker
            selected={filters.after ? moment(filters.after) : undefined}
            onChange={this.afterchange}
            dateFormat="YYYY-MM-DD"
          />
        </div>

        <div className="filter">
          <h5>{t('Before Date')}</h5>
          <DatePicker
            selected={filters.before ? moment(filters.before) : undefined}
            onChange={this.beforechange}
            dateFormat="YYYY-MM-DD"
          />
        </div>

        <div className="filter">
          <button className="btn" onClick={reset}>
            {t('Reset')}
          </button>
        </div>
      </div>
    );
  }
}
