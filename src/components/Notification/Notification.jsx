import React from 'react';
import {connect} from 'react-redux';
import './Notification.css';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false
        };
    }

    onHide = () => {
        this.setState({hidden: true})
    };

    componentDidMount() {
        this.showNotification();
    }

    showNotification() {
        setTimeout(this.onHide, 2000);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentUser !== nextProps.currentUser) {
            this.setState({hidden: false});
            this.showNotification();
        }
    }

    render() {
        const {currentUser} = this.props;
        const {hidden} = this.state;

        return (
            <div className={`notification ${hidden ? 'notification--hidden' : ''}`}>
                Hello {currentUser}!
            </div>
        )
    };

}

const mapStateToProps = (state) => ({
    currentUser: state.user.current,
});

export default connect(mapStateToProps)(Notification);
