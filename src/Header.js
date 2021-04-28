import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
const Header = () => {
    const Search = async (search) => {
        const response = await fetch(`https://cdn.contentful.com/spaces/vbmihum32kfk/environments/master/entries?access_token=caXHRNhnYPw2HeFYLckhsEeflYg1L7qr-6ZuKjMydY0&content_type=blogPost&fields.title[match]=${search}`);
        const result = await response.json();
        console.log(result)
    }
    return (
        <header className="top_navbar">
            <Link to="/" className="site_title">Frontendika</Link>
            <input type="text" placeholder="Поиск по сайту" className="header_search" onChange={e => { Search(e.target.value) }}></input>
            <nav className="top_nav">
                <Link to="/category/react">#react</Link>
                <Link to="/category/gatsby">#gatsby</Link>
                <Link to="/category/vue">#vue</Link>
                <Link to="/category/graphql">#graphql</Link>
                <Link to="/contact">#написать_мне</Link>
            </nav>
        </header>
    )
}

export default Header
