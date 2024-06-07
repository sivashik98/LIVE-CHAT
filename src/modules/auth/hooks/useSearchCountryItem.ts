import { useEffect, useState } from 'react';

import { countryCodeSectionItems } from 'modules/auth/utils';
import { CountryCodeType } from 'modules/auth/types';

export const useSearchCountryItem = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<(string | CountryCodeType)[]>(countryCodeSectionItems);

  useEffect(() => {
    if (searchValue) {
      const filtered = countryCodeSectionItems.filter((item) => {
        if (typeof item === 'string') return false;
        const searchTerm = searchValue.toLowerCase();
        return item.countryName.toLowerCase().includes(searchTerm) || item.countryPhoneCode.includes(searchTerm);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(countryCodeSectionItems);
    }
  }, [searchValue]);

  return { filteredData, searchValue, setSearchValue };
};
