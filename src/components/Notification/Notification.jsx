import React from 'react';
import { connect } from 'react-redux';
import './Notification.css';

class Notification extends React.Component {
    constructor(props){
        super(props);
        this.state={ hidden:false };
        this.onHide = this.onHide.bind(this);
    }
    onHide(){
        this.setState({ hidden: true })
    }
    componentDidMount(){
        setTimeout(this.onHide, 2000);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.currentUser !== nextProps.currentUser){
            this.setState({hidden: false})
            setTimeout(this.onHide, 2000);
        }
    }
    render () {
        const { currentUser } = this.props;
        const { hidden } = this.state;
        return (
            <div className={`notification ${hidden ? 'notification--hidden' : ''}`}>
                Hello&nbsp;{currentUser}
            </div>
        )
    };

}

const mapStateToProps = (state) => ({
    currentUser: state.user.current,
})

export default connect(mapStateToProps)(Notification);
