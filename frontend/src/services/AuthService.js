import {http, userKey, showError} from "@/global";

class AuthService {
    login(user) {
    http.post('/auth/signin', {
          email: user.email,
          password: user.password
        })
        .then(response => {
            console.log(response)
            this.$store.commit('setUser', response.data)
          if (response.data.accessToken) {
            localStorage.setItem(userKey, JSON.stringify(response.data));
            this.$router.push({path: '/'})
          }
          return response.data;
        })
        .catch(e => {
            console.log(e)
        });
    }
  
    logout() {
      localStorage.removeItem(userKey);
    }
  
    register(user) {
      http.post('/auth/signup', {
        username: user.username,
        email: user.email,
        password: user.password
      })
      .then((res) => {
        if (res =="Usuário registrado"){
            return true
        }
      });
    }
  }
  
  export default new AuthService();