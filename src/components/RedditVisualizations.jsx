import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts'

const COLORS = ['#2563eb', '#dc2626', '#059669', '#ea580c', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b']

export function SubredditAnalysis({ data }) {
  const chartData = data.map(item => ({
    ...item,
    hate_rate: ((item.hate_count / item.total_posts) * 100).toFixed(1)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subreddit Hate Speech Analysis</CardTitle>
        <CardDescription>Hate speech distribution across different subreddits</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'hate_count' ? value : `${value}%`,
                name === 'hate_count' ? 'Hate Posts' : 'Hate Rate'
              ]}
            />
            <Legend />
            <Bar dataKey="hate_count" fill="#dc2626" name="Hate Posts" />
            <Bar dataKey="hate_rate" fill="#ea580c" name="Hate Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function InterventionEffectiveness({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Intervention Effectiveness Over Time</CardTitle>
        <CardDescription>Success rate of hate speech interventions by month</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value, name) => [
              name === 'effectiveness' ? `${value}%` : value,
              name === 'effectiveness' ? 'Success Rate' : 'Interventions'
            ]} />
            <Legend />
            <Line type="monotone" dataKey="effectiveness" stroke="#059669" name="Success Rate %" strokeWidth={3} />
            <Line type="monotone" dataKey="interventions" stroke="#2563eb" name="Total Interventions" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ConversationDepthChart({ data }) {
  const chartData = Object.entries(data).map(([depth, count]) => ({
    depth,
    count,
    percentage: ((count / Object.values(data).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Depth Analysis</CardTitle>
        <CardDescription>Distribution of conversation thread lengths</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ depth, percentage }) => `${depth}: ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, 'Conversations']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ConversationFlowDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Flow Analysis</CardTitle>
        <CardDescription>How hate speech propagates through conversation threads</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Interactive Flow Diagram</p>
            <p className="text-sm text-gray-500 mt-2">
              Sankey diagram showing conversation flow patterns,<br />
              from initial posts through responses and interventions
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CommunityClusteringAnalysis() {
  // Simulated clustering data
  const clusterData = [
    { x: 10, y: 20, size: 50, cluster: 'Toxic Communities' },
    { x: 30, y: 40, size: 80, cluster: 'Moderate Communities' },
    { x: 60, y: 30, size: 120, cluster: 'Positive Communities' },
    { x: 80, y: 70, size: 90, cluster: 'Mixed Communities' },
    { x: 45, y: 80, size: 60, cluster: 'Intervention-Heavy' },
    { x: 25, y: 60, size: 40, cluster: 'Low Activity' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Clustering Analysis</CardTitle>
        <CardDescription>Clustering of Reddit communities based on hate speech patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Toxicity Level" />
            <YAxis type="number" dataKey="y" name="Activity Level" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} 
              formatter={(value, name) => [value, name]}
              labelFormatter={(value) => `Community Type`}
            />
            <Scatter name="Communities" data={clusterData} fill="#8884d8">
              {clusterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function InterventionTypesChart() {
  const interventionData = [
    { type: 'Counter-speech', count: 3247, success_rate: 78 },
    { type: 'Fact-checking', count: 1892, success_rate: 85 },
    { type: 'Empathy-based', count: 2156, success_rate: 71 },
    { type: 'Humor/Deflection', count: 1543, success_rate: 62 },
    { type: 'Direct confrontation', count: 987, success_rate: 45 },
    { type: 'Reporting/Moderation', count: 2418, success_rate: 92 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Intervention Strategy Effectiveness</CardTitle>
        <CardDescription>Success rates of different intervention approaches</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={interventionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="count" fill="#2563eb" name="Total Uses" />
            <Bar yAxisId="right" dataKey="success_rate" fill="#059669" name="Success Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

