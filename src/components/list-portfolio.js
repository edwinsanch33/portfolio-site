import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PortfolioItems from "./items-portfolio";

export default function PortfolioList() {
    const query = useStaticQuery(graphql`
        query portfolioList {
            allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/portfolio/" } }
                limit: 6
                sort: { frontmatter: { date: DESC } }
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            description
                            image {
                                publicURL
                                childImageSharp {
                                    fluid(maxWidth: 1920) {
                                        srcSet
                                        ...GatsbyImageSharpFluid
                                    }
                                    id
                                }
                            }
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    return (
        <section id="portfolio" className="container">
            <PortfolioItems data={query} />
        </section>
    );
}
