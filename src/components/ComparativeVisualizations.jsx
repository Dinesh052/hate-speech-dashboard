import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area } from 'recharts'

export function PlatformComparisonChart({ data }) {
  const comparisonData = [
    {
      metric: 'Volume',
      Twitter: data.volume.twitter,
      Reddit: data.volume.reddit
    },
    {
      metric: 'Hate Speech Rate',
      Twitter: data.hate_speech_rate.twitter,
      Reddit: data.hate_speech_rate.reddit
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Comparison</CardTitle>
        <CardDescription>Key metrics comparison between Twitter and Reddit</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Twitter" fill="#1da1f2" name="Twitter" />
            <Bar dataKey="Reddit" fill="#ff4500" name="Reddit" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function CrossPlatformTrends({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cross-Platform Hate Speech Trends</CardTitle>
        <CardDescription>Hate speech rates over time across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            <Legend />
            <Line type="monotone" dataKey="twitter_hate_rate" stroke="#1da1f2" name="Twitter" strokeWidth={3} />
            <Line type="monotone" dataKey="reddit_hate_rate" stroke="#ff4500" name="Reddit" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function PlatformCharacteristics() {
  const characteristicsData = [
    {
      platform: 'Twitter',
      brevity: 95,
      virality: 85,
      moderation: 60,
      user_intervention: 30,
      real_time: 90,
      anonymity: 40
    },
    {
      platform: 'Reddit',
      brevity: 30,
      virality: 65,
      moderation: 70,
      user_intervention: 85,
      real_time: 50,
      anonymity: 80
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Characteristics Radar</CardTitle>
        <CardDescription>Comparative analysis of platform features affecting hate speech</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={characteristicsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="platform" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Twitter" dataKey="brevity" stroke="#1da1f2" fill="#1da1f2" fillOpacity={0.1} />
            <Radar name="Reddit" dataKey="brevity" stroke="#ff4500" fill="#ff4500" fillOpacity={0.1} />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function InterventionEffectivenessComparison() {
  const interventionData = [
    { strategy: 'Automated Detection', twitter: 65, reddit: 45 },
    { strategy: 'Community Reporting', twitter: 70, reddit: 80 },
    { strategy: 'Counter-speech', twitter: 35, reddit: 75 },
    { strategy: 'Content Removal', twitter: 85, reddit: 60 },
    { strategy: 'User Education', twitter: 40, reddit: 70 },
    { strategy: 'Algorithmic Intervention', twitter: 75, reddit: 30 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Intervention Strategy Effectiveness</CardTitle>
        <CardDescription>Comparison of intervention success rates across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={interventionData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="strategy" type="category" width={120} />
            <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
            <Legend />
            <Bar dataKey="twitter" fill="#1da1f2" name="Twitter" />
            <Bar dataKey="reddit" fill="#ff4500" name="Reddit" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function HateSpeechEvolutionChart() {
  const evolutionData = [
    { year: '2020', twitter: 8.2, reddit: 12.5, overall: 10.4 },
    { year: '2021', twitter: 7.8, reddit: 15.2, overall: 11.5 },
    { year: '2022', twitter: 6.9, reddit: 18.7, overall: 12.8 },
    { year: '2023', twitter: 5.8, reddit: 17.7, overall: 11.8 },
    { year: '2024', twitter: 5.2, reddit: 16.1, overall: 10.7 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hate Speech Evolution (2020-2024)</CardTitle>
        <CardDescription>Trends in hate speech prevalence over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={evolutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}%`, 'Hate Speech Rate']} />
            <Legend />
            <Area type="monotone" dataKey="overall" fill="#8884d8" stroke="#8884d8" fillOpacity={0.3} name="Overall Trend" />
            <Line type="monotone" dataKey="twitter" stroke="#1da1f2" strokeWidth={3} name="Twitter" />
            <Line type="monotone" dataKey="reddit" stroke="#ff4500" strokeWidth={3} name="Reddit" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function GeographicHeatMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Distribution</CardTitle>
        <CardDescription>Hate speech patterns by geographic region</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Interactive Geographic Heat Map</p>
            <p className="text-sm text-gray-500 mt-2">
              World map visualization showing hate speech distribution<br />
              by country and region with interactive tooltips
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

