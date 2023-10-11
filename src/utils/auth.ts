export const csrf = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/getcsrf`, {
      method: 'GET',
      credentials: 'include',
    });

    return await res.json();
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

export const checkAuth = async (
  tokenType: 'accessToken' | 'refreshToken',
  csrfToken: string
): Promise<boolean> => {
  const token: string | null = localStorage.getItem(tokenType);

  if (!token) {
    return false;
  }

  try {
    const res: Response = await fetch(
      `${import.meta.env.VITE_API_URL}/check-auth`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-XSRF-TOKEN': csrfToken,
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          token,
          csrfToken,
        }),
      }
    );

    const auth = await res.json();

    if (tokenType === 'accessToken' && auth.refreshTokenRequired) {
      await checkAuth('refreshToken', csrfToken);
      return false;
    }

    if (tokenType === 'refreshToken' && auth.accessToken && auth.refreshToken) {
      localStorage.setItem('accessToken', auth.accessToken);
      localStorage.setItem('refreshToken', auth.refreshToken);
      await checkAuth('accessToken', csrfToken);
      return false;
    }

    console.log('check-auth :', auth);

    return auth;
  } catch (error) {
    console.log('Error checking authentication:', error);
    return false;
  }
};
