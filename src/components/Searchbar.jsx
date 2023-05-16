import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

function Searchbar() {
    const navigate = useNavigate();
    const [ searchTerm, setSearchTerm ] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        navigate(`/search/${ searchTerm }`)
    }
    return (
        <form className="p-2 text-gray-400 mb-4" autoComplete="off" onSubmit={ handleSubmit }>
            <label htmlFor="search" className="sr-only">Search song</label>
            <div className="flex flex-row justify-center items-center">
                <input 
                    name="search"
                    autoComplete="off"
                    className="text-base text-white bg-transparent p-2 rounded-xl w-32 sm:w-60" 
                    type="text" 
                    id="search" 
                    placeholder="Type here" 
                    value={ searchTerm } 
                    onChange={ (event) => setSearchTerm(event.target.value) }
                />
                <FiSearch className="w-5 h-5 ml-4 mr-4" />
            </div>
        </form>
    )
}

export default Searchbar;