import { FC, memo } from 'react';
import './SearchField.scss';

interface ISearchField {
  searchValue: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: FC<ISearchField> = (props) => {
  const { searchValue, onSearch } = props;

  return (
    <>
      <input className="search-field" placeholder="Search To Do Thing..." value={searchValue} onChange={onSearch} />
    </>
  );
};

export default memo(SearchField);
