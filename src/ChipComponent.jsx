import React, { useState, useRef, useEffect } from 'react';
import './ChipComponent.css';

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const items = ['Rizon', 'Ankit', 'Prashant', 'Vishal', 'check', 'hello', 'exist', 'check1'];

  useEffect(() => {
    const filtered = items.filter(item => !chips.find(chip => chip.label === item));
    setFilteredItems(filtered);
  }, [chips]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === '') {
      setFilteredItems(items.filter(item => !chips.find(chip => chip.label === item)));
    } else {
      setFilteredItems(items.filter(item => item.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const handleItemClick = (item) => {
    setChips(prevChips => [...prevChips, { id: Date.now(), label: item }]);
    setInputValue('');
  };

  const handleChipRemove = (id) => {
    setChips(prevChips => prevChips.filter(chip => chip.id !== id));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === '') {
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip.id);
      }
    }
  };

  return (
    <div className="chip-container">
    <p className='heading'> Pick Users</p>
      <div className="chip-input">
        {chips.map(chip => (
          <div key={chip.id} className="chip">
            {chip.label}
            <button onClick={() => handleChipRemove(chip.id)} className="chip-remove">
              X
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add a new user..."
        />
      </div>
      <ul className="item-list">
        {filteredItems.map(item => (
          <li key={item} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChipComponent;