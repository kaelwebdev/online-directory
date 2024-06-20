import './styles/listOfUsers.css'

export const ListOfUsers = ({users}) => {

    if (users == null) return <h3>There are no users</h3>;

    return (
        <div>
            <h2>Users</h2>
            <ul className='usersList'>
                {users.map(user => <li key={user.id}><button  onClick={()=> { }}>
                    {user.username}
                </button></li>)}
            </ul>
        </div>
    )
}
