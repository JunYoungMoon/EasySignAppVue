import useAuthStore from '@/store/AuthStore';

interface AjaxRequestData {
  data?: object;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * This function performs a http request.
 * @param url - URL to request
 * @param method - HTTP methods (GET, POST, etc.)
 * @param data - request data
 * @returns - Promise representing the result of an HTTP request
 */
export default async function fetchRequest(
  url: string,
  method: HttpMethod,
  data: AjaxRequestData
) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const storage: any = sessionStorage.getItem('auth');

    if (storage) {
      const { csrfToken, accessToken, isAuth } = JSON.parse(storage);
      headers['X-XSRF-TOKEN'] = csrfToken;

      if (isAuth === 'true') {
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

    // Change the csrf token value to the value of the header
    const XSRF_TOKEN: string = response.headers.get('XSRF-TOKEN') ?? '';
    const authStore = useAuthStore();
    authStore.setCsrfToken(XSRF_TOKEN);

    return await response.json();
  } catch (error: any) {
    console.log('Request error: ' + error.message);
    throw error;
  }
}
