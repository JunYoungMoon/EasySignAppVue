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

    let storage: any = sessionStorage.getItem('auth'); // storage에는 문자열 또는 null이 할당됨

    if (storage) {
      storage = JSON.parse(storage);
    }

    // Get CSRF token
    const csrfToken = storage.csrfToken;

    if (csrfToken) {
      headers['X-XSRF-TOKEN'] = csrfToken;
    }

    // Authentication check
    const isAuth = storage.isAuth;

    if (isAuth === 'true') {
      const token = storage.accessToken;
      if (token) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response: Response = await fetch(url, {
      method,
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });

    // Change the csrf token value to the value of the header
    const authStore = useAuthStore();
    const XSRF_TOKEN: string = response.headers.get('XSRF-TOKEN') ?? '';
    authStore.setCsrfToken(XSRF_TOKEN);

    return await response.json();
  } catch (error: any) {
    console.log('Request error: ' + error.message);
    throw error;
  }
}
