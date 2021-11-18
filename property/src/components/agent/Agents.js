import {useState, useEffect} from 'react';
import API from '../../common_functions/API';
import Content from '../../common_functions/ShowContent';
import './agent.css';

export function AgentsAll(){

    const [agentsList, setAgentsList] = useState([]);
    const [isAPILoaded, setIsAPILoaded] = useState(false);

    useEffect(()=>{
        let agentsArray = [];
        /* Get data for webpage from API*/
        API.get('/general/agents/all').then(response => {
            // if (response.data["Error Message"]) {
                // setIsAPILoaded(false);
            //     alert ('Invalid selection. Please choose another currency pair.');
            //     agentsArray = [''];
            //     setAgentsList(agentsArray);
            //} else {
                for (let eachAgent in response.data){
                        agentsArray.push(eachAgent);
                        console.log(agentsArray);
                };
                setAgentsList(agentsArray);
                setIsAPILoaded(true);
            }
        );
        
        return () => setIsAPILoaded(false);

    },[agentsList]);

    return(<>
        <div className="div-header">
            <h2>All agents</h2>
        </div>
        <Content 
          dataToShow={<div id="agent">{agentsList}</div>}
          isLoaded={isAPILoaded}
        />
    </>)
};

export function AgentsSearch({searchParameter}){
    return(<>
        <h2>This is content for finding specific agent.</h2>
    </>)
};