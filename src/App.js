import React from "react"
import './App.sass';
import Header from './Header';
import Home from './Home';
import Post from './Post';
import Category from './Category';
import Contact from './Contact';
import Footer from './Footer';
import { HelmetProvider } from 'react-helmet-async';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet"></link>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/post/:slug" component={Post} />
        <Route path="/category/:category" component={Category} />
        <Route path="/contact" component={Contact} />
        <Footer />
      </Router>
    </HelmetProvider>

  );
}

export default App;
