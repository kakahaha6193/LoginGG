import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { authActions } from '_store';
import './login.css';
export { Login };

function Login() {
    const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return dispatch(authActions.login({ username, password }));
    }

    function signInGG() {
        window.open('https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://lab.devon.com/auth/google&response_type=code&client_id=599619162192-ibqne4vpbvb3smgjf0c1h63dao6fr9mn.apps.googleusercontent.com', '_self')
    }

    return (
        <>
            <div className="card m-3">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <Button disabled={isSubmitting} htmlType="submit">
                            Login
                        </Button>
                        <Link to="../register" className="btn btn-link">Register</Link>
                    </form>
                    <div className="signInWrapper">
                        <button type="button" className="login-with-google-btn" onClick={signInGG}>
                            Sign in with Google
                        </button>&nbsp;
                      
                        <button type="button" className="login-with-naver-btn" disabled>
                            Sign in with NAVER
                        </button>
                    </div>

                </div>

            </div>
        </>

    )
}
