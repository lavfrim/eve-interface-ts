import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../loading';
import { ReduxState, setMessage, setArrayComponents } from '../../redux';

interface MainProps {
    message: string | null
    messageToState: Function
    arrayComponents: JSX.Element[] | null
    arrayComponentstoState: Function
}

interface SimplProps {
    msg: string
}

const mapStateToProps = (state: ReduxState) => ({
    message: state.message,
    arrayComponents: state.arrayComponents
});

const mapDispatchToProps = (dispatch: Function) => ({
    messageToState: (msg: string) => dispatch(setMessage(msg)),
    arrayComponentstoState: (array: JSX.Element[]) => dispatch(setArrayComponents(array))
});

const SimplComponent: React.FC<SimplProps> = (props) => (
    <p>{props.msg}</p>
)

const Main: React.FC<MainProps> = (props) => {
    const {
        message,
        messageToState,
        arrayComponents,
        arrayComponentstoState,
    } = props;

        useEffect(() => {
        if (message === null) {
            setTimeout(() => {
                console.log('after set timeout');
                messageToState('message after set timeout');
                const componentArray: JSX.Element[] = [
                    <SimplComponent msg={'Component 0'} key={1}/>,
                    <SimplComponent msg={'Component 1'} key={2}/>,
                    <SimplComponent msg={'Component 2'} key={3}/>
                ];
                arrayComponentstoState(componentArray);
            }, 2000);
        }
    });


    return (
        <>
            {message ? <p>{message}</p> : <Loading />}
            {arrayComponents?
                arrayComponents.map((component: JSX.Element) => {
                    return component;
                }) :
                <Loading />}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);







// const getFactions = (props: PropsMain) => {
//     const { setMessage, setFractionsCards } = props;
//     const url = createURL('universe/fractions');
//     axios.get(url)
//         .then(response => {
//             const result = response.data;
//             // if (result.error) {
//             //     setMessage(result.error);
//             // } else {
//             //     const fractionsComponentArray = result.map(
//             //         (faction: {[index: string]: number | string}) => 
//             //         <FactionCard key={faction.faction_id} faction={faction} />
//             //     );
//             //     setFractionsCards(fractionsComponentArray);
//             // }
//             console.log(result);
//     })
// }
