export const csrf = async () => {
  try {
    const res = await fetch('http://localhost:8080/getcsrf', {
      method: 'GET',
      credentials: 'include',
    });

    return await res.json();
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};
