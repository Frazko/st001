import React, {Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from '../App.jsx';

//Containers
import Auth from '../containers/Auth.container.js';
import Collections from '../containers/Collections.container.js';
import Dashboard from '../containers/Dashboard.container.js';
import Sections from '../containers/Sections.container.js';
import SectionItems from '../containers/SectionItems.container.js';
import ItemDetail from '../containers/ItemDetail.container.js';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />

      <Route path="/collections" component={Collections}/>
      <Route path="/sections" component={Sections}/>
      <Route path="/sections/:id" component={Sections}/>
      <Route path="/sectionItems" component={SectionItems}/>
      <Route path="/itemDetail" component={ItemDetail}/>
    </Router>
  </Provider>
  );

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;