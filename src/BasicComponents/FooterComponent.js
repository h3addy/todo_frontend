import { GithubIcon } from './fa-icons';
import React from 'react'
import styles from './FooterComponent.module.css'

const Footer = () => {
    return (
        <div className={styles.footerClass}>
            Github Repo <a href="https://www.github.com" target="_blank" rel="noreferrer"><GithubIcon /></a>
        </div>
    )
}

export default Footer

