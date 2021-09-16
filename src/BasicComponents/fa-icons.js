import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEnvelope, faHamburger, faAngleDown, faHome } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';


export const HamMenuIcon = () => {
    return <FontAwesomeIcon icon={faHamburger}  color={"black"} size={"2x"} />
}

export const NinetyHamMenuIcon = () => {
    return <FontAwesomeIcon icon={faHamburger}  color={"black"} size={"2x"} rotation={90} />
}

export const MailMeIcon = () =>{
    return <FontAwesomeIcon icon={faEnvelope}  color={"black"} size={"2x"}/>
}

export const RightAngleArrowIcon = () => {
    return <FontAwesomeIcon icon={faAngleRight} className={"rgt-ang-ic"}/>
}

export const DownAngleArrowIcon = () => {
    return <FontAwesomeIcon icon={faAngleDown} className={"down-ang-ic"}/>
}

export const GithubIcon = () => {
    return <FontAwesomeIcon icon={faGithub}  color={"black"} size={"1x"}/>
}

export const TwitterIcon = () =>{
    return <FontAwesomeIcon icon={faTwitter}  color={"black"} size={"4x"}/>
}

export const InstagramIcon = () =>{
    return <FontAwesomeIcon icon={faInstagram}  color={"black"} size={"4x"}/>
}

export const BackHomeIcon = () =>{
    return <FontAwesomeIcon icon={faHome}  color={"black"} size={"lg"}/>
}

