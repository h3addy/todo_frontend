import React from 'react'
import styles from './Navbar.module.css'


const Navbar = (props) => {

    // const handleHamClick = () => {
    //     const navMenu = document.getElementById("nav-menu")
    //     const contains = navMenu.classList.contains("show")
    //     console.log(contains)
    //     if (contains) {
    //         navMenu.classList.remove("show")
    //     } else {
    //         navMenu.classList.add("show")
    //     }
    // }

    return (
        <nav className={styles.classNavBar}>
            <h1><a href="/">{props.children}</a></h1>
            <ul className={styles.classNavLinks}>
                <li><a href="/user-tasks">Task List</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </nav>
    )
}

export default Navbar

