import React from 'react';
import {connect} from 'react-redux';
import './UserList.css';
import Icon from '../Icon/Icon';
import {addUser, removeUser, toggleUserSleeping} from '../../redux/user/user_actions';

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
            <ul className="user-list">
                {Object.values(users).filter((user) => user.type === 'human').map((user, index) => (
                    <div className="user-list__user-container">
                        { user.name !== currentUser && <button className="user-list__remove-btn" onClick={() => this.onRemoveUser(user.name)} />}
                        <div onClick={() => this.onToggleUserSleeping(user.name)} className={`pointer ${user.sleeping ? 'user-list__user--inactive' : ''}`}>
                            {currentUser === user.name && <div className="user-list__user-image" />}
                            <div className={`user-list__user user-list__user--${index}  ${currentUser === user.name ? 'user-list__user--current' : ''}`}
                                 key={user.name}>
                                <span className="user-list__user__name">{user.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="UserList--break">
                    {currentUser === 'break' && <div className="user-list__user-image" />}
                    <Icon size="large" icon="coffee"/>
                </div>
            </ul>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    users: state.user.list,
    currentUser: state.user.current,
});

export default connect(mapStateToProps)(UserList);
