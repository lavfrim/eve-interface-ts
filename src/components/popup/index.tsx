import React, { useState } from 'react';
import { text } from '../../content';
import PopUpContent, { Data, ContentInfo } from '../popupContent';


interface PopUpProps {
    handleClose: Function
    initialType: string
    initialData: Data
}


const blockName = 'pop-up';
const { buttons: { backward, forward, close } } = text;


// add custon attribute
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      name?: string;
    }
}


const PopUp: React.FC<PopUpProps> = (props) => {
    const { handleClose, initialType, initialData } = props;

    const [backwardBuffer, setBackwardBuffer] = 
        useState<ContentInfo[]>([{type: initialType, data: initialData}]);
    const [forwardBuffer, setForwardBuffer] = 
        useState<ContentInfo[]>([]);


    const handleClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
    }

    const handleBackward = (event: React.MouseEvent): void => {
        event.stopPropagation();
        const newBackwardBuffer = backwardBuffer.slice();
        const newForwardBuffer = forwardBuffer.slice();
        if (backwardBuffer.length > 1) {
            newForwardBuffer.push(newBackwardBuffer[backwardBuffer.length - 1]);
            newBackwardBuffer.pop();
        }
        setBackwardBuffer(newBackwardBuffer);
        setForwardBuffer(newForwardBuffer);
    }

    const handleForward = (event: React.MouseEvent, newContentInfo?: ContentInfo): void => {
        event.stopPropagation();
        const newBackwardBuffer = backwardBuffer.slice();
        if (forwardBuffer.length === 0 && newContentInfo) {
            newBackwardBuffer.push(newContentInfo);
        } else if (forwardBuffer.length > 0) {
            newBackwardBuffer.push(forwardBuffer[forwardBuffer.length - 1]);
            forwardBuffer.pop();
        }
        setBackwardBuffer(newBackwardBuffer);
    }
  
    const renderContentInfo = backwardBuffer[backwardBuffer.length - 1];

    return (
        <div
            className={blockName}
            onClick={(event) => {handleClose(event)}}
        >
            <div
                className={`${blockName}__window`}
                onClick={(event) => {handleClick(event)}}
            >
                {backwardBuffer.length > 1 &&
                <button
                    className={`${blockName}__button-backward`}
                    onClick={(event) => {handleBackward(event)}}
                >
                    {backward}
                </button>}

                {forwardBuffer.length > 0 && 
                <button
                    className={`${blockName}__button-forward`}
                    onClick={(event) => {handleForward(event)}}
                >
                    {forward}
                </button>}
            
                <button
                    className={`${blockName}__button-close`}
                    onClick={(event) => {handleClose(event)}}
                >
                    {close}
                </button>

                <div
                    className={`${blockName}__content-container`}
                    onClick={(event) => {handleClick(event)}}
                >
                    <PopUpContent
                        contentInfo={renderContentInfo}
                        handleForward={handleForward}
                    />
                </div>
            </div>
        </div>
    )
}

export default PopUp;