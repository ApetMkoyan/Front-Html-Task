import './sidebar.scss';
import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png'

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: true,
            activeRoute: null,
        };
    }

    toggleSidebar = () => {
        this.setState((state) => ({ isOpened: !state.isOpened }));
    };

    goToRoute = (path) => {
        console.log(`going to "${path}"`);
        this.setState({ activeRoute: path });
    };

    showTooltip = (e, title) => {
        if (this.state.isOpened) return;
        const tooltip = this.tooltip;
        tooltip.innerHTML = title;
        tooltip.style.display = 'block';
        tooltip.style.top = (e.clientY - 810) + 'px';
        tooltip.style.left = (e.clientX - 820) + 'px';
    };

    hideTooltip = () => {
        if (this.state.isOpened) return;
        const tooltip = this.tooltip;
        tooltip.style.display = 'none';
    };


    render() {
        const { isOpened, activeRoute } = this.state;
        const containerClassnames = classnames('sidebar', { opened: isOpened, closed: !isOpened });

        return (
            <div className={containerClassnames}>
                <div className='top'>
                    <img
                        className='logo'
                        src={logo}
                        alt="TensorFlow logo"
                    />
                    <span>TensorFlow</span>
                    <button onClick={this.toggleSidebar}>
                        <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
                    </button>
                </div>

                <div>
                    {
                        routes.map((route) => (
                            <div
                                className={`routes ${activeRoute === route.path ? 'active' : ''}`}
                                key={route.title}
                                onClick={() => this.goToRoute(route.path)}
                                onMouseEnter={(e) => this.showTooltip(e, route.title)}
                                onMouseLeave={() => this.hideTooltip()}
                            >
                                <div className="tooltip" ref={(tooltip) => { this.tooltip = tooltip }}></div>
                                <FontAwesomeIcon className='icon' icon={route.icon} />
                                <span className='test1'>{route.title}</span>
                            </div>
                        ))
                    }
                </div>

                <div>
                    {
                        bottomRoutes.map((route) => (
                            <div
                                className={`bottomRoutes ${activeRoute === route.path ? 'active' : ''}`}
                                key={route.title}
                                onClick={() => this.goToRoute(route.path)}
                                onMouseEnter={(e) => this.showTooltip(e, route.title)}
                                onMouseLeave={() => this.hideTooltip()}>
                                <div className="tooltip" ref={(tooltip) => { this.tooltip = tooltip }}></div>
                                <FontAwesomeIcon className='icon' icon={route.icon} />
                                <span>{route.title}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }

}
