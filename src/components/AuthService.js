class AuthService {
  register(name, username, password) {
    return new Promise((resolve, reject) => {
      if (name && username && password) {
        const user = { name, username, userId: Date.now() }; // Mock user data
        sessionStorage.setItem('user', JSON.stringify(user)); // Save user to sessionStorage
        resolve(user);
      } else {
        reject('Invalid credentials');
      }
    });
  }

  logout() {
    sessionStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return JSON.parse(sessionStorage.getItem('user'));
  }
}

export default new AuthService();