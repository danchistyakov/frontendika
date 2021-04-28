import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import dateFormat from 'dateformat';
import { DiscussionEmbed } from 'disqus-react';
import style from './CSS/Post.module.sass';

const Post = () => {
    const { slug } = useParams();
    const [poster, setPoster] = useState(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`http://cdn.contentful.com/spaces/vbmihum32kfk/environments/master/entries?access_token=caXHRNhnYPw2HeFYLckhsEeflYg1L7qr-6ZuKjMydY0&content_type=blogPost&fields.slug=${slug}`);
            const result = await response.json();
            //console.log(result);
            setContent(result.items[0]);
            setPoster(result?.includes.Asset[0].fields.file.url)
        }
        Fetch();
    }, [slug])
    return (
        <section>
            <div style={{ backgroundImage: `url(${poster})` }} className={style.post_hero}>
                <h1 className={style.post_title}>{content?.fields.title}</h1>
                <p className={style.post_date}>{dateFormat(content?.fields.publishDate, "mmmm d, yyyy")}</p>
            </div>
            <section className={style.post_content}>
                <p>{content?.fields.body}</p>
            </section>
            <section className={style.comments}>
                <DiscussionEmbed
                    shortname='react-developer'
                    config={
                        {
                            url: `https://react-developer.vercel.app/post/${slug}/`,
                            identifier: content?.sys.id,
                            title: content?.fields.title,
                            language: 'ru'
                        }
                    }
                />
            </section>
        </section >
    )
}

export default Post
