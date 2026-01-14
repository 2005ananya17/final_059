import { useState, useEffect, useRef } from "react";
import "./TalkNest.css";

// Enhanced anonymous user generation
const getAnon = () => {
  let id = sessionStorage.getItem("anonId");
  if (!id) {
    id = Math.floor(1000 + Math.random() * 9000);
    sessionStorage.setItem("anonId", id);
  }
  
  // Add random animal avatar for visual appeal
  const animals = ["🦊", "🐯", "🦉", "🐼", "🦁", "🐨", "🦄", "🐬"];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  
  return {
    id: `Anonymous #${id}`,
    avatar: animal,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  };
};

// Add emoji reactions
const reactions = ["👍", "❤️", "🔥", "👏", "🤔", "🎯"];

export default function TalkNest() {
  const user = getAnon();
  const [courseFilter, setCourseFilter] = useState("All");
  const [showAsk, setShowAsk] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("votes");
  const [newPost, setNewPost] = useState({ text: "", course: "B.Tech" });
  const [replyInputs, setReplyInputs] = useState({});
  const [postReactions, setPostReactions] = useState({});
  
  // Initialize with demo data
  const [posts, setPosts] = useState(() => [
    {
      id: 1,
      text: "Should I focus more on DSA or projects in 2nd year?",
      course: "B.Tech",
      votes: 22,
      replies: [
        { id: 1, text: "Projects help build portfolio early, DSA helps in placements later.", user: "Anon #123", time: "2h ago" },
        { id: 2, text: "Balance both. Do 2-3 quality projects and practice DSA consistently.", user: "Anon #456", time: "4h ago" },
        { id: 3, text: "Focus on understanding concepts rather than just completing tasks!", user: "Anon #789", time: "1d ago" }
      ],
      showAll: false,
      timestamp: "2024-01-15T10:30:00",
      tags: ["career", "advice"]
    },
    {
      id: 2,
      text: "How do seniors manage internships with exams? Looking for practical tips!",
      course: "BCA",
      votes: 15,
      replies: [
        { id: 1, text: "Time blocking is key! Assign specific hours for internship work and study.", user: "Anon #234", time: "5h ago" }
      ],
      showAll: false,
      timestamp: "2024-01-14T14:20:00",
      tags: ["time-management"]
    },
    {
      id: 3,
      text: "Is it okay to feel lost in first year? Everyone seems so sure of themselves.",
      course: "B.Sc",
      votes: 28,
      replies: [
        { id: 1, text: "Yes, totally normal! Most people are just pretending they have it all figured out. 🙂", user: "Anon #567", time: "1d ago" },
        { id: 2, text: "First year is for exploration. Try different things to find your passion.", user: "Anon #890", time: "2d ago" }
      ],
      showAll: false,
      timestamp: "2024-01-13T09:15:00",
      tags: ["mental-health", "first-year"]
    },
    {
      id: 4,
      text: "Good resources for law students beyond textbooks?",
      course: "B.Com + LLB",
      votes: 9,
      replies: [
        { id: 1, text: "Read bare acts thoroughly and follow landmark case analyses on legal blogs.", user: "Anon #111", time: "3d ago" }
      ],
      showAll: false,
      timestamp: "2024-01-12T16:45:00",
      tags: ["resources", "study-tips"]
    },
    {
      id: 5,
      text: "When should nursing students start clinical internships?",
      course: "Nursing",
      votes: 11,
      replies: [
        { id: 1, text: "Second year is ideal as you'll have basic knowledge to apply practically.", user: "Anon #222", time: "4d ago" },
        { id: 2, text: "Check with your college's placement cell for early opportunities.", user: "Anon #333", time: "5d ago" }
      ],
      showAll: false,
      timestamp: "2024-01-11T11:00:00",
      tags: ["internship", "practical"]
    },
  ]);

  // Filter and sort posts
  const visiblePosts = posts
    .filter(p => {
      const courseMatch = courseFilter === "All" || p.course === courseFilter;
      const searchMatch = searchQuery === "" || 
        p.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return courseMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === "votes") return b.votes - a.votes;
      if (sortBy === "recent") return new Date(b.timestamp) - new Date(a.timestamp);
      if (sortBy === "replies") return b.replies.length - a.replies.length;
      return 0;
    });

  const vote = (id, type) => {
    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, votes: type === "up" ? p.votes + 1 : p.votes - 1 }
        : p
    ));
  };

  const addReaction = (postId, reaction) => {
    setPostReactions(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { reaction, user: user.id }]
    }));
  };

  const addReply = (postId) => {
    const replyText = replyInputs[postId];
    if (!replyText?.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newReply = {
          id: Date.now(),
          text: replyText,
          user: user.id,
          time: "Just now"
        };
        return {
          ...post,
          replies: [...post.replies, newReply],
          showAll: true
        };
      }
      return post;
    }));

    setReplyInputs(prev => ({ ...prev, [postId]: "" }));
  };

  const submitQuestion = () => {
    if (!newPost.text.trim()) return;

    const newQuestion = {
      id: posts.length + 1,
      text: newPost.text,
      course: newPost.course,
      votes: 0,
      replies: [],
      showAll: false,
      timestamp: new Date().toISOString(),
      tags: []
    };

    setPosts([newQuestion, ...posts]);
    setNewPost({ text: "", course: "B.Tech" });
    setShowAsk(false);
  };

  // Auto-close menu when clicking outside
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="talknest-page">
      {/* HEADER */}
      <header className="talknest-header">
        <div className="header-left">
          <div className="logo" style={{ backgroundColor: user.color }}>
            {user.avatar}
          </div>
          <div className="user-info">
            <span className="user-id">{user.id}</span>
            <span className="user-status">🟢 Online</span>
          </div>
        </div>

        <div className="header-center">
          <h1 className="logo-text">🕊️ TalkNest</h1>
          <p className="tagline">Anonymously connect, discuss, and grow together</p>
        </div>

        <div className="header-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search questions or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <button className="ask-btn" onClick={() => setShowAsk(true)}>
            <span className="btn-icon">+</span> Ask Question
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* SIDEBAR */}
        <aside className="sidebar" ref={menuRef}>
          <div className="sidebar-section">
            <h3>🎓 Your Course</h3>
            <div className="course-selector">
              <button 
                className={`course-btn ${showMenu ? "active" : ""}`}
                onClick={() => setShowMenu(!showMenu)}
              >
                {courseFilter === "All" ? "All Courses" : courseFilter}
                <span className="dropdown-icon">▾</span>
              </button>
              
              <div className={`course-dropdown ${showMenu ? "show" : ""}`}>
                {["All", "B.Tech", "M.Tech", "BCA", "B.Sc", "B.Com + LLB", "Nursing", "Other"]
                  .map(course => (
                    <button
                      key={course}
                      className={courseFilter === course ? "active" : ""}
                      onClick={() => {
                        setCourseFilter(course);
                        setShowMenu(false);
                      }}
                    >
                      {course}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>📊 Sort By</h3>
            <div className="sort-options">
              {[
                { id: "votes", label: "Most Popular", icon: "🔥" },
                { id: "recent", label: "Latest", icon: "🕒" },
                { id: "replies", label: "Most Discussed", icon: "💬" }
              ].map(option => (
                <button
                  key={option.id}
                  className={`sort-btn ${sortBy === option.id ? "active" : ""}`}
                  onClick={() => setSortBy(option.id)}
                >
                  <span className="sort-icon">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>🏷️ Popular Tags</h3>
            <div className="tags">
              {["career", "mental-health", "study-tips", "internship", "projects", "exams"]
                .map(tag => (
                  <span 
                    key={tag} 
                    className="tag"
                    onClick={() => setSearchQuery(tag)}
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-value">{posts.length}</span>
              <span className="stat-label">Questions</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {posts.reduce((sum, post) => sum + post.replies.length, 0)}
              </span>
              <span className="stat-label">Replies</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {posts.reduce((sum, post) => sum + post.votes, 0)}
              </span>
              <span className="stat-label">Votes</span>
            </div>
          </div>
        </aside>

        {/* FEED */}
        <main className="feed">
          {visiblePosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🤔</div>
              <h3>No questions found</h3>
              <p>Try a different search or be the first to ask!</p>
              <button className="ask-btn" onClick={() => setShowAsk(true)}>
                Ask a Question
              </button>
            </div>
          ) : (
            visiblePosts.map(post => (
              <article key={post.id} className="tweet-card">
                <div className="tweet-header">
                  <div className="user-meta">
                    <div className="user-avatar" style={{ backgroundColor: user.color }}>
                      {user.avatar}
                    </div>
                    <div>
                      <div className="anon">{user.id}</div>
                      <div className="post-meta">
                        <span className="course-tag">{post.course}</span>
                        <span className="timestamp">
                          {new Date(post.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="post-stats">
                    <span className="stat">💬 {post.replies.length}</span>
                    <span className="stat">🔥 {post.votes}</span>
                  </div>
                </div>

                <div className="tweet-body">
                  <p className="tweet-text">{post.text}</p>
                  
                  {post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="tag" onClick={() => setSearchQuery(tag)}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Reactions */}
                  <div className="reactions">
                    {reactions.map(reaction => (
                      <button
                        key={reaction}
                        className="reaction-btn"
                        onClick={() => addReaction(post.id, reaction)}
                      >
                        {reaction}
                      </button>
                    ))}
                    {postReactions[post.id] && (
                      <span className="reaction-count">
                        {postReactions[post.id].length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Voting */}
                <div className="vote-section">
                  <button 
                    className="vote-btn up"
                    onClick={() => vote(post.id, "up")}
                  >
                    ⬆️
                  </button>
                  <span className="vote-count">{post.votes}</span>
                  <button 
                    className="vote-btn down"
                    onClick={() => vote(post.id, "down")}
                  >
                    ⬇️
                  </button>
                </div>

                {/* Replies */}
                <div className="replies-section">
                  {post.replies.length > 0 && (
                    <>
                      <div className="reply-preview">
                        <div className="reply-avatar">👤</div>
                        <div className="reply-content">
                          <div className="reply-meta">
                            <span className="reply-user">{post.replies[0].user}</span>
                            <span className="reply-time">{post.replies[0].time}</span>
                          </div>
                          <p>{post.replies[0].text}</p>
                        </div>
                      </div>

                      {post.replies.length > 1 && (
                        <>
                          <button
                            className="view-replies-btn"
                            onClick={() =>
                              setPosts(posts.map(p =>
                                p.id === post.id ? { ...p, showAll: !p.showAll } : p
                              ))
                            }
                          >
                            {post.showAll ? "Hide replies" : `View ${post.replies.length - 1} more replies`}
                          </button>

                          {post.showAll && (
                            <div className="all-replies">
                              {post.replies.slice(1).map((reply, i) => (
                                <div key={i} className="reply">
                                  <div className="reply-avatar">👤</div>
                                  <div className="reply-content">
                                    <div className="reply-meta">
                                      <span className="reply-user">{reply.user}</span>
                                      <span className="reply-time">{reply.time}</span>
                                    </div>
                                    <p>{reply.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {/* Add Reply Input */}
                  <div className="add-reply">
                    <textarea
                      placeholder="Add your reply... (Anonymous)"
                      value={replyInputs[post.id] || ""}
                      onChange={(e) =>
                        setReplyInputs(prev => ({
                          ...prev,
                          [post.id]: e.target.value
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          addReply(post.id);
                        }
                      }}
                    />
                    <button
                      className="reply-submit-btn"
                      onClick={() => addReply(post.id)}
                      disabled={!replyInputs[post.id]?.trim()}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </main>
      </div>

      {/* Floating Ask Button */}
      <button className="floating-ask-btn" onClick={() => setShowAsk(true)}>
        <span className="plus-icon">+</span>
        <span className="btn-text">Ask Question</span>
      </button>

      {/* Ask Modal */}
      {showAsk && (
        <AskModal 
          close={() => setShowAsk(false)}
          newPost={newPost}
          setNewPost={setNewPost}
          submitQuestion={submitQuestion}
        />
      )}
    </div>
  );
}

/* ENHANCED ASK MODAL */
function AskModal({ close, newPost, setNewPost, submitQuestion }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <span className="modal-icon">💭</span>
            Ask Your Question
          </h2>
          <button className="close-btn" onClick={close}>✕</button>
        </div>

        <div className="modal-body">
          <p className="modal-subtext">
            Your identity stays anonymous. Ask anything related to your academic journey!
          </p>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📝</span>
              Your Question
            </label>
            <textarea
              ref={textareaRef}
              className="question-input"
              placeholder="What's on your mind? Be specific for better answers..."
              value={newPost.text}
              onChange={(e) => setNewPost({...newPost, text: e.target.value})}
              maxLength={500}
              rows={4}
            />
            <div className="char-count">{newPost.text.length}/500</div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🎓</span>
              Select Course
            </label>
            <select
              className="course-select"
              value={newPost.course}
              onChange={(e) => setNewPost({...newPost, course: e.target.value})}
            >
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.Com + LLB">B.Com + LLB</option>
              <option value="Nursing">Nursing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🏷️</span>
              Add Tags (Optional)
            </label>
            <input
              type="text"
              className="tags-input"
              placeholder="e.g., career, study-tips, mental-health"
            />
            <small className="form-hint">Separate with commas</small>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={close}>
            Cancel
          </button>
          <button 
            className="submit-btn"
            onClick={submitQuestion}
            disabled={!newPost.text.trim()}
          >
            <span className="btn-icon">🚀</span>
            Post Question
          </button>
        </div>
      </div>
    </div>
  );
}