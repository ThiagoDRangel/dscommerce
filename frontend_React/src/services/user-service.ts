import { requestBackend } from "../utils/requests";
import * as authService from './auth-service';

export function findMe() {

  const headers = {
    Authorization: `Bearer ${authService.getAccessToken()}`
  }

  console.log('headers', headers);

  return requestBackend({
    url: '/users/me',
    method: 'GET',
    headers
  });
}