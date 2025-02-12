import React, { Component } from 'react';
import moment from 'moment';
import noUiSlider from 'nouislider';

import {timeMeOut} from '../containers/helpers';

import t from '../../../translations';

// Add a range slider
let slider = document.getElementById('slider');

export default class CollectionRangeComponent extends Component {
  constructor(props) {
    super(props);
    this.updateRange = this.updateRange.bind(this);

    this.state = {
      units: this.props.units,
      selectedStartDate: moment('2013-01-01').valueOf(),
      selectedEndDate: moment().valueOf(),
    };
  }

  componentDidMount() {
    // Add a range slider
    slider = document.getElementById('slider');

    noUiSlider.create(slider, {
      range: {
        min: this.state.selectedStartDate,
        max: this.state.selectedEndDate
      },
      tooltips: true,
      connect: true,
      step: 24 * 60 * 60 * 1000,
      start: [this.state.selectedStartDate, this.state.selectedEndDate],
    });


    const dateValues = [
      document.getElementsByClassName('noUi-tooltip')[0],
      document.getElementsByClassName('noUi-tooltip')[1]
    ];


    slider.noUiSlider.on('update', (values) => {
      dateValues[0].innerHTML = `From: ${moment(+values[0]).format('YYYY-MM-DD')}`;
      dateValues[1].innerHTML = `To: ${moment(+values[1]).format('YYYY-MM-DD')}`;

      const s = moment(+values[0]).format('YYYY-MM-DD');
      const e = moment(+values[1]).format('YYYY-MM-DD');
      timeMeOut(() => {
        this.updateRange([s, e]);
      }, 30);
    });
  }


  // call this function with this.updaterange when the sliders have been determined
  updateRange(range) {
    this.setState({
      selectedStartDate: range[0],
      selectedEndDate: range[1]
    });
    this.props.updateRange(range);
  }


  render() {
    return (
      <div className="sliderarea container filter">
        <div className="columns">
          <div className="col-2">
            <h6>

              {t('from')}:<br />
              <i className="fa fa-clock-o" /><b>{moment(this.state.selectedStartDate).format('D-M-Y')}</b><br />
              {t('to')}:<br />
              <i className="fa fa-clock-o" /><b>{moment(this.state.selectedEndDate).format('D-M-Y')}</b>
            </h6>
          </div>
          <div className="col-10">
            <div className="slider" id="slider" />
          </div>
        </div>
      </div>
    );
  }
}
