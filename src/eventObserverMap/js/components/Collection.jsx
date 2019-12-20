import React, { Component } from 'react';
import {
  map,
  size,
  concat,
  isEmpty,
  pipe,
} from 'lodash/fp';
import moment from 'moment';

import {params} from '../store/params';
import {timeMeOut} from '../containers/helpers';

import {applyFilters} from '../../../filters';


import ListEvent from './ListEvent.jsx';
import Event from './Event.jsx';
import Map from './Map.jsx';
import FiltersCustom from './filters/FiltersCustom.jsx';

import translator from '../../../translations';

import {
  haveLocation,
  noHaveLocation,
  intersectionById,
  dateIncludedP,
  filterByRange,
  uniqById,
  xorById,
} from '../types/event';

const mapW = map.convert({cap: false});

export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.visible = this.visible.bind(this);
    this.hover = this.hover.bind(this);
    this.range = this.range.bind(this);
    this.setFilter = this.setFilter.bind(this);

    this.updateFrontentView = this.updateFrontentView.bind(this);

    this.state = {
      typing: false,
      filters: {},
      hoverUnit: false,
      range: [moment('2013-01-01').valueOf(), moment().valueOf()],
      visibleMarkers: [],
    };
  }

  componentDidMount() {
    // stuff in url gets priority over stuff from localstorage
    const h = params.event;
    if (h) {
      this.props.getEvent(h);
    } else {
      this.props.clearEvent();
    }
    this.props.updateEvents();
    this.props.update(params.filters);
    document.getElementById('searchbox').value = params.filters.term || null;
  }

  setFilter(f) {
    this.props.update(f);
  }

  search(e) {
    this.setState({typing: true});
    const term = e.target.value;
    timeMeOut(() => {
      this.setFilter({term});
      this.setState({typing: false});
    });
  }

  visible(codes) {
    this.setState({visibleMarkers: codes});
  }

  range(range) {
    this.setState({range});
  }

  hover(unit) {
    timeMeOut(() => {
      this.setState({hoverUnit: unit});
    }, 30);
  }

  updateFrontentView() { // eslint-disable-line
    const ii = document.getElementsByClassName('scrolltome')[0];
    const t = document.getElementsByClassName('top')[0];
    const s = document.getElementsByClassName('subheader')[0];
    const p = ii ? ii.offsetTop : 0;
    const v = t ? t.offsetHeight : 0;
    const y = s ? s.offsetHeight : 0; // offsetheight
    // window.scrollTo(0, p - v - y); // eslint-disable-line
    window.scrollTo({
      top: p - v - y,
      left: 0,
      behavior: 'smooth'
    });
  }

  render() {
    const {
      props: {
        filters,
        events: allEvents,
        updating: isUpdating,
      },
      state: {
        typing,
        visibleMarkers: visible,
        range: [startDate, endDate],
      }
    } = this;

    const updating = isUpdating || typing;

    const events = applyFilters(filters)(allEvents);

    const eventsWithLocation = haveLocation(events);
    const eventsWithoutLocation = noHaveLocation(events);

    const visiblebymap = size(visible) > 0 ?
          intersectionById(events, visible)
          : eventsWithLocation;

    const visibleEvents = dateIncludedP(events) ?
        filterByRange([startDate, endDate], visiblebymap)
        : visiblebymap;

    const invisibleEvents = size(visible) > 0 ?
          pipe(
            () => xorById(events, visible),
            concat(eventsWithoutLocation),
            uniqById
          )(null) // uniqById(concat(xorById(events, visible), eventsWithoutLocation))
          : eventsWithoutLocation;

    const listEvent = (e, key) => (
      <div
        onMouseEnter={() => this.hover(e)}
        onMouseLeave={() => this.hover(false)}
      >
        <ListEvent
          event={e}
          selector={() => this.props.selectEvent(e)}
          num={key}
        />
      </div>
    );

    const listEvents = mapW(listEvent);

    const eventsOnMap = listEvents(visibleEvents);
    const eventsOffMap = listEvents(invisibleEvents);

    const fullMap = (
      <Map
        events={eventsWithLocation}
        visible={this.visible}
        visibleEvents={visibleEvents}
        hoverUnit={this.state.hoverUnit}
        updateFrontentView={this.updateFrontentView}
        selector={this.props.selectEvent}
        updateRange={this.range}
      />);

    const singleMap = (
      <Map
        events={[this.props.selectedEvent]}
        visibleEvents={[this.props.selectedEvent]}
        visible={() => {}}
        updateFrontentView={() => {}}
        updateRange={() => {}}
      />);


    if (!isEmpty(this.props.selectedEvent)) {
      return (
        <div className="container collection">
          <div className="columns">
            <div className="col-8 col-sm-12 scrolltome">
              <Event
                event={this.props.selectedEvent}
                clear={this.props.clearEvent}
                getUnit={this.props.getUnit}
                unit={this.props.selectedUnit}
                clearUnit={this.props.clearUnit}
                scroll={this.updateFrontentView}
              />
            </div>
            <div className="col-4 col-sm-12">
              {singleMap}
            </div>
          </div>

        </div>
      );
    }

    return (
      <div className="container collection">
        <div className="columns">
          <div
            className="col-6 col-sm-12 scrolltome"
            id="eventlist"
          >
            <FiltersCustom
              updateRange={this.range}
              onSearchChange={this.search}
              setFilter={this.setFilter}
              units={this.props.events}
              filters={this.props.filters}
            />


            <div className="resultsMeta">
              <span>
                <i className="fa fa-map-marker" />
                <a href="#onmap">
                  {` ${size(eventsOnMap)} ${translator('results on map')}`}
                </a>
                <a href="#offmap">
                  {size(eventsOffMap) > 0 ? ` / ${size(eventsOffMap)} ${translator('off map')} ` : ' '}
                </a>
              </span>
            </div>


            <div id="onnmap" className="visibleevents" style={updating ? {opacity: '.3'} : {}}>
              {eventsOnMap}
            </div>
            <div style={{textAlign: 'center', color: '#aaa', padding: '3rem'}} >
              <div>▲</div>
              <div>{translator('On Map')}</div>
              <div>{translator('Off Map')}</div>
              <div>▼</div>
            </div>

            <div id="offmap" className="invisibleevents" style={updating ? {opacity: '.3'} : {}}>
              {eventsOffMap}
            </div>
          </div>
          <div className="col-6 col-sm-12" style={updating ? {opacity: '.3'} : {}}>
            {fullMap}
          </div>
        </div>

      </div>
    );
  }
}
