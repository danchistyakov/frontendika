import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import dateFormat from 'dateformat';
import { DiscussionEmbed } from 'disqus-react';
import { Helmet } from 'react-helmet-async';
import Prism from "prismjs";
import "./CSS/prism.css";
import './CSS/Post.sass';

const Post = () => {
    const { slug } = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://api.buttercms.com/v2/posts/${slug}/?auth_token=190894285463021ec08a094fd530cfdc14485c46`);
            const result = await response.json();
            setContent(result);
        }
        Fetch();

    }, [slug])

    setTimeout(() => Prism?.highlightAll(), 0);

    return (
        <section>
            <Helmet>
                <title>{`${content?.data.title} | Frontendika`}</title>
            </Helmet>
            <div style={{ backgroundImage: `url(${content?.data.featured_image})` }} className='post_hero'>
                <h1 className='post_title'>{content?.data.title}</h1>
                <p className='post_date'>{dateFormat(content?.data.published, "mmmm d, yyyy")}</p>
            </div>
            <section className='post_content'>
                <div dangerouslySetInnerHTML={{ __html: content?.data.body }}></div>
            </section>
            <div className='posts_nav'>
                {content?.meta?.previous_post !== null && (<Link className='posts_between' to={`/post/${content?.meta?.previous_post?.slug}`}>← {content?.meta?.previous_post?.title.slice(0, 10)}...</Link>)}
                {content?.meta?.next_post !== null && (<Link className='posts_between' to={`/post/${content?.meta?.next_post?.slug}`}>{content?.meta?.next_post?.title.slice(0, 10)}... →</Link>)}
            </div>
            <section className='comments'>
                <DiscussionEmbed
                    shortname='react-developer'
                    config={
                        {
                            url: `https://react-developer.vercel.app/post/${slug}/`,
                            identifier: content?.data.slug,
                            title: content?.data.title,
                            language: 'ru'
                        }
                    }
                />
            </section>
        </section>
    )
}

export default Post
