import { useState, useRef, useEffect } from 'react';

interface HandleInputProps {
  onSearch: (handle: string) => void;
  isLoading: boolean;
}

export function HandleInput({ onSearch, isLoading }: HandleInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
        <span className="input-prefix">@</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="enter_handle"
          className="handle-input"
          disabled={isLoading}
          autoComplete="off"
          spellCheck={false}
        />
        <div className="input-cursor" />
      </div>
      <button
        type="submit"
        className="search-button"
        disabled={isLoading || !value.trim()}
      >
        <span className="button-text">{isLoading ? 'SCANNING...' : 'ANALYZE'}</span>
        <span className="button-arrow">{isLoading ? '◌' : '→'}</span>
      </button>
    </form>
  );
}
