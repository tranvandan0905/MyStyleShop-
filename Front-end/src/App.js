import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import RoutesAdmin from './routes/routesAdmin';
import RoutesUser from './routes/routesUser';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route dành cho User */}
        <Route path="/*" element={<MainLayout />}>
          <Route path="*" element={<RoutesUser />} />
        </Route>

        {/* Route dành cho Admin */}
        <Route path="/admin/*" element={<MainLayout />}>
          <Route path="*" element={<RoutesAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
