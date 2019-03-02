import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import _ from 'lodash'

const CardTags = ({ post }) => {
  const { tags, id } = post;

  if (!tags.length) {
    return <span />;
  }

  // return <span>on <Tags post={post} visibility="public" autolink={false} /></span>;
  return <span> on {tags.map(({ name, slug }, i) => {
      const key = `${id}-tag-${slug}`;
      const link = `/tag/${slug}`;
      const separator = i+1 !== tags.length ? ', ' : <></>;

      return <>
        <Link key={key} to={link}>{name}</Link>{separator}
      </>;
    })}
  </span>;
}

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`;
    const excerpt = _.truncate(post.excerpt, {
      length: 150,
      separator: /,?\.* +/,
    });

    return (
        <article className="content post">
          <Link to={url} className="post-card-title">
            <h2 className="post-title">{post.title}</h2>
          </Link>
          <section className="post-card-excerpt">{excerpt} <Link className="read-more" to={url}>»</Link></section>
          <footer className="post-meta">
              {post.primary_author.profile_image ?
                  <img className="author-thumb" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
                  <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
              }
              <span>{ post.primary_author.name }</span> <CardTags post={post} />

          </footer>
        </article>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
