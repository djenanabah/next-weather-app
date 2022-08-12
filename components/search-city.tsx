import styles from './search-city.module.scss';
import { useCitiesSearch } from '../store/cityApi';
import { useState } from 'react';

export type SearchCityProps = {
}

const SearchCity: React.FC<SearchCityProps> =  (props) => {
  const [searchString, setSearchString] = useState('');
  const cities = useCitiesSearch(searchString);
  const maybeCities = cities.data
  const showResults = maybeCities !== undefined;
  const inputHasResultClass = showResults ? `${styles.searchInput} ${styles.results}` : styles.searchInput
  const inputHasTextClass = searchString.length > 0 ? `${inputHasResultClass} ${styles.hasText}` : inputHasResultClass


  return (
    <div className={styles.searchBar}>
        <input className={inputHasTextClass} type="text" placeholder='Search city to add' value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
        {
            showResults ? (
                <div className={styles.searchResults}>
                    {maybeCities.map(city => (
                        <div className={styles.searchResultEntry} key={city.id}>{city.name} - {city.countryCode}</div>
                    ))}
                </div>
            ) : undefined
        }
        
    </div>
  )
}

export default SearchCity;

