import { useState } from 'react';

export default function useDetalles() {
  const [detalles, setDetalles] = useState('');

  function handleChangeDetalles({ target }) {
    let text = target.value;
    text = text.trim();
    setDetalles(text);
  }

  return [detalles, handleChangeDetalles];
}
