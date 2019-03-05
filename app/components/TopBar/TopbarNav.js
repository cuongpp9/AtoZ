import React from 'react';
import TopbarNavCustomers from './TopbarNavCustomers';
import TopbarNavPricing from './TopbarNavPricing';
import TopbarNavAR from './TopbarNavAR';
import TopbarNavOperations from './TopbarNavOperations';

export default () => (
  <nav className="topbar__nav">
    <TopbarNavCustomers />
    <TopbarNavPricing />
    <TopbarNavAR />
    <TopbarNavOperations />
  </nav>
);
