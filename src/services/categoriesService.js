import { http } from '@/plugins/axios';


class CategoriesService {
  fetchCategories() {
    return http.get('Category')
  }


  getCategory()
  {
    return http.get('Category')
  }
  addCategory(category)
  {
    return http.post('category',category)
  }

  getOrganizations()
  {
    return http.get('Organization')
  }
  addOrg(org)
  {
    return http.post('Organization',org)
  }

}

export default new CategoriesService();

