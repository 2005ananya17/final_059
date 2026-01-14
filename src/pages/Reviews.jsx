import { useState } from 'react'
import './Reviews.css'

const Review = () => {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [sortOrder, setSortOrder] = useState('recent')
  const [selectedReview, setSelectedReview] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Yashvi',
      rating: 5,
      text: 'CampusVerse has completely transformed how we connect and share information. The 360 view is amazing!',
      timestamp: '2 hours ago',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      name: 'Meitriyee',
      rating: 4,
      text: "Love the TalkNest feature! It's so easy to get help with assignments and connect with classmates.",
      timestamp: '5 hours ago',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: 3,
      name: 'Alisha',
      rating: 4,
      text: 'The AlumniScroll is incredibly helpful for networking. I connected with several alumni who guided my internship search.',
      timestamp: '1 day ago',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      name: 'Vandna',
      rating: 5,
      text: 'RiseWall has been amazing for showcasing achievements. It motivates me to do better and celebrate wins with peers!',
      timestamp: '3 hours ago',
      date: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: 5,
      name: 'Dakshita',
      rating: 4,
      text: 'NoteX keeps me updated with all important notices. Never miss a deadline anymore!',
      timestamp: '6 hours ago',
      date: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 6,
      name: 'Palak',
      rating: 5,
      text: 'The Review section helps me make informed decisions. Great platform overall!',
      timestamp: '1 day ago',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 7,
      name: 'Akshita',
      rating: 5,
      text: 'The Review section helps me make informed decisions. Great platform overall!',
      timestamp: '2 day ago',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
     {
      id: 8,
      name: 'Anushka',
      rating: 5,
      text: 'The Review section helps me make informed decisions. Great platform overall!',
      timestamp: '2 day ago',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
     {
      id: 9,
      name: 'Ananya',
      rating: 5,
      text: 'The Review section helps me make informed decisions. Great platform overall!',
      timestamp: '2 day ago',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ])

  const [formData, setFormData] = useState({
    name: '',
    course: '',
    rating: 0,
    feedback: ''
  })
  const [hoveredStar, setHoveredStar] = useState(0)

  const formatTimestamp = (date) => {
    const now = new Date()
    const diffMs = now - date
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStarClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
  }

  const handleStarHover = (rating) => {
    setHoveredStar(rating)
  }

  const handleStarLeave = () => {
    setHoveredStar(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.course || !formData.rating || !formData.feedback) {
      alert('Please fill in all fields')
      return
    }

    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      major: formData.course,
      rating: formData.rating,
      text: formData.feedback,
      timestamp: formatTimestamp(new Date()),
      date: new Date()
    }

    setReviews(prev => [newReview, ...prev])
    setFormData({
      name: '',
      course: '',
      rating: 0,
      feedback: ''
    })
    setHoveredStar(0)
    
    // Show success animation
    const submitButton = e.target.querySelector('.submit-button')
    if (submitButton) {
      submitButton.classList.add('submit-success')
      setTimeout(() => {
        submitButton.classList.remove('submit-success')
      }, 2000)
    }
  }

  const handleRipple = (e) => {
    const button = e.currentTarget
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.classList.add('ripple')

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  const renderStars = (rating, interactive = false, onStarClick = null, onStarHover = null, onStarLeave = null, hoverValue = 0) => {
    const displayRating = interactive && hoverValue > 0 ? hoverValue : rating
    const fullStars = Math.floor(displayRating)
    const emptyStars = 5 - fullStars

    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1
          const isFilled = starValue <= fullStars
          return (
            <span
              key={i}
              className={`star ${isFilled ? 'full' : 'empty'} ${interactive ? 'interactive' : ''}`}
              onClick={interactive && onStarClick ? () => onStarClick(starValue) : undefined}
              onMouseEnter={interactive && onStarHover ? () => onStarHover(starValue) : undefined}
              onMouseLeave={interactive && onStarLeave ? onStarLeave : undefined}
            >
              ★
            </span>
          )
        })}
      </div>
    )
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === 'recent') {
      return b.date - a.date
    } else if (sortOrder === 'rating') {
      return b.rating - a.rating
    }
    return 0
  })

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3)

  const handleCardClick = (review) => {
    setSelectedReview(review)
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setSelectedReview(null)
  }

  return (
    <div className="review-page">
      <div className="review-container">
        {/* Recent Feedback Section */}
        <div className="reviews-section">
          <div className="reviews-section-header">
            <h2 className="reviews-section-title">Recent Feedback</h2>
            <div className="sort-container">
              <select
                className="sort-dropdown"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          {!showAllReviews && (
            <div className="view-all-section">
              <button
                className="view-all-button"
                onClick={() => setShowAllReviews(true)}
                onMouseDown={handleRipple}
              >
                View All Reviews
                <span className="button-shine"></span>
              </button>
            </div>
          )}

          {showAllReviews && (
            <div className="back-section">
              <button
                className="back-button"
                onClick={() => setShowAllReviews(false)}
                onMouseDown={handleRipple}
              >
                Back
                <span className="button-shine"></span>
              </button>
            </div>
          )}

          <div className="reviews-grid">
            {displayedReviews.map((review, index) => (
              <div
                key={review.id}
                className="review-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCardClick(review)}
              >
                <div className="review-card-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div className="reviewer-details">
                      <h3 className="reviewer-name">{review.name}</h3>
                      <p className="reviewer-major">{review.major}</p>
                    </div>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-footer">
                  <span className="review-timestamp">{review.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review & Feedback Form Section - Only show when not viewing all reviews */}
        {!showAllReviews && (
        <div className="form-section">
          <div className="form-header">
            <h2 className="form-title">Review & Feedback</h2>
            <p className="form-subtitle">Share your experience and help us improve CampusVerse</p>
          </div>
          
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-header-inner">
              <h3 className="form-card-title">Submit Your Feedback</h3>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="course">Course</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  placeholder="Your course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-input">
                {renderStars(
                  formData.rating,
                  true,
                  handleStarClick,
                  handleStarHover,
                  handleStarLeave,
                  hoveredStar
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="feedback">Your Feedback</label>
              <textarea
                id="feedback"
                name="feedback"
                placeholder="Share your thoughts about CampusVerse..."
                value={formData.feedback}
                onChange={handleInputChange}
                className="form-textarea"
                rows="5"
              />
            </div>
            
            <button
              type="submit"
              className="submit-button"
              onMouseDown={handleRipple}
            >
              Submit Feedback
              <span className="button-shine"></span>
            </button>
          </form>
        </div>
        )}
      </div>

      {/* Review Popup Modal */}
      {showPopup && selectedReview && (
        <div className="review-popup-overlay" onClick={handleClosePopup}>
          <div className="review-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="review-popup-close" onClick={handleClosePopup}>
              ×
            </button>
            <div className="review-popup-header">
              <div className="review-popup-avatar">
                {selectedReview.name.charAt(0)}
              </div>
              <div className="review-popup-user-info">
                <h3 className="review-popup-name">{selectedReview.name}</h3>
                <p className="review-popup-major">{selectedReview.major}</p>
              </div>
            </div>
            <div className="review-popup-rating">
              {renderStars(selectedReview.rating)}
            </div>
            <div className="review-popup-text">
              <p>{selectedReview.text}</p>
            </div>
            <div className="review-popup-footer">
              <span className="review-popup-timestamp">{selectedReview.timestamp}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review