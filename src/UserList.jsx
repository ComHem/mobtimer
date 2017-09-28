import React from 'react';
import { connect } from 'react-redux';
import './UserList.css';
import { addUser, removeUser, toggleUserSleeping } from './user_actions';
import { CONST__NEW_USER_NAME } from './user_types';

class UserList extends React.Component {

    constructor({ currentUser }) {
        super();
        this.onAddUser = this.onAddUser.bind(this);
        this.onRemoveUser = this.onRemoveUser.bind(this);
        this.onToggleUserSleeping = this.onToggleUserSleeping.bind(this);

    }

    onAddUser(name) {
        this.props.dispatch(addUser({ name, sleeping:false }));
    }
    onToggleUserSleeping(name) {
        this.props.dispatch(toggleUserSleeping(name));
    }
    onRemoveUser(name) {
        this.props.dispatch(removeUser(name))
    }

    render(){
        const { users, currentUser } = this.props;
        return (<div>
            <h3>Mobbare</h3>
            <ul>
                {Object.values(users).map((user) => (
                    <li className={`user-list__user ${user.sleeping ? 'user-list__user--inactive' : ''} ${currentUser === user.name ? 'user-list__user--current' : ''}`} key={user.name}>
                        {user.name}
                        <div>
                            <button onClick={() => this.onToggleUserSleeping(user.name)}>{user.sleeping ? 'Aktivera' : 'Inaktivera'}</button>
                            <button onClick={() => this.onRemoveUser(user.name)}>Ta bort</button>
                        </div>
                    </li>
                ))}
                <li key={CONST__NEW_USER_NAME}>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.onAddUser(this.name.value);
                    }}>
                        <input id="name" name="name" ref={(ref) => this.name = ref} />
                        <button>Lägg till</button>
                    </form>
                </li>
            </ul>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    users: state.user.list,
    currentUser: state.user.current,
});

export default connect(mapStateToProps)(UserList);
