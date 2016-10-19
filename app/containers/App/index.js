/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Header from 'components/Header';
import Footer from 'components/Footer';

import styles from './styles.css';

function App(props) {
  return (
    <div className={styles.wrapper}>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Header location={props.location.pathname} />
      {React.Children.toArray(props.children)}
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
