import { useLogin } from './persons/custom_hooks'
import { useEffect, useState } from 'react';
//import { notifyError } from './utils/notifyError';
import './styles/form.css'

export const LoginForm = ({setToken}) => {
    const [login,  { data, loading, error }] = useLogin();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    useEffect(()=> {
        if (data) {
            const {value:token} = data.login;
            setToken(token);
            localStorage.setItem('directorio_social_token', token)
        }
    } ,[data])

    const handleSubmit = (event) => {
        event.preventDefault();
        login({
            variables: {
                username: formData.username,
                password: formData.password
            }
        })
        setFormData({
            username: "",
            password: ""
        })

    };

    const ErrorMsg = () => {
        return <h3 style={{color: 'red'}}> {error.message}</h3>
    }

    return (<>

        <h2>Login</h2>
        <div className='formContainer'>

        
        <form onSubmit={handleSubmit} className='form'>
            Username: <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
            />
            Password: <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
        {
            (error) ? <ErrorMsg /> :  null
        }
        </div>
    </>)

}

export default LoginForm;