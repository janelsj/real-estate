import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import API from '../../common_functions/API';
import Content from '../../common_functions/ShowContent';
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
                            <li key={nanoid()}>{item.fullName}</li>
                            <li key={nanoid()}>{item.contactNo}</li>
                            <li key={nanoid()}>{item.email}</li>
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

export function AgentsSearch({searchParameter}){
    return(<>
        <h2>This is content for finding specific agent.</h2>
    </>)
};