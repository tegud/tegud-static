import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/site.css'

/**
* Main layout component
*
* The Layout component wraps around each page and tmeplate.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
    <>
        <Helmet>
            <html lang={site.lang} />
            <body className={bodyClass} />
        </Helmet>

        <div class="nav-bar title-font">
          <div class="nav-bar-inner">
            <ul class="social-buttons">
          <li><a href="https://www.w88wasia.com/default.aspx?affiliateid=42353" target="_blank" class="fas fa-arrow-right"></a></li>
              <li><a href="https://bit.ly/w88vietnamfc" target="_blank" class="fas fa-hand-holding-usd"></a></li>
              <li><a href="https://affiliate.w88wap.com/Track.aspx?affiliateid=42353&language=vn" target="_blank" class="fas fa-usd-circle"></a></li>
            </ul>
            <a href="https://www.w88-yes.com"><h1>w88-yes.com</h1></a>
          </div>
        </div>

        <div>
          {children}
        </div>

        <footer class="site-footer clearfix">
            <section class="copyright"><a href="https://www.w88-yes.com">w88-yes.com</a> &copy; 2019</section>
        </footer>
    </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
