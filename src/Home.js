import { useState, useEffect } from "react";
import dateFormat from 'dateformat';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import style from './CSS/Home.module.sass'

const Home = () => {
    const [list, setList] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://api.buttercms.com/v2/posts/?auth_token=190894285463021ec08a094fd530cfdc14485c46`)
            const result = await response.json();
            setList(result?.data);
        }
        Fetch();
    }, []);

    return (
        <section>
            <Helmet>
                <title>Frontendika — инструкции React, Vue, GraphQL</title>
            </Helmet>
            {list?.length > 0 && (<p className="section_title">Новые статьи</p>)}
            {list?.length < 0 && (<p className="section_title">Произошла ошибка!</p>)}
            <div className={style.posts_feed}>
                {list?.map((res, key) => (
                    <article key={key} className={style.post}>
                        <Link to={{ pathname: `/post/${res?.slug}`, query: res?.slug }}>
                            <div className={style.poster} style={{ backgroundImage: `url(${res?.featured_image})` }}>
                            </div>
                            <div className={style.post_content}>
                                <h2 className={style.post_title}>{res?.title}</h2>
                                <p className={style.post_date}>{dateFormat(list?.published, "mmmm d, yyyy")}</p>
                                <p className={style.post_description}>{res?.summary}</p>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Home;
