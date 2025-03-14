import React from "react";
import { Link } from "gatsby";
import Sidebar from "react-sidebar";
import NavLinks from "./navlinks";
// import SocialLinks from "./sociallinks";
import Logo from "./logo";
import { Hamburger } from "./icons";

import "../style/navbar.less";

function SidebarContents() {
    return (
        <div className="sidebar-contents">
            <div className="logo">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="links text-secondary">
                <NavLinks />
            </div>
            <div className="social-links">
                {/* <SocialLinks /> */}
            </div>
        </div>
    );
}

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarPlaceholderHeight: 100,
            sidebarOpen: false
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.menuOpen = this.menuOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    menuOpen(event) {
        event.preventDefault();
        this.onSetSidebarOpen(true);
    }

    componentDidMount() {
        this.changeNavbarPlaceholderHeight();

        let width = window.innerWidth;
        window.addEventListener("resize", () => {
            if (width !== window.innerWidth) {
                width = window.innerWidth;
                this.changeNavbarPlaceholderHeight();
            }
        });
    }

    changeNavbarPlaceholderHeight() {
        let navBar = document.querySelector("nav");
        if (navBar) {
            this.setState({
                navbarPlaceholderHeight: navBar.offsetHeight
            });
        }
    }

    render() {
        const placeholder = this.props.placeholder;
        return (
            <React.Fragment>
                <Sidebar
                    sidebar={<SidebarContents />}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    sidebarClassName="sidebar-content"
                    styles={{
                        sidebar: {
                            zIndex: 101,
                            position: "fixed",
                            top: 0,
                            bottom: 0,
                            transition: "transform .3s ease-out",
                            WebkitTransition: "-webkit-transform .3s ease-out",
                            willChange: "transform",
                            overflowY: "auto"
                        },
                        overlay: {
                            zIndex: 100,
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0,
                            visibility: "hidden",
                            transition: "opacity .3s ease-out, visibility .3s ease-out",
                            backgroundColor: "rgba(0,0,0,.3)"
                        },
                        content: {
                            position: "relative",
                            height: "100%"
                        }
                    }}
                >
                    <span></span>
                </Sidebar>
                <nav className="text-secondary">
                    <a href="#mobilenav" id="menu-open" onClick={this.menuOpen}>
                        <span className="icon">
                            <Hamburger />
                        </span>
                    </a>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <NavLinks />
                </nav>
                {placeholder && (
                    <div
                        className="navbar-placeholder"
                        style={{
                            height: this.state.navbarPlaceholderHeight + "px"
                        }}
                    ></div>
                )}
            </React.Fragment>
        );
    }
}

export default Navbar;
