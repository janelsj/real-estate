import React, { useEffect, useState } from 'react';
import API from '../../common_functions/API';
import './property.css';

export function PropertiesSearch({searchParameter}){
    
    return(<>
        <h2>This is content for retrieving selected properties according to search parameter.</h2>
    </>)
};

export function PropertiesSale(){
    const [propertiesSale, setPropertiesSale] = useState('');
    let propertiesSaleArray = [];

    useEffect(() => {
        API.get('/general/properties/search/isSale/true')
        .then((response) => {
            const propertiesSaleData = response.data.data;
            setPropertiesSale(propertiesSaleData);
        })
        .catch(error => console.error(`Error: ${error}`));
    }, []);

    propertiesSaleArray = propertiesSale;

    if (propertiesSaleArray.length > 0) {
       console.log(propertiesSaleArray);

        return ( 
            <div className = "propertiesSale" >
            <h2>Properties for Sale</h2>
                {propertiesSaleArray.map(properties =>
                <ul key={properties.id}>
                   <li><b>{properties.location}</b></li>
                   <li>Price: ${properties.price}</li>
                   <li>{properties.noOfBedrooms} bedrooms</li>
                </ul>
                )}
            </div>
        );  
    } else {
        return(<>
            <h2>There is no properties for sale.</h2>
        </>)
    }  
};

export function PropertiesRent(){
    const [propertiesRent, setPropertiesRent] = useState('');
    let propertiesRentArray = [];

    useEffect(() => {
        API.get('/general/properties/search/isRent/true')
        .then((response) => {
            const propertiesRentData = response.data.data;
            setPropertiesRent(propertiesRentData);
        })
        .catch(error => console.error(`Error: ${error}`));
    }, []);

    propertiesRentArray = propertiesRent;

    if (propertiesRentArray.length > 0) {
       console.log(propertiesRentArray);

        return ( 
            <div className = "propertiesSale" >
            <h2>Properties for Rent</h2>
                {propertiesRentArray.map(properties =>
                <ul key={properties.id}>
                   <li><b>{properties.location}</b></li>
                   <li>Price: ${properties.price}</li>
                   <li>{properties.noOfBedrooms} bedrooms</li>
                </ul>
                )}
            </div>
        );  
    } else {
        return(<>
            <h2>There is no properties for rent.</h2>
        </>)
    }  
};