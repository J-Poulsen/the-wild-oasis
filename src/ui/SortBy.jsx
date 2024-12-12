import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ sortOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get('sortBy') || sortOptions[0].value;

  function handleChange(event) {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={sortOptions}
      type='white'
      value={currentSortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
