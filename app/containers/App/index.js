/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Relay from 'react-relay';
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
        titleTemplate="%s - Belong"
        defaultTitle="Belong"
        meta={[
          { name: 'description', content: 'A prototype meditation timer' },
        ]}
      />
      <Header location={props.location.pathname} viewer={props.viewer} />
      {React.Children.toArray(props.children)}
      <Footer />
    </div>
  );
}

App.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  children: React.PropTypes.node,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${Header.getFragment('viewer')}
      }
    `,
  },
});
