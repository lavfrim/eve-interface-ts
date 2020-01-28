import React, { useState, useEffect } from 'react';
import { text } from '../../content';
import Loading from '../loading';
import axios from 'axios';
import { createURL } from '../../utils';
import { CeoInfo } from '../ceoCard';


export interface CorporationInfo {
    ceo_id: number
    creator_id: number
    description: string
    home_station_id: number
    member_count: number
    name: string
    shares: number
    tax_rate: number
    ticker: string
}


interface CorporationCardProps {
    corporation: CorporationInfo
    handleForward: Function
}

const blockName: string = 'corporation-card';
const { card, types: { ceo } } = text;


const CorporationCard: React.FC<CorporationCardProps> = (props) => {
    const { 
        corporation: { name, member_count, description, ceo_id },
        handleForward,
     } = props;

    const [ceoInfo, setCeoInfo] = useState<CeoInfo | null>(null);

    useEffect(() => {
        if (ceoInfo === null) {
            const url = createURL('characters', { id: ceo_id});
            axios.get(url)
                .then(response => {
                    const result = response.data;
                    setCeoInfo(result);
            });
        }
    });

    const handleClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        handleForward(event, {type: ceo, data: ceoInfo});
    }

    return (
        <>
            <div className={`${blockName}__name`}>
                <p className={`${blockName}__name-description`}>{card.corporationName}</p>
                {name}
            </div>

            <div className={`${blockName}__ceo-link`}>
                <p className={`${blockName}__ceo-link-description`}>{card.ceoName}</p>
                {ceoInfo ?
                <div
                    className={`${blockName}__ceo-link-link`}
                    onClick={(event: React.MouseEvent) => handleClick(event)}
                >
                    {ceoInfo.name}
                </div> :
                <Loading />}
            </div>

            <div className={`${blockName}__members-count`}>
                <p className={`${blockName}__members-count-description`}>{card.memberCount}</p>
                {member_count}
            </div>

            <div className={`${blockName}__description`}>
                <p className={`${blockName}__description-description`}>{card.description}</p>
                {description}
            </div>
        </>
    )
}

export default CorporationCard;