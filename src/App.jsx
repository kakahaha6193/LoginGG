import { Routes, Route, Navigate, useNavigate, useLocation, useParams  } from 'react-router-dom';

import { history } from '_helpers';
import { Nav, Alert, PrivateRoute } from '_components';
import { Home } from '_layouts/home';
import { AccountLayout, Landing } from '_layouts/account';
import { UsersLayout } from '_layouts/users';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();
    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UsersLayout />} />
                    </Route>
                    {/* public */}
                    <Route path="auth/*" element={<Landing />} /> 
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
