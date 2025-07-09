import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { motion } from 'framer-motion'

export function EnhancedCard({ children, className = "", ...props }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`transition-all duration-300 hover:border-blue-200 ${className}`} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend, color = "blue" }) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50",
    red: "text-red-600 bg-red-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50"
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="transition-all duration-300 hover:shadow-lg hover:border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          <div className={`p-2 rounded-full ${colorClasses[color]}`}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-xs text-gray-500">{subtitle}</p>
            {trend && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                trend.type === 'up' ? 'bg-green-100 text-green-700' : 
                trend.type === 'down' ? 'bg-red-100 text-red-700' : 
                'bg-gray-100 text-gray-700'
              }`}>
                {trend.value}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

