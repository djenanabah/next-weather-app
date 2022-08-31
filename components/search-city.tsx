import styles from './search-city.module.scss';
import { useCitiesSearch } from '../store/cityApi';
import { useState } from 'react';
import { AddCityAction, dispatchAddCity } from '../store/store';
import { CityEntry } from '../model/cityEntry';

export type SearchCityProps = {
}

const SearchCity: React.FC<SearchCityProps> =  (props) => {
  const [searchString, setSearchString] = useState('');
  const cities = useCitiesSearch(searchString);
  const maybeCities = cities.data
  const showResults = maybeCities !== undefined;
  const inputHasResultClass = showResults ? `${styles.searchInput} ${styles.results}` : styles.searchInput
  const inputHasTextClass = searchString.length > 0 ? `${inputHasResultClass} ${styles.hasText}` : inputHasResultClass

  function handleAddCity(city: CityEntry){
    const addCityAction: AddCityAction = {id: city.id, name: city.name, timezone: city.timezone, longitude: city.longitude, latitude: city.latitude};
    dispatchAddCity(addCityAction)
    setSearchString('');
  }

  return (
    <div className={styles.searchBar}>
        <input className={inputHasTextClass} type="text" placeholder='Search city to add' value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
        {
            showResults ? (
                <div className={styles.searchResults}>
                    {maybeCities.map(city => (
                        <div className={styles.searchResultEntry} key={city.id} onClick={ () => handleAddCity(city) } >{city.name} - {city.countryCode}</div>
                    ))}
                </div>
            ) : undefined
        }
        
    </div>
  )
}

export default SearchCity;

