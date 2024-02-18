
import Index from './routes/Index';
import axios from 'axios';

function App() {

  //cors policy setup
  axios.defaults.baseURL = 'https://auth-project-server.vercel.app';
  // axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;

  return (
    <div className=''>
      <Index />
    </div>
  )
}

export default App
