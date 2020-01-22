import React from 'react';
import { connect } from 'react-redux';
import { text } from '../../content';
import { ReduxState } from '../../redux';

const blockName = 'header';
interface HeaderProps {
  errorMessage: string | null
}

const mapStateToProps = (state: ReduxState) => ({
  errorMessage: state.errorMessage
})

const Header: React.FC<HeaderProps> = (props) => {
  const { errorMessage } = props;
  return (
    <header className={blockName}>
        <p>{text.appName}</p>
        {errorMessage && <p>{errorMessage}</p>}
    </header>
  );
};

export default connect(mapStateToProps)(Header);
