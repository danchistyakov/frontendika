import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
const Header = () => {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState(null);

    const Search = async (search) => {
        const response = await fetch(`https://api.buttercms.com/v2/search/?query=${search}&auth_token=190894285463021ec08a094fd530cfdc14485c46`);
        const result = await response.json();
        setResult(result);
        console.log(result);
    }
    return (
        <header className="top_navbar">
            <Link to="/" className="site_title">Frontendika</Link>
            <div>
                <div className={`header_search${display}`}>
                    <input type="text" placeholder="Поиск по сайту" className="search_input" onChange={e => { setDisplay(' active'); Search(e.target.value) }} onFocus={() => { setDisplay(' active'); }}></input>
                </div>
                {display === ' active' && result !== null && (
                    <div className='header_results'>
                        {result?.data?.map((res, key) => (
                            <Link to={`/post/${res?.url}`} className="site_title" onClick={() => setDisplay('')}>
                                <div key={key} className="search_result">
                                    <p className="result_title">{res?.title}</p>
                                    <p className="result_description">{res?.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                )}
            </div>
            <nav className="top_nav">
                <Link to="/category/react">#react</Link>
                <Link to="/category/javascript">#javascript</Link>
                <Link to="/category/html">#html</Link>
                <Link to="/category/css">#css</Link>
                <Link to="/contact">#написать_мне</Link>
            </nav>
            {display === ' active' && (<div onClick={() => setDisplay('')} className="container_popup"></div>)}
        </header >
    )
}

export default Header
