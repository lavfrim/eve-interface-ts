import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ReduxState, setErrorMessage, setFactionCardArray } from '../../redux';
import { createURL } from '../../utils';
import Loading from '../loading';

interface MainProps {
    messageToState: Function
    factionCardsArray: JSX.Element[] | null
    arrayComponentstoState: Function
}

interface Factioninfo {
    [index: string]: number | string
}

const mapStateToProps = (state: ReduxState) => ({
    factionCardsArray: state.factionCardsArray
});

const mapDispatchToProps = (dispatch: Function) => ({
    messageToState: (msg: string) => dispatch(setErrorMessage(msg)),
    arrayComponentstoState: (array: JSX.Element[]) => dispatch(setFactionCardArray(array))
});

const Main: React.FC<MainProps> = (props) => {
    const {
        messageToState,
        factionCardsArray,
        arrayComponentstoState,
    } = props;

    useEffect(() => {
        if (factionCardsArray === null) {
            const url = createURL('universe/fractions');
            axios.get(url)
                .then(response => {
                    const result = response.data;
                    if (result.error) {
                        messageToState(result.error);
                    } else {
                        const fractionsComponentArray = result.map(
                            (faction: Factioninfo) => 
                            // <FactionCard key={faction.faction_id} faction={faction} />
                            <p key={faction.faction_id}>{`${faction.name}`}</p>
                        );
                        arrayComponentstoState(fractionsComponentArray);
                    }
                    console.log(result);
            })
        }
    });


    return (
        <>
            {factionCardsArray?
                factionCardsArray.map((component: JSX.Element) => {
                    return component;
                }) :
                <Loading />}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
