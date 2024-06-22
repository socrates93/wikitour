import { PropsWithChildren, useState } from 'react';

import { FilterContext } from '.';

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [lang, setLang] = useState<string>('en');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  return (
    <FilterContext.Provider
      value={{
        lang,
        date,
        setLang,
        setDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
