import useAuthStore from '@/store/AuthStore';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * This function performs a http request.
 * @param url - URL to request
 * @param method - HTTP methods (GET, POST, etc.)
 * @param data - request data
 * @returns - Promise representing the result of an HTTP request
 */
export default async function fetchRequest<T>(
  url: string,
  method: HttpMethod,
  data?: T
) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const storage: any = sessionStorage.getItem('auth');

    if (storage) {
      const { csrfToken, accessToken, isAuth } = JSON.parse(storage);
      headers['X-XSRF-TOKEN'] = csrfToken;

      if (isAuth) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    const response: Response = await fetch(url, {
      method,
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });

    // Save csrfToken in Storage
    const result = await response.json();
    const authStore = useAuthStore();
    authStore.setCsrfToken(result.csrfToken);

    return result.data;
  } catch (error: any) {
    console.log('Request error: ' + error.message);
    throw error;
  }
}
