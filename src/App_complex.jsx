import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Shield } from 'lucide-react'
import './App.css'

// Navigation Component
function Navigation() {
  return (
    <motion.nav 
      className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex-shrink-0 flex items-center">
              <motion.div
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="h-6 w-6 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hate Speech Analytics
              </h1>
            </div>
          </motion.div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors">
              <Info className="h-4 w-4 mr-2" />
              About
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-colors">
              <ExternalLink className="h-4 w-4 mr-2" />
              Documentation
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// Dashboard Overview Component
function Dashboard({ data }) {
  if (!data) return <div>Loading...</div>

  const twitterData = data.twitter
  const redditData = data.reddit

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Hate Speech Analytics Dashboard</h2>
        <p className="text-lg opacity-90">
          Comprehensive analysis of hate speech patterns across Twitter and Reddit platforms
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts Analyzed</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(twitterData.total_tweets + redditData.total_posts).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Twitter & Reddit combined
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hate Speech Detected</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{(twitterData.classification.hate_speech.count + redditData.subreddits.reduce((total, sub) => total + sub.hate_count, 0)).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {twitterData.classification.hate_speech.percentage}% of Twitter posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platforms Monitored</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Twitter & Reddit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intervention Success</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{redditData.success_rate}%</div>
            <p className="text-xs text-muted-foreground">
              Effective responses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Twitter Analysis</CardTitle>
            <CardDescription>
              Analysis of {twitterData.total_tweets.toLocaleString()} tweets with hate speech detection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Hate Speech</span>
                <span className="text-sm text-red-600">{twitterData.classification.hate_speech.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${twitterData.classification.hate_speech.percentage}%` }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Offensive Language</span>
                <span className="text-sm text-orange-600">{twitterData.classification.offensive.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${twitterData.classification.offensive.percentage}%` }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Neither</span>
                <span className="text-sm text-green-600">{twitterData.classification.neither.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${twitterData.classification.neither.percentage}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reddit Analysis</CardTitle>
            <CardDescription>
              Analysis of conversation threads with intervention responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Conversations Analyzed</span>
                <span className="text-sm font-bold">{redditData.total_conversations.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Hate Speech Identified</span>
                <span className="text-sm text-red-600">{redditData.hate_speech_conversations.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Intervention Responses</span>
                <span className="text-sm text-blue-600">{redditData.total_responses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-sm text-green-600">{redditData.success_rate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Twitter Analysis Component
function TwitterAnalysis({ data }) {
  if (!data) return <div>Loading...</div>

  const twitterData = data.twitter

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Twitter Analysis</h2>
        <Button variant="outline">
          Export Data
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ClassificationPieChart data={twitterData.classification} />
            <TimelineChart data={twitterData.timeline} />
          </div>
        </TabsContent>
        
        <TabsContent value="patterns" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopWordsChart data={twitterData.top_words} />
            <UserPatternsChart data={twitterData.user_patterns} />
          </div>
        </TabsContent>
        
        <TabsContent value="sentiment" className="space-y-4">
          <SentimentChart data={twitterData.sentiment} />
        </TabsContent>
        
        <TabsContent value="network" className="space-y-4">
          <NetworkVisualization data={twitterData.user_interaction_network} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Reddit Analysis Component
function RedditAnalysis({ data }) {
  if (!data) return <div>Loading...</div>

  const redditData = data.reddit

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reddit Analysis</h2>
        <Button variant="outline">
          Export Data
        </Button>
      </div>
      
      <Tabs defaultValue="conversations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="subreddits">Subreddits</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConversationFlowDiagram data={redditData.conversation_flow} />
            <ConversationDepthChart data={redditData.conversation_depth} />
          </div>
        </TabsContent>
        
        <TabsContent value="subreddits" className="space-y-4">
          <SubredditAnalysis data={redditData.subreddits} />
        </TabsContent>
        
        <TabsContent value="interventions" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <InterventionEffectiveness data={redditData.intervention_effectiveness} />
            <InterventionTypesChart />
          </div>
        </TabsContent>
        
        <TabsContent value="communities" className="space-y-4">
          <CommunityClusteringAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Comparative Analysis Component
function ComparativeAnalysis({ data }) {
  if (!data) return <div>Loading...</div>

  const comparativeData = data.comparative

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Comparative Analysis</h2>
        <Button variant="outline">
          Export Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformComparisonChart data={comparativeData.platform_comparison} />
        <CrossPlatformTrends data={comparativeData.cross_platform_trends} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InterventionEffectivenessComparison data={comparativeData.intervention_strategies} />
        <HateSpeechEvolutionChart data={comparativeData.hate_speech_evolution} />
      </div>
      
      <GeographicHeatMap data={comparativeData.geographic_distribution} />
    </div>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Hate Speech Analytics Dashboard
        </h1>
        <p className="text-gray-600 mb-4">
          System is initializing...
        </p>
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}

export default App

