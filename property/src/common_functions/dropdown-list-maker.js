import {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';

function DropdownListMaker({searchBy}) {

    const[list, setList] = useState([]);

    useEffect(()=>{

        const regionList = ['North', 'South', 'East', 'West'];
        const specialtyList = ['Luxury', 'Condominium', 'HDB'];

        if (searchBy === 'region') {
            setList(regionList);
        } else if (searchBy === 'specialty') {
            setList(specialtyList);
        }

        return () => setList([]);
    }, [])
    
    return(<>
        <option key={nanoid()} value="">Select</option>
        {list.map(item => {
            return <option key={nanoid()} value={`${item.toLowerCase()}`}>{`${item}`}</option>
        })}
    </>)
}

export default DropdownListMaker;