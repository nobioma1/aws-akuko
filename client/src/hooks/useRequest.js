import React, { useState } from 'react';

export const useRequest = ({ method, url }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const doRequest = async ({ values, onSuccess }) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (onSuccess) {
        onSuccess(data);
      }

      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setError(<p>Something went wrong</p>);
    }
  };

  return { doRequest, error, isLoading };
};
