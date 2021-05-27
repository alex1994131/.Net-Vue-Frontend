import { http } from '@/plugins/axios';


class CountryService {
  fetchCountries()
  {
    return http.get('Countries')
  }

}

export default  new CountryService();


