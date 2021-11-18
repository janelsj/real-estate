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
          <div><Link to = "/">Home</Link></div>
          <div className="dropdown">
            <button className="dropdownButton">Properties</button>
            <div class="dropdown-content">
              <Link to = "/Properties/all">Browse all</Link>
              <Link to = "/Properties/sale">For sale</Link>
              <Link to = "/Properties/rent">For rent</Link>
              <Link to = "/Properties/search">Search properties</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdownButton">Agents</button>
            <div class="dropdown-content">
              <Link to = "/Agents/all">Browse all</Link>
              <Link to = "/Agents/search">Find Agent</Link>
            </div>
          </div>
      </div>
      <div className="content">
        <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/Properties/all" element={<PropertiesAll />} />
        <Route path="/Properties/sale" element={<PropertiesSale />} />
        <Route path="/Properties/rent" element={<PropertiesRent />} />
        <Route path="/Properties/search" element={<PropertiesSearch />} />
        <Route path="/Agents/all" element={<AgentsAll />} />
        <Route path="/Agents/search" element={<AgentsSearch />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
    </Router>
</div>);
}

export default App;
