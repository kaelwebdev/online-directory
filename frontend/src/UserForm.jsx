import { useCreateUser } from './persons/custom_hooks'
import { useState } from 'react';
//import { notifyError } from './utils/notifyError';
import './styles/form.css'

export const UserForm = () => {
    const [createUser,  { data, loading, error }] = useCreateUser();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        createUser({
            variables: {
                username: formData.username,
                password: formData.password,
                email: formData.email,
            }
        })
        setFormData({
            username: "",
            password: "",
            email: "",
        })

    };

    const ErrorMsg = () => {
        return <h3 style={{color: 'red'}}> {error.message}</h3>
    }

    return (<>

        <h2>Create User</h2>
        <div className='formContainer'>

        <form onSubmit={handleSubmit} className='form'>
            Username <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
            />
            Password <input
                name="password"
                type="text"
                value={formData.password}
                onChange={handleChange}
            />
            Email <input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
            />
            <button type="submit">Create</button>
        </form>
        {
            (error) ? <ErrorMsg /> :  null
        }
        </div>
    </>)

}

export default UserForm;