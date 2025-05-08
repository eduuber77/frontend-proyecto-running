import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}

export default App;