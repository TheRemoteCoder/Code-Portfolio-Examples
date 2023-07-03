// Vendor
/* eslint-disable no-unused-vars */
import * as bootstrap from 'bootstrap';

// Core
import ControllerCore from './core/controller';

// Styles
import './styles/index.scss';

/**
 * Main application entry point.
 */
window.addEventListener('load', () => {
  // eslint-disable-next-line no-new
  new ControllerCore(bootstrap);
});
