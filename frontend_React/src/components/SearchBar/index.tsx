import { useState } from 'react';
import './styles.css';

type SearchFunction = (searchQuery: string) => void;

type Props = {
  onSearch: SearchFunction;
}

function SearchBar({ onSearch }: Props) {

  const [text, setText] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(text);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleResetClick() {
    setText("");
    onSearch(text);
  }

  return (
    <form className="dsc-search-bar" onSubmit={handleSubmit}>
      <button type="submit">🔎︎</button>
      <input
        type="text"
        placeholder="Nome do produto"
        onChange={handleChange}
        value={text}
      />
      <button
        onClick={handleResetClick}

      >
        🗙
      </button>
    </form>
  );
}

export default SearchBar;
