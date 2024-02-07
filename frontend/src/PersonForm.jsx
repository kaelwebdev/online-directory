import { useCreatePerson } from './persons/custom_hooks'
import { useState } from 'react';
//import { notifyError } from './utils/notifyError';
import './styles/form.css'

export const PersonForm = () => {
    const [createPerson,  { data, loading, error }] = useCreatePerson();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
        street: ""
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
        createPerson({
            variables: {
                name: formData.name,
                phone: formData.phone,
                city: formData.city,
                street: formData.street
            }
        })
        setFormData({
            name: "",
            phone: "",
            city: "",
            street: ""
        })

    };

    const ErrorMsg = () => {
        return <h3 style={{color: 'red'}}> {error.message}</h3>
    }

    return (<>

        <h2>Create Person</h2>
        <div className='formContainer'>

        
        <form onSubmit={handleSubmit} className='form'>
            Name <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
            />
            Phone <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
            />
            City <input
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
            />
            Street <input
                name="street"
                type="text"
                value={formData.street}
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

export default PersonForm;