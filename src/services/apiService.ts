interface AjaxRequestData {
  data?: object;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function fetchRequest(
  url: string,
  method: HttpMethod,
  data: AjaxRequestData
) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // CSRF 토큰 가져오기
    const csrfToken = sessionStorage.getItem('csrfToken');
    if (csrfToken) {
      headers['X-XSRF-TOKEN'] = csrfToken;
    }

    // 인증 체크
    const isAuth = sessionStorage.getItem('isAuth');
    if (isAuth === 'true') {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error: any) {
    console.log('Request error: ' + error.message);
    throw error;
  }
}
