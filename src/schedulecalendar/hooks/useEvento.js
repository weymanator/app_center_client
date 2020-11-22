import { useState } from 'react';

export default function useEvento() {
  const [evento, setEvento] = useState('');

  function handleChangeEvento({ target }) {
    let text = target.value;
    text = text.trim();
    setEvento(text);
  }

  return [evento, handleChangeEvento];
}
