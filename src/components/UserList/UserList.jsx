import React from 'react';
import {connect} from 'react-redux';
import './UserList.css';
import {addUser, removeUser, toggleUserSleeping} from '../../redux/user/user_actions';

class UserList extends React.Component {
    onAddUser = (name) => {
        this.props.dispatch(addUser({
            name,
            sleeping: false
        }));
    };

    onToggleUserSleeping = (user) => {
        if (user !== this.props.currentUser) {
            this.props.dispatch(toggleUserSleeping(user));
        }
    };

    onRemoveUser = (name) => {
        this.props.dispatch(removeUser(name))
    };

    render() {
        const {users, currentUser} = this.props;
        console.info(users, users.length);

        return (
            <div>
                <ul className="user-list">
                    {users && users.map((user, index) => (
                        <div className="user-list__user-container" key={'user' + index}>
                            {user.name !== currentUser &&
                            <button
                                className="user-list__remove-btn"
                                onClick={() => this.onRemoveUser(user)}
                            />}

                            <div onClick={() => this.onToggleUserSleeping(user)}
                                 className={`pointer ${user.sleeping ? 'user-list__user--inactive' : ''}`}>
                                {currentUser === user.name && <div className="user-list__user-image"/>}
                                <div className={`user-list__user user-list__user--${index}  ${currentUser === user.name ? 'user-list__user--current' : ''}`}
                                     key={user.name}>
                                    <span className="user-list__user__name">{user.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    currentUser: state.user.current,
});

export default connect(mapStateToProps)(UserList);
