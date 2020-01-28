import React, { useState } from 'react';
import { CorporationInfo } from '../corporationCard';
import PopUp from '../popup';
import { text } from '../../content';


interface CorporationLinkProps {
    corporation: CorporationInfo
}

const blockName: string = 'corporation-link';
const { types: { corporation } } = text;

const CorporationLink: React.FC<CorporationLinkProps> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { corporation: { name }  } = props;

    const handleClick = (event: React.MouseEvent):void => {
        event.stopPropagation();
        console.log(`open popup`)
        setIsOpen(true);
    }

    const handleClose = (event: React.MouseEvent): void => {
        event.stopPropagation();
        setIsOpen(false);
        console.log(`close popup` );
    }

    return (
        <>
            <p
                className={blockName}
                onClick={(event: React.MouseEvent) => handleClick(event)}
            >
                {name}
            </p>
            {isOpen &&  
                <PopUp
                    handleClose={handleClose}
                    initialType={corporation}
                    initialData={props.corporation}
                />}
        </>
    )
}

export default CorporationLink;