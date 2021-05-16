import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
const Header = () => {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState(null);

    const Search = async (search) => {
        const response = await fetch(`https://cdn.contentful.com/spaces/vbmihum32kfk/environments/master/entries?access_token=caXHRNhnYPw2HeFYLckhsEeflYg1L7qr-6ZuKjMydY0&content_type=blogPost&fields.title[match]=${search}`);
        const result = await response.json();
        setResult(result);
        console.log(result)
    }
    return (
        <header className="top_navbar">
            <Link to="/" className="site_title">Frontendika</Link>
            <div className={`header_search${display}`}>
                <input type="text" placeholder="Поиск по сайту" className="search_input" onChange={e => { setDisplay(' active'); Search(e.target.value) }} onFocus={() => { setDisplay(' active'); }}></input>
                {display === ' active' && result !== null && (
                    <div className='header_results'>
                        {result?.items.map((res, key) => (
                            <Link to={`/post/${res?.fields.slug}`} className="site_title" onClick={() => setDisplay('')}>
                                <div key={key} className="search_result">
                                    <p className="result_title">{res?.fields.title}</p>
                                    <p className="result_description">{res?.fields.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <nav className="top_nav">
                <Link to="/category/react">#react</Link>
                <Link to="/category/gatsby">#gatsby</Link>
                <Link to="/category/vue">#vue</Link>
                <Link to="/category/graphql">#graphql</Link>
                <Link to="/contact">#написать_мне</Link>
            </nav>
            {display === ' active' && (<div onClick={() => setDisplay('')} className="container_popup"></div>)}
        </header >
    )
}

export default Header
