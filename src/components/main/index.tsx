import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ReduxState, setErrorMessage, setFactionCardArray } from '../../redux';
import { createURL, getAmountCards, ElementsWidth } from '../../utils';
import { text } from '../../content';
import Loading from '../loading';
import Carousel from '../carousel';
import FactionCard, { FactionInfo } from '../factionCard';

interface MainProps {
    messageToState: Function
    factionCardsArray: JSX.Element[] | null
    arrayComponentstoState: Function
}

const mapStateToProps = (state: ReduxState) => ({
    factionCardsArray: state.factionCardsArray
});

const mapDispatchToProps = (dispatch: Function) => ({
    messageToState: (msg: string) => dispatch(setErrorMessage(msg)),
    arrayComponentstoState: (array: JSX.Element[]) => dispatch(setFactionCardArray(array))
});

const blockName: string = 'main';
const elementsWidth: ElementsWidth = {
    majorSectorWidth: 640,
    asideWidth: 200,
    cardWidth: 300
};


const Main: React.FC<MainProps> = (props) => {
    const [amountCards, setAmountCards] = useState<number>(getAmountCards(elementsWidth));

    const {
        messageToState, 
        factionCardsArray,
        arrayComponentstoState,
    } = props;
    const { factions } = text;

    let timeoutID: ReturnType<typeof setTimeout>;
    const resizehandler = (): void => {

        clearTimeout(timeoutID);

        timeoutID = setTimeout(
            () => setAmountCards(getAmountCards(elementsWidth)),
            600
        )
    }

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
                            (faction: FactionInfo) => 
                            <FactionCard key={faction.faction_id} faction={faction} />
                        );
                        arrayComponentstoState(fractionsComponentArray);
                    }
            });
        }

        window.removeEventListener("resize", resizehandler);
        window.addEventListener("resize", resizehandler);
    });


    return (
        <main className={blockName}>
            <aside className={`${blockName}__side-left`}></aside>
            <section className={`${blockName}__major-section`}>
                {factionCardsArray?
                <Carousel
                    name={factions}
                    perentClassName={`${blockName}__major-section`}
                    factionCardsArray={factionCardsArray}
                    amountCards={amountCards}
                /> :
                <Loading />}
            </section>
            <aside className={`${blockName}__side-right`}></aside>
        </main>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
