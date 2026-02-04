import { useEffect, useState } from 'react';

interface ProfileData {
  handle: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  tweets: number;
  verified: boolean;
  joinDate: string;
  avatarColor: string;
}

interface ProfileCardProps {
  data: ProfileData;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function ProfileCard({ data }: ProfileCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className={`profile-card ${visible ? 'visible' : ''}`}>
      <div className="profile-header">
        <div className="profile-avatar" style={{ background: data.avatarColor }}>
          <span className="avatar-letter">{data.name.charAt(0)}</span>
        </div>
        <div className="profile-identity">
          <div className="profile-name-row">
            <h2 className="profile-name">{data.name}</h2>
            {data.verified && (
              <span className="verified-badge" title="Verified">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </svg>
              </span>
            )}
          </div>
          <span className="profile-handle">@{data.handle}</span>
        </div>
      </div>

      <p className="profile-bio">{data.bio}</p>

      <div className="profile-meta">
        <span className="meta-item">
          <span className="meta-icon">📅</span>
          Joined {data.joinDate}
        </span>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-value">{formatNumber(data.followers)}</span>
          <span className="stat-label">FOLLOWERS</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">{formatNumber(data.following)}</span>
          <span className="stat-label">FOLLOWING</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">{formatNumber(data.tweets)}</span>
          <span className="stat-label">POSTS</span>
        </div>
      </div>

      <div className="profile-decoration">
        <div className="decoration-line" />
        <span className="decoration-text">USER_DATA</span>
        <div className="decoration-line" />
      </div>
    </div>
  );
}
