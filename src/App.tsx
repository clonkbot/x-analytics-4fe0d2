import { useState, useEffect } from 'react';
import { ProfileCard } from './components/ProfileCard';
import { DailyPosts } from './components/DailyPosts';
import { EngagementGauge } from './components/EngagementGauge';
import { HandleInput } from './components/HandleInput';
import './styles.css';

// Mock data generator based on handle
const generateMockData = (handle: string) => {
  const seed = handle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (min: number, max: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };

  const followers = random(1000, 500000);
  const following = random(100, 5000);
  const tweets = random(500, 50000);
  const dailyPosts = random(0, 15);
  const engagement = parseFloat((random(1, 150) / 10).toFixed(1));

  const postTimes = Array.from({ length: dailyPosts }, (_, i) => {
    const hour = random(0, 23);
    const minute = random(0, 59);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }).sort();

  const posts = postTimes.map((time, i) => ({
    id: i,
    time,
    text: [
      "Just shipped a new feature. The grind never stops.",
      "Hot take: tabs > spaces. Fight me.",
      "Coffee count today: ████████░░ 80%",
      "Sometimes the bug IS the feature.",
      "Deployed to prod on a Friday. Living dangerously.",
      "The code works. I don't know why.",
      "Refactoring is just apologizing to your past self.",
      "git commit -m 'fixed stuff'",
      "Meetings that could've been emails: 4",
      "Stack overflow is my co-pilot.",
      "Today's mood: async/await",
      "New framework dropped. Time to rewrite everything.",
      "The documentation lies.",
      "It works on my machine ¯\\_(ツ)_/¯",
      "Rubber duck debugging actually works."
    ][random(0, 14)],
    likes: random(5, 2000),
    retweets: random(0, 500),
    replies: random(0, 200)
  }));

  return {
    handle,
    name: handle.charAt(0).toUpperCase() + handle.slice(1).replace(/[0-9]/g, ''),
    bio: "Building things on the internet. Probably tweeting about code.",
    followers,
    following,
    tweets,
    verified: followers > 100000,
    joinDate: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][random(0, 5)]} ${random(2010, 2022)}`,
    dailyPosts: posts,
    engagement,
    avatarColor: `hsl(${random(0, 360)}, 70%, 50%)`
  };
};

function App() {
  const [handle, setHandle] = useState('');
  const [profileData, setProfileData] = useState<ReturnType<typeof generateMockData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (inputHandle: string) => {
    const cleanHandle = inputHandle.replace('@', '').trim();
    if (!cleanHandle) return;

    setHandle(cleanHandle);
    setIsLoading(true);
    setShowResults(false);

    // Simulate API delay
    setTimeout(() => {
      const data = generateMockData(cleanHandle);
      setProfileData(data);
      setIsLoading(false);
      setTimeout(() => setShowResults(true), 100);
    }, 1500);
  };

  return (
    <div className="app">
      <div className="scanlines" />
      <div className="noise" />

      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="title-x">X</span>
            <span className="title-text">_ANALYTICS</span>
          </h1>
          <p className="subtitle">// PROFILE INTELLIGENCE SYSTEM</p>
        </div>
        <div className="header-decoration">
          <div className="status-dot pulse" />
          <span className="status-text">SYSTEM ONLINE</span>
        </div>
      </header>

      <main className="main">
        <HandleInput onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <div className="loading-container">
            <div className="loading-bar">
              <div className="loading-progress" />
            </div>
            <p className="loading-text">FETCHING DATA FROM X SERVERS...</p>
          </div>
        )}

        {profileData && showResults && (
          <div className="results">
            <div className="results-grid">
              <ProfileCard data={profileData} />
              <EngagementGauge
                engagement={profileData.engagement}
                dailyPosts={profileData.dailyPosts.length}
              />
            </div>
            <DailyPosts posts={profileData.dailyPosts} handle={profileData.handle} />
          </div>
        )}

        {!profileData && !isLoading && (
          <div className="empty-state">
            <div className="empty-graphic">
              <div className="empty-circle" />
              <div className="empty-lines">
                <div className="empty-line" />
                <div className="empty-line short" />
                <div className="empty-line medium" />
              </div>
            </div>
            <p className="empty-text">ENTER A HANDLE TO BEGIN ANALYSIS</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <span>Requested by @LEZZYBRUV · Built by @clonkbot</span>
      </footer>
    </div>
  );
}

export default App;
