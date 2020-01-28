import React, { useState } from 'react';
import { text } from '../../content';
import { createURL } from '../../utils';
import axios from 'axios';
import CorporationLink from '../corporationLink';
import Loading from '../loading';
import { CorporationInfo } from '../corporationCard';

export interface FactionInfo {
    corporation_id: number
    description: string
    faction_id: number
    is_unique: boolean
    militia_corporation_id: number
    name: string
    size_factor: number
    solar_system_id: number
    station_count: number
    station_system_count: number
}

interface FactionCardProps {
    faction: FactionInfo
}

const blockName: string = 'faction-card';

const FactionCard: React.FC<FactionCardProps> = (props) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ system, setSystem ] = useState<string | null>(null);
    const [ corporation, setCorporation ] = useState<CorporationInfo | null>(null);

    const { faction: { name, solar_system_id, corporation_id, description } } = props;
    const { card } = text;
    
    const getSolarSystem = ():void => {
        if (system === null) {
            const url = createURL('universe/systems', { id: solar_system_id });
            axios.get(url)
                .then(response => {
                    const result = response.data;
                    setSystem(result.name);
                })                    
                .catch(err => window.console.log(err));
        }
    }

    const getCorporationInfo = ():void => {
        if (corporation === null) {
            const url = createURL('corporations', { id: corporation_id });
            axios.get(url)
                .then(response => {
                    const result = response.data;
                    setCorporation(result);
                })                    
                .catch(err => window.console.log(err));
        } 
    }

    const handleClick = ():void => {
        console.log(`toggle faction`)
        getSolarSystem();
        getCorporationInfo();
        setIsOpen(!isOpen);
    }

    return (
        <div
            className={blockName}
            onClick={() => handleClick()}
        >
            <p className={`${blockName}__name`}>{name}</p>
            {isOpen && 
                <>
                    <div className={`${blockName}__corp-link`}>
                        <p className={`${blockName}__corp-link-description`}>{card.corporationName}</p>
                        {corporation ? <CorporationLink corporation={corporation} /> : <Loading />}
                    </div>

                    <div className={`${blockName}__description`}>
                        <p className={`${blockName}__description-description`}>{card.description}</p>
                        {description}
                    </div>
                    
                    <div className={`${blockName}__solar-sys`}>
                        <p className={`${blockName}__solar-sys-description`}>{card.system}</p>
                        {system ? system : <Loading />}
                    </div>
                </>
            }
        </div>
    )
}

export default FactionCard;