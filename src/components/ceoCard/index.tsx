import React, { useState, useEffect } from 'react';
import { text } from '../../content';
import Loading from '../loading';
import axios from 'axios';
import { createURL } from '../../utils';


export interface CeoInfo {
    birthday: string
    bloodline_id: number
    corporation_id: number
    description: string
    gender: string
    name: string
    race_id: number
    security_status: number
}


interface CeoInfoProps {
    ceo: CeoInfo
    handleForward: Function
}

const blockName: string = 'ceo-card';
const { card } = text;


const CeoCard: React.FC<CeoInfoProps> = (props) => {
    const { ceo: { name, birthday, race_id } } = props;

    const [race, setRace] = useState<string | null>(null);

    const fullDate: Date = new Date(birthday);

    useEffect(() => {
        if (race === null) {
            const url = createURL('universe/races');
            axios.get(url)
                .then(response => {
                    const result = response.data;
                    for (let i = 0; i < result.length; i += 1) {
                        if (result[i].race_id === race_id) {
                            setRace(result[i].name);
                            break;
                        } 
                    }
            });
        }
    });

    return (
        <>
            <div className={`${blockName}__name`}>
                <p className={`${blockName}__name-description`}>{card.ceoName}</p>
                {name}
            </div>

            <div className={`${blockName}__birthday`}>
                <p className={`${blockName}__birthday-description`}>{card.birthday}</p>
                {fullDate.toLocaleString()}
            </div>

            <div className={`${blockName}__race`}>
                <p className={`${blockName}__race-description`}>{card.race}</p>
                {race ?
                <div className={`${blockName}__ceo-link-link`}>
                    {race}
                </div> :
                <Loading />}
            </div>
        </>
    )
}

export default CeoCard;