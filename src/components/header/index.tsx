import React from 'react';
import { connect } from 'react-redux';
import { text } from '../../content';
import { ReduxState } from '../../redux';

const blockName: string = 'header';
interface HeaderProps {
  errorMessage: string | null
}

const mapStateToProps = (state: ReduxState) => ({
  errorMessage: state.errorMessage
})

const Header: React.FC<HeaderProps> = (props) => {
  const { errorMessage } = props;
  const { app: { name, description } } = text;

  return (
    <header className={blockName}>
        <div className={`${blockName}__app-name`}>
          <p className={`${blockName}__app-name__name`}>{name}</p>
          <p className={`${blockName}__app-name__description`}>{description}</p>
        </div>
        {errorMessage && <p className={`${blockName}__error-message`}>{errorMessage}</p>}
    </header>
  );
};

export default connect(mapStateToProps)(Header);
