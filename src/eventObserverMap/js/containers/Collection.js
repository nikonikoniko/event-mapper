import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import CollectionComponent from '../components/CollectionComponent';

import {
  updateFilters,
  updateEvents,
  resetFilters,
  unsetUnit,
  selectEvent,
  retrieveEvent,
  unsetEvent,
  retrieveUnit,
} from '../store/actions';

const mapStateToProps = (state) => ({
  filters: state.filters,
  updating: state.events.updating,
  events: state.events.ds,
  selectedEvent: state.event.meat,
  selectedUnit: state.observation.meat,
});


const mapDispatchToProps = d => ({
  update: f => d(updateFilters(f)),
  updateEvents: () => d(updateEvents({})),
  reset: () => d(resetFilters()),
  getEvent: id => d(retrieveEvent(id)),
  selectEvent: u => d(selectEvent(u)),
  clearEvent: () => d(unsetEvent()),
  getUnit: id => d(retrieveUnit(id)),
  clearUnit: () => d(unsetUnit()),
});

const Collection = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollectionComponent)
);

export default Collection;
