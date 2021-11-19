import {useState, useEffect} from 'react';
import API from '../../common_functions/API';
import Content from '../../common_functions/ShowContent';
import {nanoid} from 'nanoid';
import {Link, useParams} from 'react-router-dom';
import './property.css';

export function Property(){
    const [property, setProperty] = useState({
        price: '',
        location: '',
        bedrooms: '',
        size: '',
        sale: false,
        rent: false
    });
    const [isAPILoaded, setIsAPILoaded] = useState(false);
    let {propertyId} = useParams();

    useEffect(()=>{
        /* Get data for webpage from API*/
        API.get(`/general/properties/id/${propertyId}`).then(response => {
            const propertyData = {
                price: response.data.data.price,
                location: response.data.data.location,
                bedrooms: response.data.data.noOfBedrooms,
                size: response.data.data.sizeInSqFt,
                sale: response.data.data.isSale,
                rent: response.data.data.isRent
            };
            setProperty(propertyData);
            setIsAPILoaded(true);
            }
        );
        
        return () => setIsAPILoaded(false);

    },[]);

    return(<>
        <div className="title">
            <h2>Property: {propertyId}</h2>
        </div>
        <Content 
          dataToShow={
            <div id="property-individual">
                <ul key={nanoid()}>
                    <li key={nanoid()}><b>Location:</b> {property.location}</li>
                    <li key={nanoid()}><b>Valuation:</b> {property.price}</li>
                    <li key={nanoid()}><b>Size:</b> {property.bedrooms} bedrooms,  {property.size} square feet</li>
                    <li key={nanoid()}>{property.sale ? 'For sale':'For rent'}</li>
                    <li key={nanoid()}><Link to = "/properties/all">Back to all properties</Link></li>
                </ul>
            </div>
            }
          isLoaded={isAPILoaded}
        />
    </>)
};

export default Property;