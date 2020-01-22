import { createStore } from 'redux';


export interface ReduxState {
    factionCardsArray: JSX.Element[] | null
    errorMessage: string | null
};

const initialState: ReduxState = {
    factionCardsArray: null,
    errorMessage: null,
}

const SET_FACTION_CARDS_ARRAY = 'SET_FACTION_CARDS_ARRAY';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

interface SetFactionCardsArray {
    type: typeof SET_FACTION_CARDS_ARRAY
    payload: JSX.Element[]
}
interface SetErrorMessage {
    type: typeof SET_ERROR_MESSAGE
    payload: string
}

export function setFactionCardArray(array: JSX.Element[]): SetFactionCardsArray {
    return {
        type: SET_FACTION_CARDS_ARRAY,
        payload: array,
    };
};

export function setErrorMessage(message: string): SetErrorMessage {
    return {
        type: SET_ERROR_MESSAGE,
        payload: message,
    };
};

export type Action = SetFactionCardsArray | SetErrorMessage


export default function reducer(state = initialState, action: Action): ReduxState {
    switch (action.type) {
      case SET_ERROR_MESSAGE: return ({...state, errorMessage: action.payload});
      case SET_FACTION_CARDS_ARRAY: return ({...state, factionCardsArray: action.payload});
      default: return state;
    }
}

export const store = createStore(
    reducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)