import { Outlet } from 'react-router-dom';
import NavigationBar from '../Shared/NavigationBar';

const WithNav = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
};

export default WithNav;
