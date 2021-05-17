import { useState, useEffect } from "react";
import dateFormat from 'dateformat';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import './CSS/Category.sass';

const Category = () => {
    const { category } = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://api.buttercms.com/v2/tags/${category}/?include=recent_posts&auth_token=190894285463021ec08a094fd530cfdc14485c46`)
            const result = await response.json();
            console.log(result?.data?.recent_posts);
            setContent(result?.data?.recent_posts)
        }
        Fetch();
    }, [category])
    return (
        <div>
            <Helmet>
                <title>{category} на Frontendika</title>
            </Helmet>
            {content?.length > 0 && (<p className="section_title">Новые статьи</p>)}
            {content?.length === undefined && (<p className="section_title">Не нашлось ни одной статьи</p>)}
            <div className='posts_feed'>
                {content?.map((res, key) => (
                    <article key={key} className='post'>
                        <Link to={{ pathname: `/post/${res?.url}`, query: res?.slug }}>
                            <div className='poster' style={{ backgroundImage: `url(${res?.featured_image})` }}>
                            </div>
                            <div className='post_content'>
                                <h2 className='post_title'>{res?.title}</h2>
                                <p className='post_date'>{dateFormat(res?.published, "mmmm d, yyyy")}</p>
                                <p className='post_description'>{res?.summary}</p>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Category
