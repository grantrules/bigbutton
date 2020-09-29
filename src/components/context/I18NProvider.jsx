import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import resources from '../../resources';

const I18NContext = React.createContext({
  language: 'en',
  setLanguage: () => {},
  t: () => {},
});

function I18NProvider({ language, children }) {
  const [lang, setLanguage] = useState(language);

  const t = (str) => resources[lang][str] || str;

  const context = {
    language,
    setLanguage,
    t,
  };

  return (<I18NContext.Provider value={context}>{children}</I18NContext.Provider>);
}

I18NProvider.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function useI18N() {
  return useContext(I18NContext);
}

export { I18NContext, I18NProvider, useI18N };
