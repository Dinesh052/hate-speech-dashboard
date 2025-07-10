import React, { useState, Suspense, lazy } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer,
  LabelList
} from 'recharts';

const ForceGraph3D = lazy(() =>
  import('react-force-graph').then(mod => ({ default: mod.ForceGraph3D }))
);

const COLORS = {
  hate_speech: '#dc2626',
  offensive: '#ea580c',
  neither: '#059669'
};

export function ClassificationPieChart({ data }) {
  const chartData = [
    { name: 'Hate Speech', value: data.hate_speech.count, percentage: data.hate_speech.percentage, color: COLORS.hate_speech },
    { name: 'Offensive Language', value: data.offensive.count, percentage: data.offensive.percentage, color: COLORS.offensive },
    { name: 'Neither', value: data.neither.count, percentage: data.neither.percentage, color: COLORS.neither }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">Count: {data.value.toLocaleString()}</p>
          <p className="text-sm">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

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
  );
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
  );
}

export function TopWordsChart({ data }) {
  const hateWordList = [
    'bitch', 'faggot', 'nigga', 'fuck', 'nigger', 'fucking', 'trash', 'niggas'
  ];

  const filteredWords = data
    .filter(([word]) => hateWordList.includes(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const chartData = filteredWords.map(([word, count]) => ({ word, count }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Most Common Words in Hate Speech</CardTitle>
          <CardDescription>No hate/offensive words found in the data.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Common Words in Hate Speech</CardTitle>
        <CardDescription>Visual frequency of top hate/offensive words</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 14 }} />
              <YAxis dataKey="word" type="category" width={100} tick={{ fontSize: 16, fontWeight: 600 }} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="count" fill="#a21caf">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#dc2626", "#ea580c", "#a21caf", "#2563eb", "#059669", "#f59e42", "#8b5cf6", "#06b6d4", "#84cc16", "#f59e0b"][index % 10]} />
                ))}
                <LabelList dataKey="count" position="right" style={{ fontWeight: 700, fontSize: 16 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="hidden lg:block">
            <svg width="320" height="220">
              {chartData.map((d, i) => (
                <text
                  key={d.word}
                  x={40 + (i % 2) * 120 + Math.random() * 30}
                  y={60 + i * 20 + Math.random() * 10}
                  fontSize={24 + d.count / 10}
                  fontWeight="bold"
                  fill={["#dc2626", "#ea580c", "#a21caf", "#2563eb", "#059669", "#f59e42", "#8b5cf6", "#06b6d4", "#84cc16", "#f59e0b"][i % 10]}
                  opacity={0.8}
                >
                  {d.word}
                </text>
              ))}
            </svg>
            <div className="text-xs text-gray-400 text-center mt-2">Word cloud (size = frequency)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SentimentChart({ data }) {
  const chartData = [
    { sentiment: 'Very Negative', value: data.very_negative, color: '#dc2626' },
    { sentiment: 'Negative', value: data.negative, color: '#ea580c' },
    { sentiment: 'Neutral', value: data.neutral, color: '#6b7280' },
    { sentiment: 'Positive', value: data.positive, color: '#059669' },
    { sentiment: 'Very Positive', value: data.very_positive, color: '#10b981' }
  ];

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
  );
}

export function NetworkVisualization() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightedConnections, setHighlightedConnections] = useState(new Set());
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [nodePositions, setNodePositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate enhanced network data with realistic usernames and flagging data
  const generateNetworkData = () => {
    const users = [
      { id: 'u1', name: '@ToxicTyrant47', type: 'user', swearCount: 89, posts: 23, followers: 245, engagement: 'high', flagged: 12, reportedBy: 45 },
      { id: 'u2', name: '@HateMachine2024', type: 'user', swearCount: 76, posts: 18, followers: 156, engagement: 'medium', flagged: 15, reportedBy: 38 },
      { id: 'u3', name: '@RageQueen99', type: 'user', swearCount: 65, posts: 29, followers: 334, engagement: 'high', flagged: 8, reportedBy: 29 },
      { id: 'u4', name: '@TrollKing_Official', type: 'user', swearCount: 54, posts: 12, followers: 89, engagement: 'low', flagged: 18, reportedBy: 67 },
      { id: 'u5', name: '@AngryBirdNest', type: 'user', swearCount: 43, posts: 16, followers: 198, engagement: 'medium', flagged: 6, reportedBy: 23 },
      { id: 'u6', name: '@NormalNancy2024', type: 'user', swearCount: 8, posts: 45, followers: 567, engagement: 'high', flagged: 1, reportedBy: 3 },
      { id: 'u7', name: '@PeacefulPeter', type: 'user', swearCount: 2, posts: 38, followers: 892, engagement: 'high', flagged: 0, reportedBy: 1 },
      { id: 'u8', name: '@CounterSpeechSarah', type: 'user', swearCount: 5, posts: 52, followers: 1234, engagement: 'high', flagged: 0, reportedBy: 0 },
      { id: 'u9', name: '@ModerateMarvin', type: 'user', swearCount: 12, posts: 31, followers: 445, engagement: 'medium', flagged: 2, reportedBy: 5 },
      { id: 'u10', name: '@CommunityGuardian', type: 'user', swearCount: 0, posts: 67, followers: 2156, engagement: 'high', flagged: 0, reportedBy: 0 },
      { id: 'u11', name: '@FlameBaiter88', type: 'user', swearCount: 72, posts: 14, followers: 123, engagement: 'medium', flagged: 11, reportedBy: 41 },
      { id: 'u12', name: '@WholesomeWally', type: 'user', swearCount: 1, posts: 28, followers: 678, engagement: 'high', flagged: 0, reportedBy: 0 }
    ];

    const posts = [
      { id: 'p1', title: 'Hate post targeting minorities', type: 'post', category: 'hate', userId: 'u1', replies: 23, engagement: 156, flagged: 8 },
      { id: 'p2', title: 'Offensive language about politics', type: 'post', category: 'offensive', userId: 'u2', replies: 15, engagement: 89, flagged: 5 },
      { id: 'p3', title: 'Angry rant about society', type: 'post', category: 'hate', userId: 'u3', replies: 31, engagement: 234, flagged: 12 },
      { id: 'p4', title: 'Troll comment thread starter', type: 'post', category: 'offensive', userId: 'u4', replies: 8, engagement: 67, flagged: 6 },
      { id: 'p5', title: 'Rage about current events', type: 'post', category: 'hate', userId: 'u5', replies: 18, engagement: 123, flagged: 4 },
      { id: 'p6', title: 'Normal discussion about news', type: 'post', category: 'normal', userId: 'u6', replies: 42, engagement: 345, flagged: 0 },
      { id: 'p7', title: 'Peaceful message of unity', type: 'post', category: 'positive', userId: 'u7', replies: 67, engagement: 567, flagged: 0 },
      { id: 'p8', title: 'Counter-speech response', type: 'post', category: 'counter', userId: 'u8', replies: 89, engagement: 456, flagged: 0 },
      { id: 'p9', title: 'Moderate opinion piece', type: 'post', category: 'normal', userId: 'u9', replies: 25, engagement: 234, flagged: 1 },
      { id: 'p10', title: 'Community guidelines reminder', type: 'post', category: 'positive', userId: 'u10', replies: 134, engagement: 789, flagged: 0 },
      { id: 'p11', title: 'Inflammatory bait post', type: 'post', category: 'offensive', userId: 'u11', replies: 45, engagement: 178, flagged: 7 },
      { id: 'p12', title: 'Wholesome community content', type: 'post', category: 'positive', userId: 'u12', replies: 56, engagement: 378, flagged: 0 }
    ];

    const connections = [
      // User-Post authorship
      ...users.map(user => ({ from: user.id, to: posts.find(p => p.userId === user.id)?.id, type: 'authored' })).filter(c => c.to),
      
      // Reply connections (counter-speech users reply to hate posts)
      { from: 'u8', to: 'p1', type: 'replied' },
      { from: 'u8', to: 'p3', type: 'replied' },
      { from: 'u8', to: 'p5', type: 'replied' },
      { from: 'u10', to: 'p1', type: 'replied' },
      { from: 'u10', to: 'p2', type: 'replied' },
      { from: 'u10', to: 'p11', type: 'replied' },
      { from: 'u7', to: 'p1', type: 'replied' },
      { from: 'u7', to: 'p3', type: 'replied' },
      { from: 'u6', to: 'p3', type: 'replied' },
      { from: 'u9', to: 'p2', type: 'replied' },
      { from: 'u12', to: 'p1', type: 'replied' },
      { from: 'u12', to: 'p4', type: 'replied' },
      
      // User-User interactions (mentions, follows, etc.)
      { from: 'u1', to: 'u2', type: 'mentions' },
      { from: 'u2', to: 'u3', type: 'mentions' },
      { from: 'u3', to: 'u1', type: 'mentions' },
      { from: 'u4', to: 'u11', type: 'mentions' },
      { from: 'u11', to: 'u1', type: 'mentions' },
      { from: 'u8', to: 'u1', type: 'challenges' },
      { from: 'u8', to: 'u2', type: 'challenges' },
      { from: 'u8', to: 'u4', type: 'challenges' },
      { from: 'u10', to: 'u1', type: 'moderates' },
      { from: 'u10', to: 'u3', type: 'moderates' },
      { from: 'u10', to: 'u11', type: 'moderates' },
      { from: 'u7', to: 'u6', type: 'supports' },
      { from: 'u6', to: 'u9', type: 'supports' },
      { from: 'u12', to: 'u7', type: 'supports' },
      { from: 'u12', to: 'u8', type: 'supports' },
      
      // Cross-engagement and amplification
      { from: 'u4', to: 'u1', type: 'amplifies' },
      { from: 'u5', to: 'u3', type: 'amplifies' },
      { from: 'u11', to: 'u2', type: 'amplifies' },
      { from: 'u1', to: 'u11', type: 'amplifies' }
    ];

    return { users, posts, connections };
  };

  const { users, posts, connections } = generateNetworkData();
  const allNodes = [...users, ...posts];

  // Force-directed layout with dynamic repositioning and much larger spread
  const positionNodes = (nodes) => {
    const centerX = 1500; // Increased from 600
    const centerY = 1000; // Increased from 400
    const userRadius = 600; // Increased from 320
    const postRadius = 400; // Increased from 180
    
    return nodes.map((node) => {
      // Check if node has custom position from dragging
      if (nodePositions[node.id]) {
        return { ...node, x: nodePositions[node.id].x, y: nodePositions[node.id].y };
      }
      
      if (node.type === 'user') {
        const userIndex = users.findIndex(u => u.id === node.id);
        const angle = (userIndex / users.length) * 2 * Math.PI;
        
        // Group toxic users on one side, clean users on the other with more spread
        const isToxic = node.swearCount > 30 || node.flagged > 5;
        const radiusMultiplier = isToxic ? 1.4 : 0.8;
        const angleOffset = isToxic ? -Math.PI / 3 : Math.PI / 3;
        
        // Add more randomness for organic spread
        const randomOffset = (Math.random() - 0.5) * 160;
        const radiusWithOffset = userRadius * radiusMultiplier + randomOffset;
        
        const x = centerX + radiusWithOffset * Math.cos(angle + angleOffset);
        const y = centerY + radiusWithOffset * Math.sin(angle + angleOffset);
        return { ...node, x, y };
      } else {
        const postIndex = posts.findIndex(p => p.id === node.id);
        const angle = (postIndex / posts.length) * 2 * Math.PI;
        
        // Group posts by category with more spread
        const categoryOffset = {
          'hate': -Math.PI / 2.5,
          'offensive': -Math.PI / 4,
          'normal': 0,
          'positive': Math.PI / 4,
          'counter': Math.PI / 2.5
        };
        
        const offset = categoryOffset[node.category] || 0;
        const randomOffset = (Math.random() - 0.5) * 120;
        const radiusWithOffset = postRadius + randomOffset;
        
        const x = centerX + radiusWithOffset * Math.cos(angle + offset);
        const y = centerY + radiusWithOffset * Math.sin(angle + offset);
        return { ...node, x, y };
      }
    });
  };

  const positionedNodes = positionNodes(allNodes);

  // Enhanced node styling with dynamic sizing based on fullscreen mode
  const getNodeStyle = (node) => {
    // Scale factor for fullscreen mode to make nodes more readable
    const scaleFactor = isFullscreen ? 1.8 : 1.0;
    
    if (node.type === 'user') {
      const baseSize = 18 * scaleFactor; // Increased base size
      const swearMultiplier = 0.6 * scaleFactor;
      const flagMultiplier = 1.2 * scaleFactor;
      const size = Math.max(baseSize, Math.min(70 * scaleFactor, (node.swearCount * swearMultiplier) + (node.flagged * flagMultiplier) + baseSize));
      
      // Color based on flagging and swear count
      let color = '#059669'; // Default green for clean users
      if (node.flagged > 10 || node.swearCount > 60) color = '#dc2626'; // High toxicity - red
      else if (node.flagged > 5 || node.swearCount > 30) color = '#ea580c'; // Medium toxicity - orange
      else if (node.flagged > 2 || node.swearCount > 10) color = '#f59e0b'; // Low toxicity - yellow
      
      return { 
        size, 
        color, 
        strokeWidth: (node.engagement === 'high' ? 4 : 3) * scaleFactor,
        opacity: node.flagged > 5 ? 0.8 : 1,
        fontSize: (node.type === 'user' ? 13 : 11) * scaleFactor
      };
    } else {
      const baseSize = 12 * scaleFactor; // Increased base size for posts
      const engagementMultiplier = 0.05 * scaleFactor;
      const flagMultiplier = 2.0 * scaleFactor;
      const size = Math.max(baseSize, Math.min(35 * scaleFactor, (node.engagement * engagementMultiplier) + (node.flagged * flagMultiplier) + baseSize));
      
      const colors = {
        hate: '#dc2626',
        offensive: '#ea580c',
        normal: '#6b7280',
        positive: '#059669',
        counter: '#10b981'
      };
      
      return { 
        size, 
        color: colors[node.category] || '#6b7280', 
        strokeWidth: (node.flagged > 3 ? 4 : 3) * scaleFactor,
        opacity: node.flagged > 0 ? 0.7 : 1,
        fontSize: (node.type === 'user' ? 13 : 11) * scaleFactor
      };
    }
  };

  // Enhanced connection styling with fullscreen scaling
  const getConnectionStyle = (connection) => {
    const scaleFactor = isFullscreen ? 1.5 : 1.0;
    
    const styles = {
      authored: { color: '#3b82f6', width: 2.5 * scaleFactor, opacity: 0.8 },
      replied: { color: '#8b5cf6', width: 2.0 * scaleFactor, opacity: 0.7 },
      mentions: { color: '#f59e0b', width: 2.0 * scaleFactor, opacity: 0.6 },
      challenges: { color: '#ef4444', width: 2.5 * scaleFactor, opacity: 0.8 },
      moderates: { color: '#22c55e', width: 2.5 * scaleFactor, opacity: 0.8 },
      supports: { color: '#06b6d4', width: 2.0 * scaleFactor, opacity: 0.7 },
      amplifies: { color: '#a855f7', width: 1.5 * scaleFactor, opacity: 0.6 }
    };
    
    return styles[connection.type] || { color: '#6b7280', width: 1.5 * scaleFactor, opacity: 0.5 };
  };

  // Enhanced drag functionality with smooth animations and better performance
  const handleMouseDown = (e, node) => {
    if (e.button === 0) { // Left mouse button for node dragging
      e.preventDefault();
      e.stopPropagation();
      
      const svgElement = e.currentTarget.ownerSVGElement;
      const rect = svgElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom - panOffset.x;
      const y = (e.clientY - rect.top) / zoom - panOffset.y;
      
      setDraggedNode(node.id);
      setIsDragging(true);
      setDragOffset({
        x: x - node.x,
        y: y - node.y
      });
      
      // Prevent text selection during drag
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    }
  };

  // Pan functionality
  const handleBackgroundMouseDown = (e) => {
    if (e.button === 0 && !e.target.closest('circle') && !e.target.closest('text')) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y
      });
      document.body.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (draggedNode && isDragging) {
      e.preventDefault();
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom - panOffset.x - dragOffset.x;
      const y = (e.clientY - rect.top) / zoom - panOffset.y - dragOffset.y;
      
      // Much larger canvas with generous padding for unlimited dragging
      const padding = 200;
      const canvasWidth = 3000;
      const canvasHeight = 2000;
      const constrainedX = Math.max(padding, Math.min(canvasWidth - padding, x));
      const constrainedY = Math.max(padding, Math.min(canvasHeight - padding, y));
      
      // Immediate update for smooth dragging - no animation frame delays
      setNodePositions(prev => ({
        ...prev,
        [draggedNode]: { x: constrainedX, y: constrainedY }
      }));
      
    } else if (isPanning) {
      const newPanOffset = {
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      };
      setPanOffset(newPanOffset);
    }
  };

  const handleMouseUp = () => {
    if (draggedNode) {
      setDraggedNode(null);
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
      
      // Re-enable text selection
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    
    if (isPanning) {
      setIsPanning(false);
      document.body.style.cursor = '';
    }
  };

  // Fullscreen functionality
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Zoom functionality
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(0.3, zoom * delta), 3);
    setZoom(newZoom);
  };

  // Zoom controls
  const zoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const resetZoom = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleNodeClick = (e, node) => {
    // Don't select if we just finished dragging
    if (isDragging) {
      e.preventDefault();
      return;
    }
    
    if (selectedNode === node.id) {
      setSelectedNode(null);
      setHighlightedConnections(new Set());
    } else {
      setSelectedNode(node.id);
      // Highlight connections involving this node
      const nodeConnections = connections.filter(c => c.from === node.id || c.to === node.id);
      setHighlightedConnections(new Set(nodeConnections.map((_, i) => 
        connections.findIndex(conn => conn === nodeConnections[i])
      )));
    }
  };

  const topToxicUsers = users
    .sort((a, b) => (b.swearCount + b.flagged * 5) - (a.swearCount + a.flagged * 5))
    .slice(0, 5);

  const mostFlaggedUsers = users
    .sort((a, b) => b.flagged - a.flagged)
    .slice(0, 5);

  const networkStats = {
    totalUsers: users.length,
    totalPosts: posts.length,
    totalConnections: connections.length,
    avgSwearCount: Math.round(users.reduce((sum, u) => sum + u.swearCount, 0) / users.length),
    toxicUsers: users.filter(u => u.swearCount > 40 || u.flagged > 5).length,
    cleanUsers: users.filter(u => u.swearCount <= 10 && u.flagged <= 1).length,
    totalFlags: users.reduce((sum, u) => sum + u.flagged, 0) + posts.reduce((sum, p) => sum + p.flagged, 0),
    avgFlags: Math.round((users.reduce((sum, u) => sum + u.flagged, 0) + posts.reduce((sum, p) => sum + p.flagged, 0)) / (users.length + posts.length))
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Twitter Network Analysis</CardTitle>
        <CardDescription>Interactive network showing users, posts, and their connections. Node size indicates swear frequency.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Network Graph */}
          <div className={`flex-1 ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border overflow-hidden shadow-inner h-full">
              {/* Enhanced Control Panel */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="bg-white shadow-lg border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7V3h4m14 0h-4v4M7 21H3v-4m18 0v4h-4"/>
                    </svg>
                  )}
                </button>
                <button
                  onClick={zoomIn}
                  className="bg-white shadow-lg border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors"
                  title="Zoom In"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button
                  onClick={zoomOut}
                  className="bg-white shadow-lg border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors"
                  title="Zoom Out"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button
                  onClick={resetZoom}
                  className="bg-white shadow-lg border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors"
                  title="Reset Zoom"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </button>
              </div>
              
              <svg 
                width="3000" 
                height="2000" 
                viewBox="0 0 3000 2000" 
                className="w-full h-auto"
                style={{ cursor: isDragging ? 'grabbing' : isPanning ? 'grabbing' : 'grab' }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseDown={handleBackgroundMouseDown}
                onWheel={handleWheel}
              >
                {/* Main graph group with zoom and pan transform */}
                <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoom})`}>
                {/* Enhanced background with gradient and patterns for larger canvas */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="shadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.2"/>
                  </filter>
                  <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.3"/>
                  </radialGradient>
                </defs>
                
                <rect width="100%" height="100%" fill="url(#bgGradient)" />
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Draw connections with enhanced styling */}
                {connections.map((connection, index) => {
                  const fromNode = positionedNodes.find(n => n.id === connection.from);
                  const toNode = positionedNodes.find(n => n.id === connection.to);
                  if (!fromNode || !toNode) return null;
                  
                  const style = getConnectionStyle(connection);
                  const isHighlighted = highlightedConnections.has(index);
                  
                  // Calculate connection midpoint for connection indicators
                  const midX = (fromNode.x + toNode.x) / 2;
                  const midY = (fromNode.y + toNode.y) / 2;
                  
                  return (
                    <g key={index}>
                      {/* Connection line */}
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={style.color}
                        strokeWidth={isHighlighted ? style.width * 2.5 : style.width}
                        opacity={isHighlighted ? 0.9 : style.opacity}
                        className="transition-all duration-500 ease-out"
                        filter={isHighlighted ? "url(#glow)" : "none"}
                        strokeDasharray={connection.type === 'challenges' ? '5,5' : 'none'}
                      />
                      
                      {/* Connection type indicator with dynamic sizing */}
                      {isHighlighted && (
                        <g>
                          <circle
                            cx={midX}
                            cy={midY}
                            r={isFullscreen ? 12 : 8}
                            fill={style.color}
                            stroke="#fff"
                            strokeWidth={isFullscreen ? 3 : 2}
                            opacity="0.8"
                            className="transition-all duration-300"
                          />
                          <text
                            x={midX}
                            y={midY + (isFullscreen ? 30 : 20)}
                            textAnchor="middle"
                            fontSize={isFullscreen ? 14 : 10}
                            fontWeight="bold"
                            fill={style.color}
                            className="pointer-events-none select-none"
                          >
                            {connection.type}
                          </text>
                        </g>
                      )}
                      
                      {/* Directional arrow for certain connection types with dynamic sizing */}
                      {(connection.type === 'challenges' || connection.type === 'moderates') && (
                        <polygon
                          points={`${toNode.x - (isFullscreen ? 12 : 8)},${toNode.y - (isFullscreen ? 6 : 4)} ${toNode.x - (isFullscreen ? 12 : 8)},${toNode.y + (isFullscreen ? 6 : 4)} ${toNode.x - (isFullscreen ? 3 : 2)},${toNode.y}`}
                          fill={style.color}
                          opacity={isHighlighted ? 0.9 : 0.6}
                          className="transition-all duration-300"
                        />
                      )}
                    </g>
                  );
                })}
                
                {/* Draw nodes with enhanced styling */}
                {positionedNodes.map((node) => {
                  const style = getNodeStyle(node);
                  const isSelected = selectedNode === node.id;
                  const isBeingDragged = draggedNode === node.id;
                  const isConnectedToSelected = selectedNode && connections.some(c => 
                    (c.from === selectedNode && c.to === node.id) || 
                    (c.to === selectedNode && c.from === node.id)
                  );
                  
                  return (
                    <g key={node.id} className="transition-all duration-300">
                      {/* Node shadow for depth */}
                      <circle
                        cx={node.x + 3}
                        cy={node.y + 3}
                        r={isSelected ? style.size * 1.5 : isBeingDragged ? style.size * 1.3 : style.size}
                        fill="rgba(0,0,0,0.15)"
                        className="transition-all duration-300 ease-out"
                      />
                      
                      {/* Selection/connection highlight ring */}
                      {(isSelected || isConnectedToSelected) && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={style.size * 1.8}
                          fill="none"
                          stroke={isSelected ? "#3b82f6" : "#10b981"}
                          strokeWidth="3"
                          opacity="0.6"
                          className="transition-all duration-300 animate-pulse"
                        />
                      )}
                      
                      {/* Node circle with smooth transitions */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? style.size * 1.5 : isBeingDragged ? style.size * 1.3 : style.size}
                        fill={style.color}
                        stroke={isSelected ? "#3b82f6" : "#fff"}
                        strokeWidth={isSelected ? style.strokeWidth * 2 : style.strokeWidth}
                        opacity={style.opacity}
                        className="hover:opacity-90"
                        filter={isSelected ? "url(#shadow)" : "none"}
                        style={{ 
                          cursor: isBeingDragged ? 'grabbing' : 'grab',
                          transition: isDragging ? 'none' : 'all 0.2s ease-out'
                        }}
                        onMouseDown={(e) => handleMouseDown(e, node)}
                        onClick={(e) => handleNodeClick(e, node)}
                      />
                      
                      {/* Node label with dynamic sizing */}
                      <text
                        x={node.x}
                        y={node.y + style.size + (isFullscreen ? 30 : 22)}
                        textAnchor="middle"
                        fontSize={style.fontSize}
                        fontWeight={node.type === 'user' ? 'bold' : 'normal'}
                        fill={isSelected ? "#1f2937" : "#374151"}
                        className="pointer-events-none select-none transition-all duration-300"
                        opacity={isSelected ? 1 : 0.8}
                      >
                        {node.type === 'user' ? 
                          node.name.length > (isFullscreen ? 20 : 15) ? node.name.substring(0, isFullscreen ? 20 : 15) + '...' : node.name :
                          node.title.length > (isFullscreen ? 25 : 18) ? node.title.substring(0, isFullscreen ? 25 : 18) + '...' : node.title
                        }
                      </text>
                      
                      {/* Secondary label for context with dynamic sizing */}
                      {node.type === 'user' && isSelected && (
                        <text
                          x={node.x}
                          y={node.y + style.size + (isFullscreen ? 50 : 36)}
                          textAnchor="middle"
                          fontSize={isFullscreen ? 12 : 8}
                          fill="#6b7280"
                          className="pointer-events-none select-none"
                        >
                          {node.posts} posts • {node.followers} followers
                        </text>
                      )}
                      
                      {/* Toxicity indicator for users with dynamic sizing */}
                      {node.type === 'user' && (node.swearCount > 20 || node.flagged > 3) && (
                        <text
                          x={node.x}
                          y={node.y + 6}
                          textAnchor="middle"
                          fontSize={isFullscreen ? 14 : 10}
                          fontWeight="bold"
                          fill="#fff"
                          className="pointer-events-none select-none"
                        >
                          {node.swearCount}
                        </text>
                      )}
                      
                      {/* Enhanced flag indicator with dynamic sizing */}
                      {node.flagged > 0 && (
                        <g>
                          <circle
                            cx={node.x + style.size * 0.7}
                            cy={node.y - style.size * 0.7}
                            r={isFullscreen ? 16 : 10}
                            fill="#ef4444"
                            stroke="#fff"
                            strokeWidth={isFullscreen ? 3 : 2}
                            className="pointer-events-none animate-pulse"
                          />
                          <text
                            x={node.x + style.size * 0.7}
                            y={node.y - style.size * 0.7 + (isFullscreen ? 5 : 3)}
                            textAnchor="middle"
                            fontSize={isFullscreen ? 12 : 8}
                            fontWeight="bold"
                            fill="#fff"
                            className="pointer-events-none select-none"
                          >
                            {node.flagged}
                          </text>
                        </g>
                      )}
                      
                      {/* Content category indicator for posts with dynamic sizing */}
                      {node.type === 'post' && (
                        <rect
                          x={node.x - (isFullscreen ? 8 : 6)}
                          y={node.y - style.size - (isFullscreen ? 12 : 8)}
                          width={isFullscreen ? 16 : 12}
                          height={isFullscreen ? 8 : 6}
                          fill={style.color}
                          rx={isFullscreen ? 3 : 2}
                          opacity="0.8"
                          className="pointer-events-none"
                        />
                      )}
                    </g>
                  );
                })}
                
                {/* Enhanced Network information overlay - responsive sizing */}
                <g opacity="0.8">
                  {isFullscreen ? (
                    // Larger overlay for fullscreen mode
                    <>
                      <rect x="30" y="30" width="380" height="140" fill="#fff" stroke="#e5e7eb" strokeWidth="2" rx="12" opacity="0.95"/>
                      <text x="50" y="60" fontSize="18" fontWeight="bold" fill="#374151">Network Overview</text>
                      <text x="50" y="85" fontSize="14" fill="#6b7280">
                        {users.filter(u => u.swearCount > 40).length} Toxic Users • {users.filter(u => u.flagged === 0).length} Clean Users
                      </text>
                      <text x="50" y="105" fontSize="14" fill="#6b7280">
                        {connections.length} Connections • {posts.filter(p => p.flagged > 0).length} Flagged Posts
                      </text>
                      <text x="50" y="125" fontSize="14" fill="#6b7280">
                        Network Density: {Math.round((connections.length / (allNodes.length * (allNodes.length - 1))) * 10000) / 100}%
                      </text>
                      <text x="50" y="145" fontSize="12" fill="#10b981" fontWeight="bold">
                        ✓ Enhanced Readability Mode
                      </text>
                    </>
                  ) : (
                    // Standard overlay for normal mode
                    <>
                      <rect x="20" y="20" width="320" height="100" fill="#fff" stroke="#e5e7eb" strokeWidth="1" rx="8" opacity="0.9"/>
                      <text x="35" y="45" fontSize="16" fontWeight="bold" fill="#374151">Network Overview</text>
                      <text x="35" y="65" fontSize="13" fill="#6b7280">
                        {users.filter(u => u.swearCount > 40).length} Toxic Users • {users.filter(u => u.flagged === 0).length} Clean Users
                      </text>
                      <text x="35" y="85" fontSize="13" fill="#6b7280">
                        {connections.length} Connections • {posts.filter(p => p.flagged > 0).length} Flagged Posts
                      </text>
                      <text x="35" y="105" fontSize="12" fill="#6b7280">
                        Network Density: {Math.round((connections.length / (allNodes.length * (allNodes.length - 1))) * 10000) / 100}%
                      </text>
                    </>
                  )}
                </g>
                </g> {/* Close main graph group */}
              </svg>
            </div>
          </div>

          {/* Side Panel - hidden in fullscreen mode */}
          {!isFullscreen && (
            <div className="w-full lg:w-80 space-y-4">
            {/* Legend */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3">Legend</h4>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 mb-2">User Toxicity Levels:</div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                  <span className="text-sm">High Toxicity (30+ swears)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Medium Toxicity (15-30 swears)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Low Toxicity (5-15 swears)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm">Clean Users (&lt;5 swears)</span>
                </div>
                
                <div className="mt-3 pt-2 border-t">
                  <div className="text-sm font-medium text-gray-700 mb-2">Connection Types:</div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-4 h-0.5 bg-blue-600"></div>
                    <span className="text-sm">Authored</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-4 h-0.5 bg-purple-600"></div>
                    <span className="text-sm">Replied</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-4 h-0.5 bg-red-500"></div>
                    <span className="text-sm">Challenges</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-4 h-0.5 bg-green-500"></div>
                    <span className="text-sm">Moderates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 bg-yellow-500"></div>
                    <span className="text-sm">Mentions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Toxic Users */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3">Most Toxic Users</h4>
              <div className="space-y-2">
                {topToxicUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium truncate">{user.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-red-600 font-bold">{user.swearCount}</div>
                      <div className="text-red-500 text-xs">{user.flagged} flags</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Flagged Users */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3">Most Flagged Users</h4>
              <div className="space-y-2">
                {mostFlaggedUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium truncate">{user.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-600 font-bold">{user.flagged}</div>
                      <div className="text-gray-500 text-xs">{user.reportedBy} reports</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Node Details */}
            {selectedNode && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Selected Node Details</h4>
                {(() => {
                  const node = positionedNodes.find(n => n.id === selectedNode);
                  if (!node) return null;
                  
                  return (
                    <div className="space-y-2 text-sm">
                      <div><strong>Type:</strong> {node.type}</div>
                      <div><strong>Name:</strong> {node.name || node.title}</div>
                      {node.type === 'user' && (
                        <>
                          <div><strong>Swear Count:</strong> <span className="text-red-600">{node.swearCount}</span></div>
                          <div><strong>Times Flagged:</strong> <span className="text-orange-600">{node.flagged}</span></div>
                          <div><strong>Reported By:</strong> {node.reportedBy} users</div>
                          <div><strong>Posts:</strong> {node.posts}</div>
                          <div><strong>Followers:</strong> {node.followers.toLocaleString()}</div>
                          <div><strong>Engagement:</strong> {node.engagement}</div>
                        </>
                      )}
                      {node.type === 'post' && (
                        <>
                          <div><strong>Category:</strong> <span className={`font-medium ${node.category === 'hate' ? 'text-red-600' : node.category === 'offensive' ? 'text-orange-600' : node.category === 'positive' ? 'text-green-600' : 'text-gray-600'}`}>{node.category}</span></div>
                          <div><strong>Times Flagged:</strong> <span className="text-orange-600">{node.flagged}</span></div>
                          <div><strong>Replies:</strong> {node.replies}</div>
                          <div><strong>Engagement:</strong> {node.engagement}</div>
                          <div><strong>Author:</strong> {users.find(u => u.id === node.userId)?.name}</div>
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Network Statistics */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Network Statistics</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="font-medium text-gray-600">Total Users</div>
                  <div className="text-lg font-bold">{networkStats.totalUsers}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Total Posts</div>
                  <div className="text-lg font-bold">{networkStats.totalPosts}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Connections</div>
                  <div className="text-lg font-bold">{networkStats.totalConnections}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Avg Swears</div>
                  <div className="text-lg font-bold">{networkStats.avgSwearCount}</div>
                </div>
                <div>
                  <div className="font-medium text-red-600">Toxic Users</div>
                  <div className="text-lg font-bold text-red-600">{networkStats.toxicUsers}</div>
                </div>
                <div>
                  <div className="font-medium text-green-600">Clean Users</div>
                  <div className="text-lg font-bold text-green-600">{networkStats.cleanUsers}</div>
                </div>
                <div>
                  <div className="font-medium text-orange-600">Total Flags</div>
                  <div className="text-lg font-bold text-orange-600">{networkStats.totalFlags}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Avg Flags</div>
                  <div className="text-lg font-bold">{networkStats.avgFlags}</div>
                </div>
              </div>
            </div>

            {/* Interaction Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">How to Interact</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <div>🖱️ <strong>Click</strong> any node to view details</div>
                <div>🖱️ <strong>Drag</strong> nodes to reposition them</div>
                <div>�️ <strong>Drag background</strong> to pan around</div>
                <div>🔍 <strong>Mouse wheel</strong> to zoom in/out</div>
                <div>🎛️ <strong>Zoom controls</strong> in top-right corner</div>
                <div>�📏 <strong>Size</strong> indicates toxicity level</div>
                <div>🔗 <strong>Lines</strong> show relationships</div>
                <div>🚩 <strong>Red badges</strong> show flag counts</div>
                <div>🎨 <strong>Colors</strong> indicate user types</div>
                <div>💫 <strong>Connected nodes</strong> adjust automatically</div>
                <div>🖥️ <strong>Fullscreen mode</strong> for unlimited space</div>
              </div>
            </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
