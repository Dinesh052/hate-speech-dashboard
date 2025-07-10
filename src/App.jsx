import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Shield } from 'lucide-react'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('Loading data...')
    fetch('/enhanced_data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load data')
        }
        return response.json()
      })
      .then(data => {
        console.log('Data loaded successfully:', data)
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading data:', error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
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
            Loading dashboard data...
          </p>
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-red-600 rounded-lg mr-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-red-900">
              Error Loading Data
            </h1>
          </div>
          <p className="text-red-600 mb-6">
            {error}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Hate Speech Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                  Comprehensive analysis across social media platforms
                </p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Export Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Twitter Analysis</h3>
              <p className="text-2xl font-bold text-blue-600">
                {data?.twitter?.total_tweets?.toLocaleString() || 'N/A'}
              </p>
              <p className="text-blue-700">Total tweets analyzed</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Reddit Analysis</h3>
              <p className="text-2xl font-bold text-red-600">
                {data?.reddit?.total_posts?.toLocaleString() || 'N/A'}
              </p>
              <p className="text-red-700">Total posts analyzed</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Hate Speech Detected</h3>
              <p className="text-2xl font-bold text-green-600">
                {data?.twitter?.classification?.hate_speech?.count?.toLocaleString() || 'N/A'}
              </p>
              <p className="text-green-700">Flagged instances</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Data successfully loaded! Full dashboard functionality coming soon...
            </p>
            <pre className="bg-gray-100 p-4 rounded text-xs text-left overflow-auto max-h-40">
              {JSON.stringify(data, null, 2).substring(0, 500)}...
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
