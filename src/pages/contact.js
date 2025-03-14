import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Contact from "../components/contact";

export default function ContactPage() {
    return (
        <Layout>
            <Seo lang="en" title="Contact" />
            <div style={{ minHeight: "600px" }}>
                <Contact />
            </div>
        </Layout>
    );
}
