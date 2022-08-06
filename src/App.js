import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Toaster} from 'react-hot-toast';

// Amplify
import Amplify from 'aws-amplify';

// Pages
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Error from './pages/Error';
import ProductDetails from './pages/ProductDetails';

// Components
import { Layout } from './components'

// Amplify Configurations
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  return (
    <Router>
      <Layout> 
        <Toaster />
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product">
            <Route path=":id" element={<ProductDetails></ProductDetails>} />
          </Route>
          <Route path="*" element={<Error />}>
        </Route>

       </Routes>
       </Layout>
    </Router>
  );
}

export default App;
