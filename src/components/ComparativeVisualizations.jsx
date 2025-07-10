import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area, ScatterChart, Scatter, Cell, PieChart, Pie } from 'recharts'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'

export function PlatformComparisonChart({ data }) {
  const comparisonData = [
    {
      metric: 'Volume',
      Twitter: data.volume.twitter,
      Reddit: data.volume.reddit
    },
    {
      metric: 'Hate Speech Rate (%)',
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
            <Tooltip formatter={(value, name) => {
              if (name.includes('Rate')) return [`${value}%`, name];
              return [value.toLocaleString(), name];
            }} />
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
      characteristic: 'Brevity',
      Twitter: 95,
      Reddit: 30,
      fullMark: 100
    },
    {
      characteristic: 'Virality',
      Twitter: 85,
      Reddit: 65,
      fullMark: 100
    },
    {
      characteristic: 'Moderation',
      Twitter: 60,
      Reddit: 70,
      fullMark: 100
    },
    {
      characteristic: 'User Intervention',
      Twitter: 30,
      Reddit: 85,
      fullMark: 100
    },
    {
      characteristic: 'Real-time',
      Twitter: 90,
      Reddit: 50,
      fullMark: 100
    },
    {
      characteristic: 'Anonymity',
      Twitter: 40,
      Reddit: 80,
      fullMark: 100
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
            <PolarAngleAxis dataKey="characteristic" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Twitter" dataKey="Twitter" stroke="#1da1f2" fill="#1da1f2" fillOpacity={0.3} strokeWidth={2} />
            <Radar name="Reddit" dataKey="Reddit" stroke="#ff4500" fill="#ff4500" fillOpacity={0.3} strokeWidth={2} />
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
          <BarChart data={interventionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="strategy" angle={-45} textAnchor="end" height={100} />
            <YAxis domain={[0, 100]} />
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
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  
  // World map topology URL
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  
  // Enhanced country data with coordinates for markers
  const countryData = [
    { 
      name: 'United States', 
      coordinates: [-95.7129, 37.0902], 
      hate_rate: 8.2, 
      volume: 45230, 
      severity: 'high',
      incidents: 1250,
      population: 331000000,
      region: 'North America',
      trending: 'up'
    },
    { 
      name: 'Canada', 
      coordinates: [-106.3468, 56.1304], 
      hate_rate: 4.1, 
      volume: 8940, 
      severity: 'medium',
      incidents: 380,
      population: 38000000,
      region: 'North America',
      trending: 'down'
    },
    { 
      name: 'United Kingdom', 
      coordinates: [-3.4360, 55.3781], 
      hate_rate: 6.7, 
      volume: 12850, 
      severity: 'medium',
      incidents: 920,
      population: 67000000,
      region: 'Europe',
      trending: 'stable'
    },
    { 
      name: 'Germany', 
      coordinates: [10.4515, 51.1657], 
      hate_rate: 3.9, 
      volume: 9200, 
      severity: 'low',
      incidents: 540,
      population: 83000000,
      region: 'Europe',
      trending: 'down'
    },
    { 
      name: 'France', 
      coordinates: [2.2137, 46.2276], 
      hate_rate: 5.3, 
      volume: 10750, 
      severity: 'medium',
      incidents: 670,
      population: 67000000,
      region: 'Europe',
      trending: 'stable'
    },
    { 
      name: 'India', 
      coordinates: [78.9629, 20.5937], 
      hate_rate: 12.1, 
      volume: 28600, 
      severity: 'high',
      incidents: 2100,
      population: 1380000000,
      region: 'Asia',
      trending: 'up'
    },
    { 
      name: 'Japan', 
      coordinates: [138.2529, 36.2048], 
      hate_rate: 2.8, 
      volume: 6100, 
      severity: 'low',
      incidents: 180,
      population: 126000000,
      region: 'Asia',
      trending: 'down'
    },
    { 
      name: 'Australia', 
      coordinates: [133.7751, -25.2744], 
      hate_rate: 5.8, 
      volume: 7300, 
      severity: 'medium',
      incidents: 420,
      population: 25000000,
      region: 'Oceania',
      trending: 'stable'
    },
    { 
      name: 'Brazil', 
      coordinates: [-51.9253, -14.2350], 
      hate_rate: 9.4, 
      volume: 15200, 
      severity: 'high',
      incidents: 1400,
      population: 212000000,
      region: 'South America',
      trending: 'up'
    },
    { 
      name: 'South Africa', 
      coordinates: [22.9375, -30.5595], 
      hate_rate: 7.6, 
      volume: 4800, 
      severity: 'medium',
      incidents: 350,
      population: 59000000,
      region: 'Africa',
      trending: 'stable'
    },
    { 
      name: 'Russia', 
      coordinates: [105.3188, 61.5240], 
      hate_rate: 6.3, 
      volume: 11200, 
      severity: 'medium',
      incidents: 780,
      population: 146000000,
      region: 'Europe/Asia',
      trending: 'up'
    },
    { 
      name: 'China', 
      coordinates: [104.1954, 35.8617], 
      hate_rate: 4.2, 
      volume: 18500, 
      severity: 'medium',
      incidents: 890,
      population: 1440000000,
      region: 'Asia',
      trending: 'stable'
    }
  ];

  const getMarkerColor = (hate_rate) => {
    if (hate_rate >= 10) return '#dc2626'; // High - Red
    if (hate_rate >= 7) return '#ea580c';  // Medium-High - Orange
    if (hate_rate >= 5) return '#f59e0b';  // Medium - Yellow
    if (hate_rate >= 3) return '#84cc16';  // Low-Medium - Light Green
    return '#059669';                      // Low - Green
  };

  const getMarkerSize = (volume) => {
    if (volume >= 30000) return 20;
    if (volume >= 15000) return 16;
    if (volume >= 10000) return 14;
    if (volume >= 5000) return 12;
    return 10;
  };

  const handleMouseEnter = (country, event) => {
    setTooltip({
      show: true,
      content: country,
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, content: '', x: 0, y: 0 });
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(selectedCountry?.name === country.name ? null : country);
  };

  const getTrendingIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive World Map - Hate Speech Distribution</CardTitle>
        <CardDescription>
          Click on countries or markers to view detailed information. Pin size indicates volume, color indicates severity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Interactive World Map */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <ComposableMap
              projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147
              }}
              style={{ width: '100%', height: '500px' }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryMatch = countryData.find(
                        country => country.name === geo.properties.NAME || 
                                 country.name === geo.properties.NAME_LONG
                      );
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={countryMatch ? getMarkerColor(countryMatch.hate_rate) : "#D6D6DA"}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: { 
                              outline: "none",
                              transition: "all 0.3s ease"
                            },
                            hover: { 
                              outline: "none",
                              fill: countryMatch ? "#6366f1" : "#9CA3AF",
                              cursor: "pointer"
                            },
                            pressed: { 
                              outline: "none",
                              fill: "#4F46E5"
                            }
                          }}
                          onMouseEnter={(event) => {
                            if (countryMatch) {
                              handleMouseEnter(countryMatch, event);
                            }
                          }}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => {
                            if (countryMatch) {
                              handleCountryClick(countryMatch);
                            }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                
                {/* Country Markers/Pins */}
                {countryData.map((country) => (
                  <Marker
                    key={country.name}
                    coordinates={country.coordinates}
                    onClick={() => handleCountryClick(country)}
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    <circle
                      r={getMarkerSize(country.volume)}
                      fill={getMarkerColor(country.hate_rate)}
                      stroke="#fff"
                      strokeWidth={2}
                      opacity={0.8}
                      style={{
                        filter: selectedCountry?.name === country.name ? 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' : 'none'
                      }}
                      onMouseEnter={(event) => handleMouseEnter(country, event)}
                      onMouseLeave={handleMouseLeave}
                    />
                    <text
                      y={getMarkerSize(country.volume) + 15}
                      textAnchor="middle"
                      fill="#374151"
                      fontSize="12"
                      fontWeight="bold"
                      style={{
                        pointerEvents: 'none',
                        textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
                      }}
                    >
                      {country.hate_rate}%
                    </text>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Tooltip */}
          {tooltip.show && (
            <div
              className="fixed bg-white p-3 border rounded shadow-lg z-50 pointer-events-none"
              style={{
                left: tooltip.x + 10,
                top: tooltip.y - 10,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="text-sm font-semibold">{tooltip.content.name}</div>
              <div className="text-xs text-gray-600">
                Hate Rate: {tooltip.content.hate_rate}% | Volume: {tooltip.content.volume?.toLocaleString()}
              </div>
            </div>
          )}

          {/* Map Legend */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-3">Map Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-medium mb-2">Hate Rate Colors:</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span className="text-xs">High (&gt;10%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-xs">Med-High (7-10%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-xs">Medium (5-7%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <span className="text-xs">Low (&lt;5%)</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Pin Sizes:</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                    <span className="text-xs">30K+ volume</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-xs">15K+ volume</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-xs">10K+ volume</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-xs">&lt;10K volume</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Trends:</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span>📈</span>
                    <span className="text-xs">Increasing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📉</span>
                    <span className="text-xs">Decreasing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>➡️</span>
                    <span className="text-xs">Stable</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Interaction:</div>
                <div className="space-y-1 text-xs">
                  <div>🖱️ Click pins for details</div>
                  <div>🔍 Zoom with mouse wheel</div>
                  <div>🗺️ Countries are color-coded</div>
                  <div>📍 Pin size = volume</div>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Country Details */}
          {selectedCountry && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                🗺️ {selectedCountry.name} - Detailed Analysis
                <span className="text-sm font-normal">
                  {getTrendingIcon(selectedCountry.trending)} {selectedCountry.trending}
                </span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded border">
                  <div className="text-sm text-gray-600">Hate Speech Rate</div>
                  <div className={`text-2xl font-bold ${
                    selectedCountry.hate_rate >= 10 ? 'text-red-600' :
                    selectedCountry.hate_rate >= 7 ? 'text-orange-600' :
                    selectedCountry.hate_rate >= 5 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {selectedCountry.hate_rate}%
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-sm text-gray-600">Total Volume</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedCountry.volume.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-sm text-gray-600">Incidents</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedCountry.incidents.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-sm text-gray-600">Population</div>
                  <div className="text-2xl font-bold text-gray-600">
                    {(selectedCountry.population / 1000000).toFixed(0)}M
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Severity Level</div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCountry.severity === 'high' ? 'bg-red-100 text-red-800' :
                    selectedCountry.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedCountry.severity.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Region</div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {selectedCountry.region}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-1">Rate per 100K Population</div>
                <div className="text-lg font-semibold text-indigo-600">
                  {((selectedCountry.incidents / selectedCountry.population) * 100000).toFixed(1)} incidents per 100K
                </div>
              </div>
            </div>
          )}

          {/* Country Rankings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3">🔥 Highest Hate Speech Rates</h4>
              <div className="space-y-2">
                {countryData
                  .sort((a, b) => b.hate_rate - a.hate_rate)
                  .slice(0, 5)
                  .map((country, index) => (
                    <div 
                      key={country.name}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                        selectedCountry?.name === country.name ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleCountryClick(country)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{country.name}</span>
                        <span className="text-sm">{getTrendingIcon(country.trending)}</span>
                      </div>
                      <div className="text-red-600 font-bold">
                        {country.hate_rate}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3">📊 Highest Volume Countries</h4>
              <div className="space-y-2">
                {countryData
                  .sort((a, b) => b.volume - a.volume)
                  .slice(0, 5)
                  .map((country, index) => (
                    <div 
                      key={country.name}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                        selectedCountry?.name === country.name ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleCountryClick(country)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{country.name}</span>
                        <span className="text-sm">{getTrendingIcon(country.trending)}</span>
                      </div>
                      <div className="text-blue-600 font-bold">
                        {country.volume.toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

