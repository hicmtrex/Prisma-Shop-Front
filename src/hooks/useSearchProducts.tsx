import { useQuery } from '@tanstack/react-query';
import { Filter } from '../lib/api/products';

const useSearchProducts = (filter: Filter, apiName: string, key: string) => {
  let url = `http://localhost:5000/api/${apiName}`;

  if (!!filter.name) url += `?name=${filter.name}`;
  if (!!filter.brand) url += `?brand=${filter.brand}`;
  if (!!filter.category) url += `?category=${filter.category}`;

  return useQuery(
    [key, { search: filter.brand }],
    () => fetch(url).then((res) => res.json())
    // the following can be used to avoid refetches on already fetched data (see paginated queries docs)
    // { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
  );
};

export default useSearchProducts;
