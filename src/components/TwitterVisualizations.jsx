import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts'

const COLORS = {
  hate_speech: '#dc2626',
  offensive: '#ea580c',
  neither: '#059669'
}

export function ClassificationPieChart({ data }) {
  const chartData = [
    { name: 'Hate Speech', value: data.hate_speech.count, percentage: data.hate_speech.percentage, color: COLORS.hate_speech },
    { name: 'Offensive Language', value: data.offensive.count, percentage: data.offensive.percentage, color: COLORS.offensive },
    { name: 'Neither', value: data.neither.count, percentage: data.neither.percentage, color: COLORS.neither }
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">Count: {data.value.toLocaleString()}</p>
          <p className="text-sm">Percentage: {data.percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classification Distribution</CardTitle>
        <CardDescription>Distribution of tweet classifications</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function TimelineChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Analysis</CardTitle>
        <CardDescription>Hate speech detection over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hate_speech_count" stroke="#dc2626" name="Hate Speech" />
            <Line type="monotone" dataKey="total_posts" stroke="#2563eb" name="Total Posts" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function TopWordsChart({ data }) {
  // Filter out offensive words for display and take top 10
  const filteredWords = data.filter(([word]) => 
    !['bitch', 'faggot', 'nigga'].includes(word)
  ).slice(0, 10)

  const chartData = filteredWords.map(([word, count]) => ({
    word: word,
    count: count
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Common Words in Hate Speech</CardTitle>
        <CardDescription>Frequency analysis (filtered for display)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="word" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="count" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function SentimentChart({ data }) {
  const chartData = [
    { sentiment: 'Very Negative', value: data.very_negative, color: '#dc2626' },
    { sentiment: 'Negative', value: data.negative, color: '#ea580c' },
    { sentiment: 'Neutral', value: data.neutral, color: '#6b7280' },
    { sentiment: 'Positive', value: data.positive, color: '#059669' },
    { sentiment: 'Very Positive', value: data.very_positive, color: '#10b981' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Distribution</CardTitle>
        <CardDescription>Overall sentiment analysis of tweets</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sentiment" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            <Bar dataKey="value" fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function NetworkVisualization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Interaction Network</CardTitle>
        <CardDescription>Complex network analysis of user interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Interactive Network Graph</p>
            <p className="text-sm text-gray-500 mt-2">
              Complex D3.js visualization showing user interaction patterns,<br />
              reply chains, and influence networks in hate speech propagation
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

