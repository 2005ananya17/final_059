import { useState } from "react";
import "./RiseWall.css";

export default function RiseWall() {
  const [filter, setFilter] = useState("All");
  const [showSubmit, setShowSubmit] = useState(false);

  const posts = [
    {
      id: 1,
      class: "B.Tech CSE • 3rd Year",
      category: "Sports",
      title: "West Zone Champion",
      description: "Secured first place in West Zone Kho-Kho Championship representing our university at the national level.",
      images: ["/rise1.jpg", "/rise2.jpg"],
      likes: 24,
      comments: [
        { user: "Aarav", text: "Amazing achievement! 🔥" },
        { user: "Priya", text: "So proud of our team! 🎉" }
      ],
      userName: "Raj Patel"
    },
    {
      id: 2,
      class: "BCA • 2nd Year",
      category: "Technical",
      title: "National Hackathon Winner",
      description: "Developed an AI-powered healthcare solution and secured 1st position among 200+ teams nationwide.",
      images: ["/rise2.jpg"],
      likes: 31,
      comments: [
        { user: "TechEnthusiast", text: "Can you share your tech stack?" }
      ],
      userName: "Ananya Sharma"
    },
    {
      id: 3,
      class: "BA Fine Arts • Final Year",
      category: "Cultural",
      title: "National Art Exhibition Selection",
      description: "My painting 'Eternal Harmony' was selected for the prestigious National Annual Cultural Exhibition.",
      images: ["/rise3.jpg"],
      likes: 15,
      comments: [],
      userName: "Maya Verma"
    },
    {
      id: 4,
      class: "MCA • 1st Year",
      category: "Academic",
      title: "Research Paper Publication",
      description: "Research paper on Quantum Computing accepted in IEEE International Journal (Impact Factor: 4.2).",
      images: ["/rise1.jpg"],
      likes: 42,
      comments: [
        { user: "Dr. Kumar", text: "Excellent work! Looking forward to more publications." }
      ],
      userName: "Vikram Singh"
    },
    {
      id: 5,
      class: "B.Sc Physical Education • 2nd Year",
      category: "Sports",
      title: "University Sports Gold Medalist",
      description: "Won gold medal in 100m sprint and long jump at the annual inter-university sports championship.",
      images: ["/rise2.jpg"],
      likes: 19,
      comments: [],
      userName: "Amit Yadav"
    },
    {
      id: 6,
      class: "B.Tech IT • 4th Year",
      category: "Technical",
      title: "Google Summer Internship Completion",
      description: "Successfully completed internship at Google, contributing to the Google Assistant team.",
      images: ["/rise3.jpg"],
      likes: 27,
      comments: [
        { user: "FutureSWE", text: "Any tips for the interview process?" },
        { user: "Alumni", text: "Great going! Make us proud!" }
      ],
      userName: "Neha Gupta"
    },
  ];

  const filteredPosts = filter === "All" 
    ? posts 
    : posts.filter((p) => p.category === filter);

  return (
    <div className="risewall-page">
      {/* HEADER SECTION */}
      <header className="header-section">
        <h1 className="risewall-heading">🏆 RiseWall</h1>
        <p className="risewall-subtitle">
          "Celebrating achievements, big and small. Every milestone tells a story of perseverance and passion."
        </p>
      </header>

      {/* CONTROLS BAR */}
      <div className="top-bar">
        <div className="filter-container">
          <select
            className="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Academic">🎓 Academic</option>
            <option value="Sports">⚽ Sports</option>
            <option value="Cultural">🎭 Cultural</option>
            <option value="Technical">💻 Technical</option>
          </select>
          <span className="filter-count">{filteredPosts.length} achievements</span>
        </div>

        <button 
          className="submit-btn-top"
          onClick={() => setShowSubmit(true)}
        >
          <span>+</span>
          Share Your Achievement
        </button>
      </div>

      {/* ACHIEVEMENTS GRID */}
      <main className="risewall-grid">
        {filteredPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>

      {/* EMPTY STATE */}
      {filteredPosts.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏆</div>
          <h3>No achievements found</h3>
          <p>Try selecting a different category or be the first to share an achievement!</p>
          <button 
            className="submit-btn-top"
            onClick={() => setShowSubmit(true)}
          >
            Share First Achievement
          </button>
        </div>
      )}

      {/* MODAL */}
      {showSubmit && <SubmitModal close={() => setShowSubmit(false)} />}
    </div>
  );
}

/* ---------- POST COMPONENT ---------- */
function Post({ post }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <article className="rise-card">
      {/* CARD HEADER */}
      <div className="post-header">
        <div className="user-info">
          <div className="avatar" title={post.userName}>
            {getInitials(post.userName)}
          </div>
          <div className="user-details">
            <div className="user-name">{post.userName}</div>
            <div className="class-text">{post.class}</div>
          </div>
        </div>

        <span className={`category-tag ${post.category.toLowerCase()}`}>
          {post.category === 'Academic' && '🎓'}
          {post.category === 'Sports' && '⚽'}
          {post.category === 'Cultural' && '🎭'}
          {post.category === 'Technical' && '💻'}
          {post.category}
        </span>
      </div>

      {/* IMAGE SLIDER */}
      <div className="image-slider">
        <img 
          src={post.images[imgIndex]} 
          alt={`${post.title} - Achievement visual`}
          loading="lazy"
        />
        
        {post.images.length > 1 && (
          <>
            <button 
              className="slider-btn prev"
              onClick={() => setImgIndex((imgIndex - 1 + post.images.length) % post.images.length)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="slider-btn next"
              onClick={() => setImgIndex((imgIndex + 1) % post.images.length)}
              aria-label="Next image"
            >
              ›
            </button>

            <div className="dots-indicator">
              {post.images.map((_, i) => (
                <span 
                  key={i} 
                  className={i === imgIndex ? "active" : ""}
                  onClick={() => setImgIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* CONTENT */}
      <h3 className="post-title">{post.title}</h3>
      <p className="post-desc">{post.description}</p>

      {/* INTERACTIONS */}
      <div className="actions">
        <span 
          onClick={handleLike}
          className={liked ? "liked" : ""}
        >
          {liked ? '❤️' : '🤍'} {likes}
        </span>
        <span onClick={() => setShowComments(!showComments)}>
          💬 {comments.length}
        </span>
        <span>
          🔗 Share
        </span>
      </div>

      {/* COMMENTS SECTION */}
      {showComments && (
        <div className="comments">
          <div className="comments-header">
            <h4>Comments ({comments.length})</h4>
          </div>
          
          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment, i) => (
                <div key={i} className="comment">
                  <div className="avatar small">
                    {getInitials(comment.user)}
                  </div>
                  <div className="comment-content">
                    <div className="comment-user">{comment.user}</div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}

          <div className="comment-input-container">
            <input
              className="comment-input"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && commentText.trim()) {
                  setComments([...comments, { 
                    user: "You", 
                    text: commentText 
                  }]);
                  setCommentText("");
                }
              }}
            />
            <button 
              className="comment-submit"
              onClick={() => {
                if (commentText.trim()) {
                  setComments([...comments, { 
                    user: "You", 
                    text: commentText 
                  }]);
                  setCommentText("");
                }
              }}
              disabled={!commentText.trim()}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

/* ---------- SUBMIT MODAL ---------- */
function SubmitModal({ close }) {
  const [formData, setFormData] = useState({
    title: "",
    class: "",
    category: "Academic",
    description: "",
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Achievement submitted successfully!");
    close();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <div className="overlay" onClick={close}>
      <div className="submit-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-top" onClick={close} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-header">
          <h2 className="submit-title">🏆 Share Your Achievement</h2>
          <p className="submit-subtitle">
            Your journey inspires others. Share your milestone with the community.
          </p>
        </div>

        <form className="submit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">🎯 Title of Achievement</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., National Hackathon Winner"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="class">🎓 Your Class</label>
              <input
                id="class"
                name="class"
                type="text"
                placeholder="e.g., B.Tech CSE 3rd Year"
                value={formData.class}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">📚 Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Technical">Technical</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">📝 Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Tell us about your achievement, challenges faced, and lessons learned..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">📎 Upload Proof (Certificate/Photo)</label>
            <div className="file-upload">
              <input
                id="file"
                name="file"
                type="file"
                accept="image/*,.pdf"
                onChange={handleChange}
              />
              <div className="upload-hint">
                Supports JPG, PNG, PDF (Max 5MB)
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="submit-btn-main">
              Share Achievement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}