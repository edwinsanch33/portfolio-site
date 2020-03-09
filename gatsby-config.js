let siteMetadata = {
    title: `Edwin Sanchez`,
    capitalizeTitleOnHome: true,
    logo: `/images/logo.png`,
    icon: `/images/icon.png`,
    titleImage: `/images/buzz.jpg`,
    introTag: `Full Stack Web Developer`,
    description: `Full Stack Developer with a background in Hospitality Management. New focus on Development of  mobile first web applications and mobile applications. Currently with (Game Point Performance)[https://gamepointperformance.com/] on a part time basis. I'm looking to become part of a great team to make great products with new skills in front/back end web development.`,
    author: `@_akzhy`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/"
        },
        {
            name: "ABOUT",
            url: "/about"
        },
        // {
        //     name: "BLOG",
        //     url: "/blog"
        // },
        {
            name: "PORTFOLIO",
            url: "/portfolio"
        },
        {
            name: "CONTACT",
            url: "/contact"
        }
    ],
    footerLinks: [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/edwinsanchez33/"
        },
        {
            name: "GitHub",
            url: "https://github.com/edwinsanch33"
        }
    ],
    social: [
        {
            name: "LinkedIn",
            icon: "/images/Linkedin.svg",
            url: "#"
        },
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "#"
        },
        {
            name: "Twitter",
            icon: "/images/Twitter.svg",
            url: "#"
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "#"
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "#"
        }
    ],
    contact: {
        /* Leave the below value completely empty (no space either) if you don't want a contact form. */
        api_url: "",
        description: `Please feel free to contact me for any collaborations, interviews, or inquiries.`,
        mail: "edwinsanch33@gmail.com",
        phone: "954-464-7285",
        address: "Fort Lauderdale, FL"
    }
};

module.exports = {
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    "gatsby-remark-copy-linked-files",
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1280
                        }
                    }
                ]
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `contents`,
                path: `${__dirname}/contents/`
            }
        },
        {
            resolve: `gatsby-plugin-less`,
            options: {
                strictMath: true
            }
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
              id: "UA-157756738-1",
              includeInDevelopment: false,
              defaultDataLayer: { platform: "gatsby" },
            },
        }, 
    ]
};
