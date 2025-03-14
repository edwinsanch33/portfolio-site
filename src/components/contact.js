import React from "react";
import SectionTitle from "./sectiontitle";
import { StaticQuery, graphql } from "gatsby";
import { PaperPlane, Mapmarker, Mobile, Envelope, Loading } from "./icons";
// import SocialLinks from "./sociallinks";
import "../style/contact.less";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitDisabled: false,
            name: '',
            email: '',
            message: ''
        };

        this.textAreaInput = this.textAreaInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.showContactForm = true;

        if (this.props.contact.api_url === "") {
            this.showContactForm = false;
        }
    }

    textAreaInput(event) {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.submitDisabled) {
            this.setState({ submitDisabled: true });

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    "form-name": "contact",
                    ...this.state
                }).toString()
            })
                .then(response => {
                    if (response.ok) {
                        this.setState({
                            submitDisabled: false,
                            name: '',
                            email: '',
                            message: ''
                        });
                        this.showSuccessMessage();
                    } else {
                        this.showErrorMessage();
                    }
                })
                .catch(error => {
                    this.showErrorMessage();
                });
        }
    }

    showSuccessMessage = () => {
        if (this.resMessage) {
            this.resMessage.style.opacity = 1;
            this.resMessage.innerHTML = "Message sent successfully";
            this.resMessage.classList.remove("color-error");
            setTimeout(() => {
                this.resMessage.style.opacity = 0;
            }, 5000);
        }
    }

    showErrorMessage = () => {
        if (this.resMessage) {
            this.resMessage.style.opacity = 1;
            this.resMessage.innerHTML = "There was an error sending the message";
            this.resMessage.classList.add("color-error");
            this.setState({ submitDisabled: false });
            setTimeout(() => {
                this.resMessage.style.opacity = 0;
            }, 5000);
        }
    }

    componentDidMount() {
        if (this.showContactForm) {
            let color = window
                .getComputedStyle(this.btn, null)
                .getPropertyValue("color");
            this.btn.querySelector("path").setAttribute("fill", color);
        }

        let li = this.contactArea.querySelectorAll(".item");

        li.forEach(function (e, i) {
            let p = e.querySelector("path");
            if (p)
                p.setAttribute(
                    "fill",
                    window.getComputedStyle(e, null).getPropertyValue("color")
                );
        });
    }

    render() {
        return (
            <section id="contact" className="container">
                <div className="section-title">
                    <SectionTitle title="CONTACT" />
                </div>
                <div
                    className={"row" + (this.showContactForm ? "" : " no-form")}
                    ref={c => (this.contactArea = c)}
                >
                    {this.showContactForm && (
                        <div className="col s12 m6">
                            <form
                                name="contact"
                                method="POST"
                                data-netlify="true"
                                data-netlify-honeypot="bot-field"
                                onSubmit={this.handleSubmit}
                            >
                                <input type="hidden" name="form-name" value="contact" />
                                <div className="field">
                                    <label htmlFor="name" className="label text-tertiary">
                                        Name
                                    </label>
                                    <div className="input-border">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            className="field-box"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="email" className="label text-tertiary">
                                        Email
                                    </label>
                                    <div className="input-border">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            className="field-box"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="message" className="label text-tertiary">
                                        Message
                                    </label>
                                    <div className="input-border">
                                        <textarea
                                            name="message"
                                            id="message"
                                            value={this.state.message}
                                            onChange={this.handleChange}
                                            className="field-box"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <button
                                        type="submit"
                                        className={`btn${this.state.submitDisabled ? " disabled" : ""}`}
                                        disabled={this.state.submitDisabled}
                                    >
                                        SEND{" "}
                                        {this.state.submitDisabled ? (
                                            <span className="icon loading">
                                                <Loading />
                                            </span>
                                        ) : (
                                            <span className="icon paper-plane">
                                                <PaperPlane />
                                            </span>
                                        )}
                                    </button>
                                    <p
                                        className="res-message"
                                        ref={c => (this.resMessage = c)}
                                        style={{ opacity: 0 }}
                                    ></p>
                                </div>
                            </form>
                        </div>
                    )}
                    <div
                        className={
                            this.showContactForm
                                ? "col s12 m6 details"
                                : "col s12 details"
                        }
                    >
                        {this.props.contact.description && (
                            <p className="text-tertiary">
                                {this.props.contact.description}
                            </p>
                        )}
                        <ul>
                            {this.props.contact.mail && (
                                <li className="text-secondary item">
                                    <span className="icon">
                                        <Envelope />
                                    </span>
                                    <a
                                        href={
                                            "mailto:" + this.props.contact.mail
                                        }
                                    >
                                        {this.props.contact.mail}
                                    </a>
                                </li>
                            )}
                            {this.props.contact.phone && (
                                <li className="text-secondary item">
                                    <span className="icon">
                                        <Mobile />
                                    </span>
                                    <a href={"tel:" + this.props.contact.phone}>
                                        {this.props.contact.phone}
                                    </a>
                                </li>
                            )}
                            {this.props.contact.address && (
                                <li
                                    className="text-tertiary item"
                                    style={{ whiteSpace: "pre" }}
                                >
                                    <span className="icon">
                                        <Mapmarker />
                                    </span>
                                    {this.props.contact.address}
                                </li>
                            )}
                            <li>
                                {/* <SocialLinks /> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default function ContactPage() {
    return (
        <StaticQuery
            query={graphql`
            query {
                site {
                    siteMetadata {
                        contact {
                            api_url
                            description
                            mail
                            phone
                            address
                        }
                    }
                }
            }
        `}
            render={data => <Contact contact={data.site.siteMetadata.contact} />}
        />
    );
}
