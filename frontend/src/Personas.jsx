import { FindPerson } from './FindPerson';
import { useEffect, useState } from 'react';
import './styles/personsList.css'

export const Persons = ({persons}) => {
    const [getPerson, result] = FindPerson();
    const [person, setPerson] = useState(null);

    const showPerson = name => {
        getPerson({variables: {nameToSearch: name}})
    }

    useEffect(()=> {
        if (result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (person) {
        return(<div>
            <h3>{person.name}</h3>
            <div>{person.address.street}, {person.address.city}</div>
            <div>{person.phone}</div>
            <button onClick={()=>setPerson(null)}>Close</button>
        </div>)
    }

    if (persons == null) return null;

    return (
        <div>
            <h2>Persons</h2>
            <ul className='personsList'>
                {persons.map(p => <li key={p.id}><button  onClick={()=> { showPerson(p.name)}}>
                    {p.name} : {p.phone}
                </button></li>)}
            </ul>
           
        </div>
    )
}
