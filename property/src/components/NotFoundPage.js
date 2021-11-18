import {useLocation} from 'react-router-dom';

function NotFoundPage() {
    const location = useLocation();
    return (<div id = "error">
        <h2>Error: page {location.pathname} does not exist.</h2>
    </div>)
}

export default NotFoundPage;