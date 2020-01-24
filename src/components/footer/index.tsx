import React from 'react';
import { text } from '../../content';

interface FooterProps {

}

const blockName: string = 'footer';

const Footer: React.FC<FooterProps> = () => {
    const { app: { autor: { name }}, footer: { created } } = text

    return (
        <footer className={blockName}>
            <p className={`${blockName}__container`}>
                <span>{created}</span>
                <span className={`${blockName}__container__name`}>{name}</span>
            </p>
        </footer>
    )
}

export default Footer;