import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import Card from './Card'
import axios from "axios"

let api_key = "&api_key=79a6b205af84174721ee4f370da68fa3"
let base_url = "https://api.themoviedb.org/3"
let url = base_url + "/discover/movie?sort_by=popularity.desc" + api_key;
let arr = ["Popular", "theatre", "Kids", "Drama", "Comedie"];

const Main = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(url).then((res) => {
            setData(res.data.results)
        })
    }, [url_set])

    const getData = (movieType) => {
        if (movieType === "Popular") {
            url = base_url + "/discover/movie?sort_by=popularity.desc" + api_key;
        }
        if (movieType === "theatre") {
            url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + api_key;
        }
        if (movieType === "Kids") {
            url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + api_key;
        }
        if (movieType === "Drama") {
            url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + api_key;
        }
        if (movieType === "Comedie") {
            url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + api_key;
        }
        setUrl(url);
    }

    const searchMovie = (action) => {
        if (action.key === "Enter") {
            url = base_url + "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" + search;
            setUrl(url);
            setSearch("");
        }
    }

    return (
        <>
            <div className='header'>
                <nav>
                    <ul>
                        {arr.map((value) =>
                            <li><a href='#' name={value} onClick={(e) => getData(e.target.name)}>{value}</a></li>)}
                    </ul>
                </nav>
                <form>
                    <div className='search-btn'>
                        <input type='text' placeholder='Enter Movie Name' className='inputText' value={search}
                            onChange={(e) => setSearch(e.target.value)} onKeyPress={searchMovie} />
                        <FaSearch className='icon' />
                    </div>
                </form>
            </div>
            <div className='container'>
                {movieData.length === 0 ? (<p className='notfound'></p>
                ) : (
                    movieData.map((res) => <Card info={res} key={res.id} />)
                )}
            </div>
        </>
    )
}

export default Main