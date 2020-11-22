import { useState } from 'react';

export default function usePostData() {
  function postData(body) {
    fetch(`http://localhost:7000/api/evento/`, {
      method: 'POST',
      headers: {
        Authorization: body.userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  }

  return [postData];
}
