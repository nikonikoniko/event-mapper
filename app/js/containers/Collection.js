import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import CollectionComponent from '../components/CollectionComponent';

import {
  updateFilters,
  resetFilters,
  unsetUnit,
  selectEvent,
  retrieveEvent,
  unsetEvent,
  retrieveUnit,
} from '../store/actions';

const mapStateToProps = (state) => ({
  filters: state.filters,
  stats: state.stats,
  updating: state.events.updating,
  events: state.events.ds,
  selectedEvent: state.event.meat,
  selectedUnit: state.observation.meat,
});

const mapDispatchToProps = dispatch => ({
  update: (f) => dispatch(updateFilters(f)),
  reset: () => dispatch(resetFilters()),
  getEvent: (id) => dispatch(retrieveEvent(id)),
  selectEvent: (u) => dispatch(selectEvent(u)),
  clearEvent: () => dispatch(unsetEvent()),
  getUnit: (id) => dispatch(retrieveUnit(id)),
  clearUnit: () => dispatch(unsetUnit()),
});

const Collection = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionComponent));

export default Collection;
