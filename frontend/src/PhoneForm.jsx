import { useUpdatePhone } from './persons/custom_hooks'
import { useState } from 'react';
//import { notifyError } from './utils/notifyError';

export const PhoneForm = () => {
    const [editPhone,  { data, loading, error }] = useUpdatePhone();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
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

        editPhone({
            variables: {
                name: formData.name,
                phone: formData.phone,
            }
        })
        setFormData({
            name: "",
            phone: ""
        })

    };

    const ErrorMsg = () => {
        return <h3 style={{color: 'red'}}> {error.message}</h3>
    }

    return (<>
        <h2>Edit Phone Number</h2>
        <div className='formContainer'>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Change Phone</button>
        </form>
        {
            (error) ? <ErrorMsg /> :  null
        }
        </div>
    </>)

}

export default PhoneForm;