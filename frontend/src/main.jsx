import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
)
