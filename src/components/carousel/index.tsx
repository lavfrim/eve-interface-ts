import React, { useState } from 'react';
import { text } from '../../content';

interface CarouselProps {
    factionCardsArray: JSX.Element[]
    amountCards: number
    perentClassName?: string
    name: string
}

const blockClassName = 'carousel';
const backwardType: string = 'backward';
const forwardType: string = 'forward';

type ButtonType = typeof backwardType | typeof forwardType

const Carousel: React.FC<CarouselProps> = (props) => {
    const [start, setStart] = useState<number>(0);

    const { factionCardsArray, amountCards, perentClassName, name } = props;
    const { buttons: { forward, backward } } = text;

    const blockName: string = perentClassName ?
        `${perentClassName}__${blockClassName}` :
        blockClassName;
    const end: number = factionCardsArray.length - 1;
    
    const handleClick = (type: ButtonType): void => {
        switch (type) {
            case backwardType:
                if (start > 0) {
                    setStart(start - amountCards < 0 ? 0 : start - amountCards);
                } else {
                    setStart(end - amountCards);
                }
                break;
            case forwardType:
                if (start + amountCards < end) {
                    setStart(start + amountCards);
                } else {
                    setStart(0);
                }
                break;
            default: break;
        }
    }

    return (
        <section className={blockName}>
            <button 
                className={`${blockName}__button-backward`}
                onClick={() => handleClick(backwardType)}
            >
                {backward}
            </button>

            <p className={`${blockName}__name`}>{name}</p>

            <button
                className={`${blockName}__button-forward`}
                onClick={() => handleClick(forwardType)}
            >
                {forward}
            </button>

            <div className={`${blockName}__content`}>
                {factionCardsArray.length &&
                        factionCardsArray
                            .slice(start, start + amountCards)
                            .map(fractionComponent => {
                            return fractionComponent;
                        })}
            </div>
        </section>
    )
}

export default Carousel;