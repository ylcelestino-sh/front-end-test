import axios from 'axios';

class ApiService {

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'https://front-test-api.herokuapp.com/';
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: this.getHeaders(),
    });
  }
  // get Headers for create axios instance
  getHeaders() {
    const headers = {
      'content-type': 'application/json',
    };
    return headers;
  }
}
export default ApiService;