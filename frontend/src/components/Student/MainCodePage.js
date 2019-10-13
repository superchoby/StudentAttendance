import React from 'react';
import HasNoCodePage from './HasNoCodePage.js'
import HasCodePage from './HasCodePage.js'
class MainCodePage extends React.Component {
  render() {
    return (
      <div>
      <HasNoCodePage />
      <HasCodePage />
      </div>
  )};
}

export default MainCodePage;
