import { useGlobal, useAuth } from '@/store';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * This function performs a http request.
 * @param url - URL to request
 * @param method - HTTP methods (GET, POST, etc.)
 * @param data - request data
 * @param contentType - content type of the request (default: 'application/json')
 * @returns - Promise representing the result of an HTTP request
 */
export default async function fetchRequest<T>(
  url: string,
  method: HttpMethod,
  data?: T,
  contentType: string = 'application/json'
) {
  const globalStore = useGlobal();

  try {
    globalStore.setLoading(true);

    const headers: Record<string, string> = {
      'Content-Type': contentType,
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
    const authStore = useAuth();
    authStore.setCsrfToken(result.csrfToken);

    globalStore.setLoading(false);

    return result.data;
  } catch (error: any) {
    globalStore.setLoading(false);
    console.log('Request error: ' + error.message);
    throw error;
  }
}
