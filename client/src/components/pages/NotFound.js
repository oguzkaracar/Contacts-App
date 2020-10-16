import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='container'>
            <h1>404 - Not Found!</h1>
            <p className="lead">The page you are looking for does not exist...</p>
            <Link to='/' >Go to Home</Link>
        </div>
    )
}

export default NotFound;
