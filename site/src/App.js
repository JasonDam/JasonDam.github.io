import logo from './logo.svg';
import Navigation from './components/Navigation'
import Header from './components/Header'
import InfoCards from './components/InfoCards'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [infoCards, setTasks] = useState(
    [
      {
        id: 1,
        title: 'About Me',
        description: '2/14/2021',
        display: false
      }, {
        id: 2,
        title: 'About the Site',
        description: '3/10/2021',
        display: false
      }, {
        id: 3,
        title: 'My work',
        description: '4/2/2021',
        display: false
      },
    ])
  return (
    <Router>
    <div className="container">
      <Navigation/>
      <Header></Header>
      <InfoCards infoCards={infoCards}/>
    </div>
    </Router>
  );
}

export default App;
