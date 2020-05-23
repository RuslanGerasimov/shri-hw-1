import React from "react";
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Footer.css';
import './Footer-Content.css';
import './Footer-Item.css';
import './Footer-Item_copyright.css';
import './Footer-Links.css';
import './Footer-Links_copyright.css';

export interface FooterProps {
    mix?: string,
    links: Array<{id: string|number, text: string, onClick?: () => void}>,
    copyright?: string
}

const Footer: React.FC<FooterProps> = (props) => {
    const footerClass = cn('Footer');
    const footerContentClass = cn('Footer', 'Content');
    const footerLinksClass = cn('Footer', 'Links');
    const footerItemClass = cn('Footer', 'Item');
    const footerCopyrightLinksClass = footerLinksClass({ copyright: true });

    const resultedBlockClass = classnames(footerClass(), props.mix);

    return (
        <div className={resultedBlockClass}>
            <div className={footerContentClass()}>
                <div className={footerLinksClass()}>
                    { props.links && Array.isArray(props.links) ?
                        props.links.map((item, index) => <div onClick={item.onClick ? item.onClick : () => {}} key={item.id ? item.id : index} className={footerItemClass()}>{item.text}</div>)
                        : null }
                </div>
                <div className={footerCopyrightLinksClass}>
                    <div className={footerItemClass({copyright: true})}>
                        {props.copyright ? props.copyright : "© 2020 Your Name"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;