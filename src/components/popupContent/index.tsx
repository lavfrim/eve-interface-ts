import React from 'react';
import { text } from '../../content';
import CorporationCard, { CorporationInfo } from '../corporationCard';
import CeoCard, { CeoInfo } from '../ceoCard';


interface PopUpContentProps {
    contentInfo: ContentInfo
    handleForward: Function
}

export type Data = CorporationInfo | CeoInfo | any

export interface ContentInfo {
    type: string
    data: Data
}

const { types: { corporation, ceo }} = text;
let mainStack: JSX.Element[] = [];

const PopUpContent: React.FC<PopUpContentProps> = (props) => {
    const { contentInfo } = props;
    let component: JSX.Element | null = null;

    switch (contentInfo.type) {
        case corporation:
            component = <CorporationCard
                            corporation={contentInfo.data}
                            handleForward={props.handleForward}
                        />;
            break;
        case ceo:
            component = <CeoCard
                            ceo={contentInfo.data}
                            handleForward={props.handleForward}
                        />
            break;
        default: break;
    }

    if (component) {
        mainStack.push();
    }
    
    return (
        <>
            {component}
        </>
    )
}

export default PopUpContent;