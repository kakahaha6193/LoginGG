import { useSearchParams } from "react-router-dom";
import './login.css';
import { useEffect } from "react";
import { history, fetchWrapper } from '_helpers';
import { useDispatch } from 'react-redux';
import { authActions } from '_store';
export { Landing };

function Landing() {
    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(() => {
        loginGG();
    }, [searchParams]);

    async function loginGG() {
        let response = await fetchWrapper.get(`auth/google?code=${searchParams.get('code')}`);
        let user = {
            firstName: "", 
            id: response.userId,
            lastName: "",
            token: response.tokenId,
            username: response.userId
        }
        dispatch(authActions.setAuth(user));
        localStorage.setItem('auth', JSON.stringify(user));
        const { from } = history.location.state || { from: { pathname: '/' } };
        history.navigate(from);
    }
    return (
        <>
            landing on log
        </>

    )
}
