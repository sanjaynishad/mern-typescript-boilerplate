import './ProfilePopover.css';
import { Button, Popover } from "antd";
import { authProvider } from "../../api/AuthApi";
import { Link } from 'react-router-dom';
import { Component, ReactNode } from 'react';
import defaultProfileImg from './../../assets/images/user.svg';
import { User } from '../../models';

interface IProfilePopoverState {
    me: User;
}

export class ProfilePopover extends Component<React.HTMLAttributes<HTMLDivElement>, IProfilePopoverState> {
    constructor(props: any) {
        super(props);

        this.state = {
            me: {}
        }
    }

    async componentDidMount() {
        this.setState({
            me: await authProvider.me() || {}
        });
    }

    render(): ReactNode {
        if (!authProvider.isLoggedIn()) {
            return null;
        }

        const { firstName, lastName, email } = this.state.me;

        const popoverContent = <div>
            <div className="profile-info">
                <img src={defaultProfileImg} alt="Sanjay Nishad" />
                <h3>
                    {firstName} {lastName}
                </h3>
                <h5>{email}</h5>

                <div className="mb-1">
                    <Link to="profile">
                        <Button >Manage account</Button>
                    </Link>
                </div>
            </div>

            <div className="profile-info-footer">
                <Button type='primary' size='small' onClick={() => authProvider.logout("/")}>
                    Logout
                </Button>
            </div>
        </div>

        return (
            <Popover placement="bottomRight" content={popoverContent} trigger="click" className={this.props.className}>
                <span className="profile-icon">
                    <img src={defaultProfileImg} alt={firstName} />
                </span>
            </Popover>
        );
    }
}
