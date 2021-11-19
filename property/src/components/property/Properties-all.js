import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import API from '../../common_functions/API';
import Content from '../../common_functions/ShowContent';
import {Link} from 'react-router-dom';
import './property.css';

function PropertiesAll(){

    const [propertiesList, setPropertiesList] = useState([]);
    const [isAPILoaded, setIsAPILoaded] = useState(false);

    useEffect(()=>{
        let propertiesArray = [];
        /* Get data for webpage from API*/
        API.get('/general/properties/all').then(response => {
            for(let eachProperty of response.data.data){
                const propertyData = {
                    id: eachProperty.id,
                    price: eachProperty.price,
                    location: eachProperty.location,
                    bedrooms: eachProperty.noOfBedrooms,
                    size: eachProperty.sizeInSqFt,
                    sale: eachProperty.isSale,
                    rent: eachProperty.isRent
                };
                propertiesArray.push(propertyData);
            }
            // console.log(propertiesArray);
            setPropertiesList(propertiesArray);
            setIsAPILoaded(true);
            }
        );
        
        return () => setIsAPILoaded(false);

    },[]);

    return(<>
        <div className="title">
            <h1>All properties</h1>
        </div>
        <Content 
          dataToShow={
            <div id="propertiesAll">
                {propertiesList.map(item => {
                    return (<div className="eachProperty-dataBox" key={nanoid()}>
                        <ul key={nanoid()}>
                            <li key={nanoid()}>Valuation: {item.price}</li>
                            <li key={nanoid()}>Location: {item.location}</li>
                            <li key={nanoid()}>No. of Bedrooms: {item.bedrooms}</li>
                            <li key={nanoid()}>Size: {item.size} square ft</li>
                            <li key={nanoid()}>{item.sale ? 'For sale':'For rent'}</li>
                            <li key={nanoid()}><Link to={`/properties/id/${item.id}`}>See more details</Link></li>
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

export default PropertiesAll;