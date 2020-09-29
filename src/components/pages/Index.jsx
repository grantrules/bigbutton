import React from 'react';
import { Link } from 'react-router-dom';
import Authorized from '../auth/Authorized';
import { useI18N } from '../context/I18NProvider';

export default () => {
  const { t } = useI18N();

  return (
    <>
      <header>
        <h1 className="header">BigButton</h1>
      </header>
      <nav>
        <ul>
          <li><Link to="/login">{t`Login`}</Link></li>
          <li><Link to="/register">{t`Register`}</Link></li>
          <Authorized>
            <li><Link to="/private">{t`Private`}</Link></li>
          </Authorized>
        </ul>
      </nav>
    </>
  );
};
