import { GithubIcon } from './fa-icons';
import React from 'react'
import styles from './FooterComponent.module.css'

const Footer = () => {
    return (
        <div className={styles.footerClass}>
            <a href="https://github.com/h3addy" target="_blank" rel="noreferrer">Github Repo <GithubIcon /></a>
        </div>
    )
}

export default Footer

