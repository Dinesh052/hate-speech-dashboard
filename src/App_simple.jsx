import { Button } from '@/components/ui/button.jsx'
import { Shield } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-900">
            Hate Speech Analytics
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Dashboard is loading... Please wait while we initialize the system.
        </p>
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Reload Page
        </Button>
      </div>
    </div>
  )
}

export default App
