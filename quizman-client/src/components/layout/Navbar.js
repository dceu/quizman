import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Navbar({ title, icon }) {
    return (
        <div className="App-header">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li className="App-link">
                    <Link to='/'>Home</Link>
                </li>
                <li className="App-link">
                    <Link to='/about'>About</Link>
                </li>
            </ul>

        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,

}

Navbar.defaultProps = {
    title: 'QuizMan',
    icon: 'fas fa-brain'
}

export default Navbar
