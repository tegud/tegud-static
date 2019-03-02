import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { DateTime } from "luxon";

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import Tags from '../components/common/Tags'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const featureImageBackgroundImage = `url(${post.feature_image})`;
    const publishedAt = DateTime.fromISO(post.published_at).toFormat('dd MMMM yyyy');

    return (
            <>
                <MetaData
                    data={data}
                    location={location}
                    type="article"
                />
                <Layout>
                    <div className="container">
                        <article>
                            { post.feature_image ?
                                <figure className="post-feature-image" style={{ backgroundImage: featureImageBackgroundImage }} title={ post.title }></figure> : null }
                            <section className="content post-full-content">
                                <h1 className="content-title">{post.title}</h1>
                                <div className="post-date-and-tags">{publishedAt} <Tags post={post} /></div>

                                {/* The main post content */ }
                                <section
                                    className="content-body load-external-scripts"
                                    dangerouslySetInnerHTML={{ __html: post.html }}
                                />
                            </section>
                        </article>
                    </div>
                </Layout>
            </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
