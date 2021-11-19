import React, { useEffect, useState } from 'react';
import API from '../../common_functions/API';
import Content from '../../common_functions/ShowContent';
import './property.css';

export function PropertiesSearch({searchParameter}){
    
    return(<>
        <h2>This is content for retrieving selected properties according to search parameter.</h2>
    </>)
};

export function PropertiesSale(){
    const [propertiesSale, setPropertiesSale] = useState('');
    const [isAPILoaded, setIsAPILoaded] = useState(false);
    let propertiesSaleArray = [];

    useEffect(() => {
        API.get('/general/properties/search/isSale/true')
        .then((response) => {
            const propertiesSaleData = response.data.data;
            setPropertiesSale(propertiesSaleData);
        })
        .catch(error => console.error(`Error: ${error}`));

        return () => setIsAPILoaded(false);

    }, []);

    propertiesSaleArray = propertiesSale;

    return (<>
        <div className="title">
        <h1>Properties for sale</h1>
        </div>
       {(propertiesSaleArray.length>0) ? 
        <Content 
            dataToShow={
                <div className = "propertiesSale" > 
                {propertiesSaleArray.map(properties => {
                    <div className="eachProperty-dataBox" key={nanoid()}>
                    <ul key={properties.id}>
                       <li><b>{properties.location}</b></li>
                       <li>Price: ${properties.price}</li>
                       <li>{properties.noOfBedrooms} bedrooms</li>
                    </ul>
                    </div>
                })}
                </div>
            }
            isLoaded={isAPILoaded}
          />
        :
        <Content 
        dataToShow={
            <div className = "propertiesSale" > 
            <h3>There is no properties listed for sale.</h3>
            </div>
        }
        isLoaded={isAPILoaded}
      />
        }
    </>);
};

export function PropertiesRent(){
    return(<>
        <h2>This is content for all properties listed for rent.</h2>
    </>)
};