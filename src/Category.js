import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

const Category = () => {
    const { category } = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`http://cdn.contentful.com/spaces/vbmihum32kfk/environments/master/tags/${category}?access_token=caXHRNhnYPw2HeFYLckhsEeflYg1L7qr-6ZuKjMydY0`)
            const result = await response.json();
            console.log(result);
            setContent(result)
        }
        Fetch();
    }, [])
    return (
        <div>
            <Helmet>
                <title>{category} на Frontendika</title>
            </Helmet>
            {content?.name === category ? (<p className="section_title">Тег: {content?.name}</p>) :
                (<p className="section_title">Такого тега не существует</p>)}
        </div>
    )
}

export default Category
