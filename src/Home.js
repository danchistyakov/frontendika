import { useState, useEffect } from "react";
import dateFormat from 'dateformat';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import style from './CSS/Home.module.sass'
const query = `
{
  blogPostCollection (preview: false) {
    items {
      title
      description
      publishDate
      slug
      heroImage {
        url
      }
      sys {
        id
      }
      tags
    }
  }
}
`;

const Home = () => {
    const [list, setList] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/vbmihum32kfk/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer caXHRNhnYPw2HeFYLckhsEeflYg1L7qr-6ZuKjMydY0",
                },
                body: JSON.stringify({ query }),
            })
            const result = await response.json();
            setList(result?.data.blogPostCollection.items);
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
                        <Link to={{ pathname: `/post/${res?.slug}`, query: res?.sys.id }}>
                            <div className={style.poster} style={{ backgroundImage: `url(${res?.heroImage.url})` }}>
                            </div>
                            <div className={style.post_content}>
                                <h2 className={style.post_title}>{res?.title}</h2>
                                <p className={style.post_date}>{dateFormat(list?.res?.publishDate, "mmmm d, yyyy")}</p>
                                <p className={style.post_description}>{res?.description}</p>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Home;
