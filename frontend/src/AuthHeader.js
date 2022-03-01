import {userKey} from '@/global'

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem(userKey));
  
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken, "Content-type": "application/json" };
    } else {
      return {"Content-type": "application/json"};
    }
  }
  