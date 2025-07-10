import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, Area, AreaChart, ComposedChart } from 'recharts'

const COLORS = ['#2563eb', '#dc2626', '#059669', '#ea580c', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b']

export function SubredditAnalysis() {
  const [selectedSubreddit, setSelectedSubreddit] = useState(null);
  const [sortBy, setSortBy] = useState('hate_rate');
  
  // Enhanced subreddit data with more realistic information
  const enhancedSubreddits = [
    { 
      name: 'r/politics', 
      total_posts: 45230, 
      hate_count: 3847, 
      members: 8500000, 
      moderators: 45, 
      category: 'Political Discussion',
      intervention_success: 78,
      avg_response_time: 2.3,
      trending: 'up'
    },
    { 
      name: 'r/news', 
      total_posts: 32140, 
      hate_count: 2156, 
      members: 25000000, 
      moderators: 67, 
      category: 'News & Current Events',
      intervention_success: 85,
      avg_response_time: 1.8,
      trending: 'stable'
    },
    { 
      name: 'r/worldnews', 
      total_posts: 38920, 
      hate_count: 2847, 
      members: 30000000, 
      moderators: 52, 
      category: 'International News',
      intervention_success: 82,
      avg_response_time: 1.5,
      trending: 'down'
    },
    { 
      name: 'r/unpopularopinion', 
      total_posts: 12450, 
      hate_count: 1892, 
      members: 1800000, 
      moderators: 15, 
      category: 'Opinion & Discussion',
      intervention_success: 45,
      avg_response_time: 4.7,
      trending: 'up'
    },
    { 
      name: 'r/gaming', 
      total_posts: 28730, 
      hate_count: 1234, 
      members: 35000000, 
      moderators: 23, 
      category: 'Gaming & Entertainment',
      intervention_success: 92,
      avg_response_time: 0.9,
      trending: 'stable'
    },
    { 
      name: 'r/relationships', 
      total_posts: 15680, 
      hate_count: 892, 
      members: 3200000, 
      moderators: 18, 
      category: 'Personal Advice',
      intervention_success: 88,
      avg_response_time: 1.2,
      trending: 'down'
    },
    { 
      name: 'r/amitheasshole', 
      total_posts: 22340, 
      hate_count: 1567, 
      members: 4500000, 
      moderators: 28, 
      category: 'Moral Judgment',
      intervention_success: 73,
      avg_response_time: 2.1,
      trending: 'stable'
    },
    { 
      name: 'r/conspiracy', 
      total_posts: 8920, 
      hate_count: 2134, 
      members: 1700000, 
      moderators: 8, 
      category: 'Conspiracy Theories',
      intervention_success: 31,
      avg_response_time: 8.4,
      trending: 'up'
    }
  ];

  const chartData = enhancedSubreddits.map(item => ({
    ...item,
    hate_rate: ((item.hate_count / item.total_posts) * 100).toFixed(1),
    hate_per_member: ((item.hate_count / item.members) * 100000).toFixed(1),
    moderation_ratio: (item.members / item.moderators).toFixed(0)
  }));

  const sortedData = [...chartData].sort((a, b) => {
    if (sortBy === 'hate_rate') return b.hate_rate - a.hate_rate;
    if (sortBy === 'hate_count') return b.hate_count - a.hate_count;
    if (sortBy === 'members') return b.members - a.members;
    if (sortBy === 'intervention_success') return b.intervention_success - a.intervention_success;
    return 0;
  });

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Political Discussion': '#dc2626',
      'News & Current Events': '#2563eb',
      'International News': '#0891b2',
      'Opinion & Discussion': '#ea580c',
      'Gaming & Entertainment': '#059669',
      'Personal Advice': '#8b5cf6',
      'Moral Judgment': '#f59e0b',
      'Conspiracy Theories': '#7c2d12'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enhanced Subreddit Analysis</CardTitle>
        <CardDescription>Interactive analysis of hate speech patterns across Reddit communities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Sort Controls */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-gray-600 mr-2">Sort by:</span>
            {[
              { key: 'hate_rate', label: 'Hate Rate %' },
              { key: 'hate_count', label: 'Total Hate Posts' },
              { key: 'members', label: 'Community Size' },
              { key: 'intervention_success', label: 'Intervention Success' }
            ].map(option => (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  sortBy === option.key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Main Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Community Hate Speech Rates</h4>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={sortedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'hate_count') return [value.toLocaleString(), 'Hate Posts'];
                      if (name === 'hate_rate') return [`${value}%`, 'Hate Rate'];
                      if (name === 'intervention_success') return [`${value}%`, 'Success Rate'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="hate_count" fill="#dc2626" name="Hate Posts" />
                  <Line yAxisId="right" type="monotone" dataKey="intervention_success" stroke="#059669" strokeWidth={3} name="Success Rate %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community Categories</h4>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="hate_count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Hate Posts']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive Community Cards */}
          <div>
            <h4 className="font-semibold mb-4">Community Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedData.map((subreddit, index) => (
                <div
                  key={subreddit.name}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedSubreddit === subreddit.name
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedSubreddit(selectedSubreddit === subreddit.name ? null : subreddit.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">{subreddit.name}</span>
                      <span className="text-sm">{getTrendIcon(subreddit.trending)}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">#{index + 1}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Members:</span>
                      <span className="text-sm font-medium">{(subreddit.members / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hate Rate:</span>
                      <span className={`text-sm font-bold ${
                        subreddit.hate_rate > 15 ? 'text-red-600' :
                        subreddit.hate_rate > 10 ? 'text-orange-600' :
                        subreddit.hate_rate > 5 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {subreddit.hate_rate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Success Rate:</span>
                      <span className={`text-sm font-bold ${
                        subreddit.intervention_success > 80 ? 'text-green-600' :
                        subreddit.intervention_success > 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {subreddit.intervention_success}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white font-medium"
                        style={{ backgroundColor: getCategoryColor(subreddit.category) }}
                      >
                        {subreddit.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {subreddit.moderators} mods
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Community Detail */}
          {selectedSubreddit && (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">
                {selectedSubreddit} - Detailed Analysis
              </h4>
              {(() => {
                const subreddit = chartData.find(s => s.name === selectedSubreddit);
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded border">
                      <div className="text-sm text-gray-600">Total Posts</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {subreddit.total_posts.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <div className="text-sm text-gray-600">Hate Posts</div>
                      <div className="text-2xl font-bold text-red-600">
                        {subreddit.hate_count.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <div className="text-sm text-gray-600">Response Time</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {subreddit.avg_response_time}h
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <div className="text-sm text-gray-600">Mod Ratio</div>
                      <div className="text-2xl font-bold text-green-600">
                        1:{subreddit.moderation_ratio}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
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
  if (!data || typeof data !== 'object') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversation Depth Analysis</CardTitle>
          <CardDescription>Distribution of conversation thread lengths</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-300 flex items-center justify-center text-gray-500">
            No data available
          </div>
        </CardContent>
      </Card>
    )
  }

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
            <Tooltip formatter={(value) => [value, 'Conversations']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ConversationFlowDiagram() {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);

  // Enhanced flow visualization data with detailed paths
  const flowLevels = [
    { 
      level: "Initial Post", 
      items: [
        { name: "Original Post", value: 2847, success_rate: null, description: "User posts potentially hateful content" }
      ], 
      color: "#3b82f6" 
    },
    { 
      level: "Community Response", 
      items: [
        { name: "Supportive Responses", value: 1234, success_rate: 15, description: "Users agree or amplify the message" },
        { name: "Challenging Responses", value: 1613, success_rate: 78, description: "Users question or counter the message" }
      ], 
      color: "#f59e0b" 
    },
    { 
      level: "Escalation/De-escalation", 
      items: [
        { name: "Heated Debate", value: 892, success_rate: 45, description: "Discussion becomes more aggressive" },
        { name: "Constructive Dialogue", value: 721, success_rate: 82, description: "Respectful counter-arguments emerge" },
        { name: "Fact-Checking", value: 456, success_rate: 89, description: "Users provide evidence-based responses" }
      ], 
      color: "#ef4444" 
    },
    { 
      level: "Intervention", 
      items: [
        { name: "Moderator Action", value: 234, success_rate: 95, description: "Official moderation intervention" },
        { name: "Community Self-Regulation", value: 567, success_rate: 73, description: "Users downvote and report" },
        { name: "Expert Input", value: 123, success_rate: 91, description: "Subject matter experts join discussion" }
      ], 
      color: "#8b5cf6" 
    },
    { 
      level: "Final Outcomes", 
      items: [
        { name: "Content Removed", value: 298, success_rate: 100, description: "Post deleted by mods" },
        { name: "User Educated", value: 421, success_rate: 85, description: "Original poster changes stance" },
        { name: "Discussion Continues", value: 167, success_rate: 65, description: "Ongoing but civil debate" },
        { name: "User Suspended", value: 89, success_rate: 100, description: "Account temporarily banned" },
        { name: "Echo Chamber", value: 156, success_rate: 0, description: "Hate speech reinforced" }
      ], 
      color: "#10b981" 
    }
  ];

  const getSuccessColor = (rate) => {
    if (rate === null) return '#6b7280';
    if (rate >= 80) return '#10b981';
    if (rate >= 60) return '#f59e0b';
    if (rate >= 40) return '#ef4444';
    return '#7c2d12';
  };

  const handleItemClick = (item) => {
    setSelectedFlow(selectedFlow === item.name ? null : item.name);
  };

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Conversation Flow Analysis</CardTitle>
        <CardDescription>
          How hate speech conversations evolve and the effectiveness of different intervention strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Flow Diagram */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
            <div className="grid grid-cols-5 gap-4 h-auto min-h-[400px]">
              {flowLevels.map((level, levelIndex) => (
                <div key={level.level} className="flex flex-col justify-start space-y-3">
                  <h4 className="text-sm font-bold text-center p-2 rounded-lg text-white" 
                      style={{ backgroundColor: level.color }}>
                    {level.level}
                  </h4>
                  <div className="flex flex-col space-y-2">
                    {level.items.map((item) => (
                      <div key={item.name} className="relative">
                        <div 
                          className={`p-3 rounded-lg text-xs text-center font-medium text-white shadow-lg cursor-pointer transition-all transform hover:scale-105 ${
                            selectedFlow === item.name ? 'ring-4 ring-blue-300' : ''
                          } ${
                            animationStep === levelIndex ? 'animate-pulse' : ''
                          }`}
                          style={{ backgroundColor: getSuccessColor(item.success_rate) }}
                          onClick={() => handleItemClick(item)}
                        >
                          <div className="font-semibold truncate">{item.name}</div>
                          <div className="text-xs opacity-90 mt-1">{item.value.toLocaleString()}</div>
                          {item.success_rate !== null && (
                            <div className="text-xs font-bold mt-1">
                              {item.success_rate}% success
                            </div>
                          )}
                        </div>
                        
                        {/* Connection arrows */}
                        {levelIndex < flowLevels.length - 1 && (
                          <div className="absolute top-1/2 left-full w-4 h-0.5 bg-gray-400 transform -translate-y-1/2 z-10">
                            <div className="absolute right-0 top-1/2 w-0 h-0 border-l-2 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent transform -translate-y-1/2"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Rate Legend */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-3">Success Rate Color Legend</h4>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Excellent (80%+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Good (60-79%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Poor (40-59%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-900 rounded"></div>
                <span className="text-sm">Very Poor (&lt;40%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span className="text-sm">No Success Metric</span>
              </div>
            </div>
          </div>

          {/* Selected Flow Detail */}
          {selectedFlow && (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">
                {selectedFlow} - Detailed Analysis
              </h4>
              {(() => {
                const selectedItem = flowLevels
                  .flatMap(level => level.items)
                  .find(item => item.name === selectedFlow);
                
                if (!selectedItem) return null;

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm text-gray-600">Volume</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedItem.value.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm text-gray-600">Success Rate</div>
                        <div className={`text-2xl font-bold ${
                          selectedItem.success_rate >= 80 ? 'text-green-600' :
                          selectedItem.success_rate >= 60 ? 'text-yellow-600' :
                          selectedItem.success_rate >= 40 ? 'text-red-600' :
                          'text-red-900'
                        }`}>
                          {selectedItem.success_rate !== null ? `${selectedItem.success_rate}%` : 'N/A'}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm text-gray-600">Percentage of Total</div>
                        <div className="text-2xl font-bold text-purple-600">
                          {((selectedItem.value / 2847) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <div className="text-sm text-gray-600 mb-2">Description</div>
                      <div className="text-gray-800">{selectedItem.description}</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Flow Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="font-semibold mb-4">🎯 Most Effective Interventions</h4>
              <div className="space-y-3">
                {flowLevels
                  .flatMap(level => level.items)
                  .filter(item => item.success_rate !== null)
                  .sort((a, b) => b.success_rate - a.success_rate)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="text-green-600 font-bold text-sm">
                        {item.success_rate}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h4 className="font-semibold mb-4">📊 Flow Insights</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total conversations analyzed:</span>
                  <span className="font-bold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Successful de-escalations:</span>
                  <span className="font-bold text-green-600">73%</span>
                </div>
                <div className="flex justify-between">
                  <span>Moderator intervention rate:</span>
                  <span className="font-bold text-blue-600">8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Community self-regulation:</span>
                  <span className="font-bold text-purple-600">19.9%</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversations leading to learning:</span>
                  <span className="font-bold text-indigo-600">14.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CommunityClusteringAnalysis() {
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Enhanced clustering data with real Reddit community examples
  const clusterData = [
    { 
      x: 85, y: 20, size: 50, cluster: 'Toxic Communities', 
      communities: ['r/conspiracy', 'r/unpopularopinion', 'r/4chan'],
      hate_rate: 23.8, intervention_success: 31, members: 2400000,
      characteristics: ['High toxicity', 'Low moderation', 'Echo chambers']
    },
    { 
      x: 30, y: 70, size: 120, cluster: 'Positive Communities', 
      communities: ['r/wholesomememes', 'r/MadeMeSmile', 'r/humansbeingbros'],
      hate_rate: 2.1, intervention_success: 95, members: 15600000,
      characteristics: ['Positive culture', 'Strong moderation', 'Supportive']
    },
    { 
      x: 60, y: 40, size: 80, cluster: 'Moderate Communities', 
      communities: ['r/news', 'r/worldnews', 'r/askreddit'],
      hate_rate: 7.3, intervention_success: 78, members: 89000000,
      characteristics: ['Balanced discussion', 'Active moderation', 'Diverse views']
    },
    { 
      x: 45, y: 85, size: 90, cluster: 'Mixed Communities', 
      communities: ['r/politics', 'r/gaming', 'r/relationship_advice'],
      hate_rate: 12.6, intervention_success: 68, members: 47000000,
      characteristics: ['Topic-dependent', 'Variable moderation', 'Heated debates']
    },
    { 
      x: 25, y: 55, size: 60, cluster: 'Intervention-Heavy', 
      communities: ['r/changemyview', 'r/moderatepolitics', 'r/neutralpolitics'],
      hate_rate: 5.8, intervention_success: 87, members: 3200000,
      characteristics: ['Counter-speech focus', 'Heavy moderation', 'Constructive dialogue']
    },
    { 
      x: 70, y: 15, size: 40, cluster: 'Niche Toxic', 
      communities: ['r/incel', 'r/redpill', 'r/MGTOW'],
      hate_rate: 45.2, intervention_success: 18, members: 890000,
      characteristics: ['Extremist content', 'Minimal moderation', 'Closed communities']
    }
  ];

  const getClusterColor = (cluster) => {
    const colors = {
      'Toxic Communities': '#dc2626',
      'Positive Communities': '#059669',
      'Moderate Communities': '#2563eb',
      'Mixed Communities': '#f59e0b',
      'Intervention-Heavy': '#8b5cf6',
      'Niche Toxic': '#7c2d12'
    };
    return colors[cluster] || '#6b7280';
  };

  const handlePointClick = (data) => {
    setSelectedCluster(selectedCluster === data.cluster ? null : data.cluster);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Community Clustering Analysis</CardTitle>
        <CardDescription>Reddit communities clustered by toxicity patterns and intervention effectiveness</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Scatter Plot */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-4">Community Toxicity vs Activity Scatter Plot</h4>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Toxicity Level" 
                    domain={[0, 100]}
                    label={{ value: 'Toxicity Level →', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Activity Level"
                    domain={[0, 100]}
                    label={{ value: 'Activity Level →', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border rounded shadow-lg">
                            <p className="font-semibold">{data.cluster}</p>
                            <p className="text-sm">Toxicity: {data.x}%</p>
                            <p className="text-sm">Activity: {data.y}%</p>
                            <p className="text-sm">Hate Rate: {data.hate_rate}%</p>
                            <p className="text-sm">Success Rate: {data.intervention_success}%</p>
                            <p className="text-sm">Members: {(data.members / 1000000).toFixed(1)}M</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    name="Communities" 
                    data={clusterData} 
                    onClick={handlePointClick}
                    onMouseEnter={(data) => setHoveredPoint(data.cluster)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    {clusterData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getClusterColor(entry.cluster)}
                        stroke={selectedCluster === entry.cluster ? '#000' : 'none'}
                        strokeWidth={selectedCluster === entry.cluster ? 3 : 0}
                        opacity={hoveredPoint && hoveredPoint !== entry.cluster ? 0.5 : 1}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Cluster Legend */}
            <div>
              <h4 className="font-semibold mb-4">Community Clusters</h4>
              <div className="space-y-3">
                {clusterData.map((cluster) => (
                  <div
                    key={cluster.cluster}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedCluster === cluster.cluster
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => handlePointClick(cluster)}
                    onMouseEnter={() => setHoveredPoint(cluster.cluster)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: getClusterColor(cluster.cluster) }}
                      ></div>
                      <span className="font-medium text-sm">{cluster.cluster}</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Members: {(cluster.members / 1000000).toFixed(1)}M</div>
                      <div>Hate Rate: {cluster.hate_rate}%</div>
                      <div>Success: {cluster.intervention_success}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Cluster Details */}
          {selectedCluster && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">
                {selectedCluster} - Detailed Analysis
              </h4>
              {(() => {
                const cluster = clusterData.find(c => c.cluster === selectedCluster);
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm text-gray-600">Total Members</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {(cluster.members / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm text-gray-600">Hate Speech Rate</div>
                        <div className={`text-2xl font-bold ${
                          cluster.hate_rate > 20 ? 'text-red-600' :
                          cluster.hate_rate > 10 ? 'text-orange-600' :
                          cluster.hate_rate > 5 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {cluster.hate_rate}%
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm text-gray-600">Success Rate</div>
                        <div className={`text-2xl font-bold ${
                          cluster.intervention_success > 80 ? 'text-green-600' :
                          cluster.intervention_success > 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {cluster.intervention_success}%
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm text-gray-600">Communities</div>
                        <div className="text-2xl font-bold text-purple-600">
                          {cluster.communities.length}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded border">
                        <h5 className="font-semibold mb-2">Example Communities</h5>
                        <div className="space-y-1">
                          {cluster.communities.map((community, idx) => (
                            <div key={idx} className="text-sm text-gray-700 font-mono">
                              {community}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded border">
                        <h5 className="font-semibold mb-2">Key Characteristics</h5>
                        <div className="space-y-1">
                          {cluster.characteristics.map((char, idx) => (
                            <div key={idx} className="text-sm text-gray-700 flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              {char}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Cluster Insights */}
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="font-semibold mb-4">Key Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-2 text-green-700">🎯 Most Effective Interventions</h5>
                <div className="space-y-2 text-sm">
                  <div>• <strong>Positive Communities:</strong> 95% success rate</div>
                  <div>• <strong>Intervention-Heavy:</strong> 87% success rate</div>
                  <div>• <strong>Counter-speech strategies</strong> work best in moderated environments</div>
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-red-700">⚠️ Highest Risk Areas</h5>
                <div className="space-y-2 text-sm">
                  <div>• <strong>Niche Toxic:</strong> 45.2% hate rate</div>
                  <div>• <strong>Low moderation</strong> correlates with higher toxicity</div>
                  <div>• <strong>Echo chambers</strong> resist intervention efforts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

