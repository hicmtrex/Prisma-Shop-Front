import { useQuery } from '@tanstack/react-query';

const useSearchQuery = (search: string, apiName: string, key: string) => {
  let url = `http://localhost:5000/api/${apiName}`;

  if (!!search) {
    url += `?name=${search}`;
  }

  return useQuery(
    [key, { search }],
    () => fetch(url).then((res) => res.json())
    // the following can be used to avoid refetches on already fetched data (see paginated queries docs)
    // { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
  );
};

export default useSearchQuery;
