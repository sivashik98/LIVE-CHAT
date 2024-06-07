import _ from 'lodash';
import { COUNTRIES } from 'src/constants';
import { CountryCodeType } from 'modules/auth/types';

// Sort the countries array by name
const sortedCountries = _.sortBy(COUNTRIES, ['countryName']);

// Group the sorted array by the first letter of the country name
const groupedCountries = _.groupBy(sortedCountries, (country) => country.countryName.charAt(0).toUpperCase());

// Transform the grouped result into the desired format
export const countryCodeSectionItems: (string | CountryCodeType)[] = _.flatMap(groupedCountries, (countries, letter) => [letter, ...countries]);

export const generatePlaceholder = (phoneCode: string): string => {
  switch (phoneCode) {
    case '+1':
      return `(000) 000-000`;
    case '+44':
      return `0000 000 000`;
    case '+49':
      return `0000 0000000`;
    case '+33':
      return `0 00 00 00 00`;
    case '+39':
      return `000 000 0000`;
    default:
      return `000 000 0000`;
  }
};
export const formatPhoneNumber = (phoneNumber: string, placeholder: string): string => {
  // Remove non-numeric characters from the phone number
  const digits = phoneNumber.replace(/\D/g, '');

  let formattedNumber = '';
  let currentIndex = 0;

  // Format the phone number according to the segments
  for (const char of placeholder) {
    if (char === '0') {
      if (currentIndex < digits.length) {
        formattedNumber += digits[currentIndex];
        currentIndex++;
      } else {
        break;
      }
    } else {
      if (currentIndex < digits.length) {
        formattedNumber += char;
      }
    }
  }

  return formattedNumber;
};
