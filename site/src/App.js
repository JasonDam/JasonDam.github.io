import logo from './logo.svg';
import Navigation from './components/Navigation'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
    <div className="container">
      <Navigation/>
      <Header></Header>
    </div>
    </Router>
  );
}

export default App;
