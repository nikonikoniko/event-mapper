import React, { Component } from 'react';
import {
  map,
  intersectionBy,
  size,
  uniqBy,
  concat,
  difference,
  contains,
  isEmpty,
  filter,
  xorBy,
  sortBy,
  reverse,
  first,
} from 'lodash/fp';
import moment from 'moment';

import {params} from '../store/params';
import {timeMeOut} from '../containers/helpers';

import {buttons, applyFilters} from '../../../filters';


// import Filters from './Filters';
import ListEvent from './ListEvent';
import Event from './Event';

import CollectionMapComponent from './CollectionMapComponent';
// import Slider from './CollectionRangeComponent';

import FiltersCustom from './FiltersCustom';

import translator from '../../../translations';

const mapW = map.convert({cap: false});

export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.typing = this.typing.bind(this);
    this.search = this.search.bind(this);
    this.visible = this.visible.bind(this);
    this.hover = this.hover.bind(this);
    this.setSort = this.setSort.bind(this);
    this.range = this.range.bind(this);

    this.updateFrontentView = this.updateFrontentView.bind(this);

    this.state = {
      searchterm: params.filters.term || this.props.filters.term,
      typing: false,
      filters: {},
      hoverUnit: false,
      range: [moment('2013-01-01').valueOf(), moment().valueOf()],
      visibleMarkers: [],
      sort: params.filters.term || this.props.filters.term ? 'relevance' : 'observationcount'
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
    this.props.update(params.filters);
  }

  setSort(field) {
    this.setState({sort: field});
  }
  //
  // toggleFilter(k, v) {
  //   const aaa = contains(field, this.state.filters)
  //     ? difference([field], this.state.filters)
  //     : concat(this.state.filters, [field]);
  //   this.setState({
  //     filters: aaa
  //   });
  // }


  toggleTags(v) {
    console.log('aaa');
    console.log(this.state.filters);
    const aaa = contains(v, this.state.filters.tags)
      ? difference([v], this.state.filters.tags)
      : concat(this.state.filters.tags, [v]);
    console.log('bbb');
    this.setState({
      filters: {
        tags: aaa,
      }
    });
  }


  search(e) {
    // this.setState({typing: true, sort: 'relevance'});
    const term = e.target.value;
    this.setState({filters: {term}});
    // timeMeOut(() => {
    //   this.props.update({term});
    //   this.setState({typing: false});
    // });
  }

  typing(b) {
    this.setState({typing: b});
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
    const updating = this.props.updating || this.state.typing;
    const visible = this.state.visibleMarkers;

    const events = applyFilters(this.state.filters)(this.props.events);

    console.log(events);

    const locationEvents = filter(i => i.latitude && i.longitude, events);
    const nolocationEvents = filter(i => !i.latitude && !i.longitude, events);

    const visiblebymap = size(visible) > 0
          ? intersectionBy('id', events, visible)
          : locationEvents;

    let visibleEvents = visiblebymap;

    if (first(events) && 'date' in first(events)) {
      visibleEvents = filter((d) =>
                                    (moment(d.date) >= moment(this.state.range[0])
                                     && moment(d.date) <= moment(this.state.range[1])), visiblebymap); // eslint-disable-line
    }

    const invisibleEvents = size(visible) > 0
          ? uniqBy('id', concat(xorBy('id', events, visible), nolocationEvents))
          : nolocationEvents;

    const makeEvents = (is) => mapW((i, k) =>
                                      <div // eslint-disable-line
                                        onMouseEnter={() => this.hover(i)}
                                        onMouseLeave={() => this.hover(false)}
                                      >
                                        <ListEvent
                                          event={i}
                                          selector={() => this.props.selectEvent(i)}
                                          num={k}
                                        />
                                      </div>
                                      , is);

    const sort = (l) => {
      const by = this.state.sort;
      if (isEmpty(by)) { return l; }
      if (by === 'relevance') {
        return reverse(l);
      }
      if (by === 'observationcount') {
        return sortBy(i => size(i.units), l);
      }
      if (by === 'date') {
        return sortBy('date', l);
      }
      if (by === 'confidence') {
        return sortBy('confidence', l);
      }
    };

    const vlist = makeEvents(reverse(sort(visibleEvents)));
    const ilist = makeEvents(reverse(sort(invisibleEvents)));

    const leafletMap = (
      <CollectionMapComponent
        events={locationEvents}
        visible={this.visible}
        visibleEvents={visibleEvents}
        hoverUnit={this.state.hoverUnit}
        updateFrontentView={this.updateFrontentView}
        selector={this.props.selectEvent}
        updateRange={this.range}
      />);

    const singleMap = (
      <CollectionMapComponent
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

    const slider = '';
    // <Slider
    //   updateRange={this.range}
    // />

    return (
      <div className="container collection">
        <div className="columns">
          <div
            className="col-6 col-sm-12 scrolltome"
            id="eventlist"
          >
            <div className="collectionsearch">
              <input placeholder={translator('Type to Search...')} value={this.state.searchterm} type="text" onChange={this.search} />
            </div>

            {slider}

            <div className="resultsMeta">
              <span>
                <i className="fa fa-map-marker" />
                <a href="#onmap">
                  {` ${size(vlist)} ${translator('results on map')}`}
                </a>
                <a href="#offmap">
                  {size(ilist) > 0 ? ` / ${size(ilist)} ${translator('off map')} ` : ' '}
                </a>
              </span>

              <div>
                { map((k) =>
                  <button
                    className={`btn tagbutton ${this.state.filters.tags && this.state.filters.tags.includes(k) ? 'on' : ''}`}
                    onClick={() => this.toggleTags(k)}
                  >
                    { k }
                  </button>
                , buttons)}
      </div>

        <FiltersCustom
          setFilter={console.log}
          units={events}
          filters={this.state.filters}
        />

            </div>


            <div id="onnmap" className="visibleevents" style={updating ? {opacity: '.3'} : {}}>
              {vlist}
            </div>
            <div style={{textAlign: 'center', color: '#aaa', padding: '3rem'}} >
              <div>▲</div>
              <div>{translator('On Map')}</div>
              <div>{translator('Off Map')}</div>
              <div>▼</div>
            </div>
            <div id="offmap" className="invisibleevents" style={updating ? {opacity: '.3'} : {}}>
              {ilist}
            </div>
          </div>
          <div className="col-6 col-sm-12" style={updating ? {opacity: '.3'} : {}}>
            {leafletMap}
          </div>
        </div>

      </div>
    );
  }
}
