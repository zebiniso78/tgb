import React from 'react';

const LanguageContext = React.createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = React.useState(
    window.localStorage.getItem('language') || 'ru'
  );
  React.useEffect(() => {
    window.localStorage.setItem('language', language);
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext, LanguageProvider };
