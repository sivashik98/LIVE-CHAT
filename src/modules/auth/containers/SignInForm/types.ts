import { CountryCodeType } from 'modules/auth/types';

export type SignInFormProps = {
  countryName: Pick<CountryCodeType, 'countryName'>;
};
