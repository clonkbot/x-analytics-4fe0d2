import { useEffect, useState } from 'react';

interface EngagementGaugeProps {
  engagement: number;
  dailyPosts: number;
}

function getEngagementLevel(engagement: number): {
  level: string;
  color: string;
  description: string;
  indicator: string;
} {
  if (engagement >= 10) {
    return {
      level: 'VIRAL',
      color: '#ff3366',
      description: 'Exceptional engagement! Posts are resonating massively.',
      indicator: '████████████████████'
    };
  }
  if (engagement >= 6) {
    return {
      level: 'HIGH',
      color: '#00ff88',
      description: 'Strong engagement. Content is performing well above average.',
      indicator: '████████████████░░░░'
    };
  }
  if (engagement >= 3) {
    return {
      level: 'MEDIUM',
      color: '#00d4ff',
      description: 'Average engagement. Room for improvement.',
      indicator: '████████████░░░░░░░░'
    };
  }
  if (engagement >= 1) {
    return {
      level: 'LOW',
      color: '#ffaa00',
      description: 'Below average engagement. Consider optimizing content strategy.',
      indicator: '████████░░░░░░░░░░░░'
    };
  }
  return {
    level: 'MINIMAL',
    color: '#ff6b6b',
    description: 'Very low engagement. Review posting times and content quality.',
    indicator: '████░░░░░░░░░░░░░░░░'
  };
}

export function EngagementGauge({ engagement, dailyPosts }: EngagementGaugeProps) {
  const [animatedEngagement, setAnimatedEngagement] = useState(0);
  const [visible, setVisible] = useState(false);
  const levelInfo = getEngagementLevel(engagement);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);

    let start = 0;
    const end = engagement;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedEngagement(parseFloat((start + (end - start) * eased).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [engagement]);

  const gaugeAngle = Math.min((animatedEngagement / 15) * 180, 180);

  return (
    <div className={`engagement-card ${visible ? 'visible' : ''}`}>
      <div className="engagement-header">
        <span className="engagement-title">ENGAGEMENT RATE</span>
        <span className="engagement-period">// TODAY</span>
      </div>

      <div className="gauge-container">
        <svg viewBox="0 0 200 120" className="gauge-svg">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Gradient arc */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
          </defs>
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(gaugeAngle / 180) * 251} 251`}
            className="gauge-fill"
          />
          {/* Needle */}
          <g transform={`rotate(${gaugeAngle - 90}, 100, 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="35"
              stroke={levelInfo.color}
              strokeWidth="3"
              strokeLinecap="round"
              className="gauge-needle"
            />
            <circle cx="100" cy="100" r="8" fill={levelInfo.color} />
            <circle cx="100" cy="100" r="4" fill="#0a0a12" />
          </g>
          {/* Labels */}
          <text x="20" y="115" className="gauge-label">0%</text>
          <text x="170" y="115" className="gauge-label">15%</text>
        </svg>

        <div className="gauge-value">
          <span className="gauge-number">{animatedEngagement}</span>
          <span className="gauge-percent">%</span>
        </div>
      </div>

      <div className="engagement-level" style={{ borderColor: levelInfo.color }}>
        <div className="level-header">
          <span className="level-badge" style={{ backgroundColor: levelInfo.color }}>
            {levelInfo.level}
          </span>
          <span className="daily-posts">{dailyPosts} POSTS TODAY</span>
        </div>
        <div className="level-bar" style={{ color: levelInfo.color }}>
          {levelInfo.indicator}
        </div>
        <p className="level-description">{levelInfo.description}</p>
      </div>

      <div className="engagement-metrics">
        <div className="metric">
          <span className="metric-label">AVG LIKES</span>
          <span className="metric-value">~{Math.round(engagement * 120)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">AVG RETWEETS</span>
          <span className="metric-value">~{Math.round(engagement * 30)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">AVG REPLIES</span>
          <span className="metric-value">~{Math.round(engagement * 15)}</span>
        </div>
      </div>
    </div>
  );
}
