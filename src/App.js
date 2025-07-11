/*import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fileupload from './Fileupload';


function App() {
  return (
    <div style={{paddingLeft:300}}>
       <h2>React + Node.js Image Upload</h2>
       <Fileupload/>
    </div>
  );
}

export default App;  */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fileupload from './Fileupload';
import ThankYou from './ThankYou'; // new page

function App() {
  return (
    <Router>
      <div style={{ paddingLeft: 300 }}>
        <Routes>
          <Route path="/" element={<Fileupload />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

