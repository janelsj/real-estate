import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import API from '../../common_functions/API';
import Content from '../../common_functions/ShowContent';
import DropdownListMaker from '../../common_functions/dropdown-list-maker';
import {Link, useParams} from 'react-router-dom';
import './agent.css';

export function AgentsAll(){

    const [agentsList, setAgentsList] = useState([]);
    const [isAPILoaded, setIsAPILoaded] = useState(false);

    useEffect(()=>{
        let agentsArray = [];
        /* Get data for webpage from API*/
        API.get('/general/agent/all').then(response => {
            for(let eachAgent of response.data.data){
                const agentData = {
                    id: eachAgent.id,
                    fullName: eachAgent.fullName,
                    contactNo: eachAgent.contactNo,
                    email: eachAgent.email,
                };
                agentsArray.push(agentData);
            }
            // console.log(agentsArray);
            setAgentsList(agentsArray);
            setIsAPILoaded(true);
            }
        );
        
        return () => setIsAPILoaded(false);

    },[]);

    return(<>
        <div className="title">
            <h2>All agents</h2>
        </div>
        <Content 
          dataToShow={
            <div id="agent">
                {agentsList.map(item => {
                    return (<div className="eachAgent-dataBox" key={nanoid()}>
                        <ul key={nanoid()}>
                            <li key={nanoid()}><b>{item.fullName}</b></li>
                            <li key={nanoid()}>{item.contactNo}</li>
                            <li key={nanoid()}>{item.email}</li>
                            <li key={nanoid()}><Link to = {`/agents/id/${item.id}`}>See detailed profile</Link></li>
                        </ul>
                    </div>
                    )
                })}
            </div>
            }
          isLoaded={isAPILoaded}
        />
    </>)
};

export function AgentsSearch(){

    const [region, setRegion] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [agentsList, setAgentsList] = useState([]);
    const [isAPILoaded, setIsAPILoaded] = useState(false);

    useEffect(()=>{     
        let agentsArray = [];

        if(region !== ""){
             /* Get data for webpage from API*/
            API.get(`/general/agent/region/${region}`).then(response => {
                for(let eachAgent of response.data.data){
                    const agentData = {
                        id: eachAgent.id,
                        fullName: eachAgent.fullName,
                        contactNo: eachAgent.contactNo,
                        email: eachAgent.email,
                        specialty: eachAgent.specialty,
                    };
                    agentsArray.push(agentData);
                }
                setAgentsList(agentsArray);
                setIsAPILoaded(true);
                }
            );
        } else if (specialty !== "") {
            /* Get data for webpage from API*/
            API.get(`/general/agent/specialty/${specialty}`).then(response => {
                for(let eachAgent of response.data.data){
                    const agentData = {
                        id: eachAgent.id,
                        fullName: eachAgent.fullName,
                        contactNo: eachAgent.contactNo,
                        email: eachAgent.email,
                        region: eachAgent.region,
                    };
                    agentsArray.push(agentData);
                }
                setAgentsList(agentsArray);
                setIsAPILoaded(true);
                }
            );
        }

        return () => setIsAPILoaded(false);

    },[region, specialty]);

    return(<>
        <div className="title">
            <h2>Agents</h2>
        </div>
        <div className="selection">
            <label htmlFor="region">Choose region:</label>
            <select name="region" value={region} onChange={e => {
                setRegion(e.target.options[e.target.selectedIndex].value);
                setSpecialty("");
                }}>
                <DropdownListMaker searchBy='region'/>
            </select><br/>
            <label htmlFor="specialty">Choose property type:</label>
            <select name="specialty" value={specialty} onChange={e => {
                setSpecialty(e.target.options[e.target.selectedIndex].value);
                setRegion("");
            }}>
                <DropdownListMaker searchBy='specialty'/>
            </select> 
        </div>
        {(region === "" && specialty === "") ? 
        <Content 
        dataToShow={
          <div id="agent">
              <h3>Please make a selection.</h3>
          </div>
          }
        isLoaded="true"
      />
        : <Content 
          dataToShow={
            <div id="agent">
                {agentsList.map(item => {
                    return (<div className="eachAgent-dataBox" key={nanoid()}>
                        <ul key={nanoid()}>
                            <li key={nanoid()}><b>{item.fullName}</b></li>
                            <li key={nanoid()}>{item.contactNo}</li>
                            <li key={nanoid()}>{item.email}</li>
                            <li key={nanoid()}>{item.specialty ? `Specializes in: ${item.specialty} properties`:`In charge of: ${item.region} region`}</li>
                            <li key={nanoid()}><Link to = {`/agents/id/${item.id}`}>See detailed profile</Link></li>
                        </ul>
                    </div>
                    )
                })}
            </div>
            }
          isLoaded={isAPILoaded}
        />
    } 
    </>)
};

export function Agent(){
    const [agent, setAgent] = useState({
        fullName: '',
        contactNo: '',
        email: '',
        specialty: '',
        region: '',
    });
    const [isAPILoaded, setIsAPILoaded] = useState(false);
    let {agentId} = useParams();

    useEffect(()=>{
        /* Get data for webpage from API*/
        API.get(`/general/agent/id/${agentId}`).then(response => {
            const agentData = {
                fullName: response.data.data.fullName,
                contactNo: response.data.data.contactNo,
                email: response.data.data.email,
                specialty: response.data.data.specialty,
                region: response.data.data.region,
            };
            setAgent(agentData);
            setIsAPILoaded(true);
            }
        );
        
        return () => setIsAPILoaded(false);

    },[]);

    return(<>
        <div className="title">
            <h2>{agent.fullName}</h2>
        </div>
        <Content 
          dataToShow={
            <div id="agent-individual">
                <ul key={nanoid()}>
                    <li key={nanoid()}><b>Contact number:</b> {agent.contactNo}</li>
                    <li key={nanoid()}><b>Email:</b> {agent.email}</li>
                    <li key={nanoid()}><b>Specializes in:</b> {agent.specialty} properties</li>
                    <li key={nanoid()}><b>In charge of:</b> {agent.region} region</li>
                    <li key={nanoid()}><Link to = "/agents/search">Back to: Find agent</Link></li>
                    <li key={nanoid()}><Link to = "/agents/all">Back to: All agents</Link></li>
                </ul>
            </div>
            }
          isLoaded={isAPILoaded}
        />
    </>)
};