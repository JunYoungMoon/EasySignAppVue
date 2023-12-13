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
  const { setLoading } = useGlobal();

  try {
    setLoading(true);

    const headers: Record<string, string> = {};

    const storage: any = sessionStorage.getItem('auth');

    if (storage) {
      const { csrfToken, accessToken, isAuth } = JSON.parse(storage);
      headers['X-XSRF-TOKEN'] = csrfToken;

      if (isAuth) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    let body: any;

    if (contentType === 'multipart/form-data') {
      // If content type is multipart/form-data, use FormData
      body = data;
      // Logging FormData values
      console.log('FormData values:');
      body.forEach((value: any, key: any) => {
        console.log(`${key}: ${value}`);
      });
    } else {
      // For other content types, stringify the data
      body = JSON.stringify(data);
      headers['Content-Type'] = contentType;
    }

    const response: Response = await fetch(url, {
      method,
      headers,
      credentials: 'include',
      body,
    });

    // Save csrfToken in Storage
    const result = await response.json();
    const authStore = useAuth();
    authStore.setCsrfToken(result.csrfToken);

    setLoading(false);

    return result.data;
  } catch (error: any) {
    setLoading(false);
    console.log('Request error: ' + error.message);
    throw error;
  }
}
