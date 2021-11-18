import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import PropertiesAll from './components/property/Properties-all';
import {PropertiesSearch, PropertiesSale, PropertiesRent} from './components/property/Properties-SearchSaleRent';
import Homepage from './components/Homepage';
import {AgentsAll, AgentsSearch} from './components/agent/Agents';
import NotFoundPage from './components/NotFoundPage';
import './App.css';

function App() {
  return (<div id = "parent">
    <Router>
    <div className="container">
       <div className="navbar">
       <div className="dropdown">
          <button className="dropdownButton"><Link to = "/">Home</Link></button>
        </div>
          <div className="dropdown">
            <button className="dropdownButton">Properties </button>
            <div className="dropdown-content">
              <Link to = "/properties/all">Browse all</Link>
              <Link to = "/properties/sale">For sale</Link>
              <Link to = "/properties/rent">For rent</Link>
              <Link to = "/properties/search">Search properties</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdownButton">Agents</button>
            <div class="dropdown-content">
              <Link to = "/agents/all">Browse all</Link>
              <Link to = "/agents/search">Find Agent</Link>
            </div>
          </div>
      </div>
      <div className="content">
        <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/properties/all" element={<PropertiesAll />} />
        <Route path="/properties/sale" element={<PropertiesSale />} />
        <Route path="/properties/rent" element={<PropertiesRent />} />
        <Route path="/properties/search" element={<PropertiesSearch />} />
        <Route path="/agents/all" element={<AgentsAll />} />
        <Route path="/agents/search" element={<AgentsSearch />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
    </Router>
</div>);
}

export default App;
