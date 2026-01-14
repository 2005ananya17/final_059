import React, { useRef, useState, useEffect } from 'react'
import './Alumni.css'
import palak from "../assets/images/palak.jpeg";
import pooja from "../assets/images/pooja.jpeg";
import parulImg from "../assets/images/Parul chadda.jpeg";
import aishwarya from "../assets/images/aishwarya.jpeg";
import shambhavi from "../assets/images/Shambhavi.jpeg";
import antra from "../assets/images/Antra.jpeg";
import garima from "../assets/images/Garima.jpeg";
import bulbul from "../assets/images/Bulbul.jpeg";
import samriddhi from "../assets/images/samriddhi.jpeg";
import bhavika from "../assets/images/bhavika.jpeg";
import sneha from "../assets/images/sneha.jpeg";
import gourvi from "../assets/images/gourvi.jpeg";
import indu from "../assets/images/indu.jpeg";
import khushi from "../assets/images/khushi.jpeg";



const Alumni = () => {
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [viewMode, setViewMode] = useState('carousel') // 'carousel' or 'grid'
  const [selectedField, setSelectedField] = useState('All')
  const [sortBy, setSortBy] = useState('newest')

  const alumniData = [
    {
      id: 1,
      name: 'Palak Goyal',
      field: 'Computer Science',
      year: 'Class of 2024',
      role: ' Software Engineer',
      linkedin: 'https://www.linkedin.com/in/palak-goyal-a47737200',
      image: palak
    },
    {
      id: 2,
      name: 'Pooja Kumari',
      field: 'MBA',
      year: 'Class of 2019',
      role: 'Tech Recruiter',
      linkedin: 'https://www.linkedin.com/in/poojakumari29',
      image: pooja 
    },
    {
      id: 3,
      name: 'Parul Chaddha',
      field: 'Computer Science',
      year: 'Class of 2025',
      role: 'Software Engineer',
      linkedin: 'https://www.linkedin.com/in/parulchaddha0904',
      image: parulImg 
    },
    {
      id: 4,
      name: 'Aishwarya Sharma',
      field: 'Mechatronics',
      year: 'Class of 2024',
      role: 'Assistant Manager -Mahindra',
      linkedin: 'https://www.linkedin.com/in/aishwaryasharmamt',
      image: aishwarya 
    },
    {
      id: 5,
      name: 'Shambhavi Arya',
      field: 'Electrical Electronics Engineering',
      year: 'Class of 2025',
      role: 'YTL-Network',
      linkedin: 'https://www.linkedin.com/in/shambhaviarya1',
      image: shambhavi
    },
    {
      id: 6,
      name: 'Antra',
      field: 'ECE',
      year: 'Class of 2025',
      role: 'Hardware Engineering',
      linkedin: 'https://www.linkedin.com/in/antara09',
      image: antra 
    },
    {
      id: 7,
      name: 'Garima Singh',
      field: 'MBA',
      year: 'Class of 2023',
      role: 'Sr. HR Executive - HR CoE @ Uplers',
      linkedin: 'https://www.linkedin.com/in/garima-singh-543b31221',
      image: garima
    },
    {
      id: 8,
      name: 'Bulbul Sharma',
      field: 'Computer Science',
      year: 'Class of 2025',
      role: 'YTL– Network @ Bharti Airtel ',
      linkedin: 'https://www.linkedin.com/in/bulbul-sharma-b344b124b',
      image: bulbul
    },
    {
      id: 9,
      name: 'Samriddhi Tiwari',
      field: 'ECE',
      year: 'Class of 2025',
      role: 'SDE',
      linkedin: 'https://www.linkedin.com/in/samriddhi-tiwari-b2509b221',
      image: samriddhi
    },
    {
      id: 10,
      name: 'Bhavika Arora',
      field: 'ECE',
      year: 'Class of 2025',
      role: 'Functional Test engineer at amdocs',
      linkedin: 'https://www.linkedin.com/in/bhavikaaroraa',
      image: bhavika
    },
    {
      id: 11,
      name: 'Sneha Sharma',
      field: 'Information Technology',
      year: 'Class of 2025',
      role: 'SDE',
      linkedin: 'https://www.linkedin.com/in/sneha-sharma-5b9b26219',
      image: sneha
    },
    {
      id: 12,
      name: 'Gourvi Siriah',
      field: 'Information Technology',
      year: 'Class of 2025',
      role: 'SDE',
      linkedin: 'https://www.linkedin.com/in/gourvi-siriah-775473247',
      image: gourvi
    },
    {
      id: 13,
      name: 'Indu Rajawat',
      field: 'MBA',
      year: 'Class of 2024',
      role: 'HR',
      linkedin: 'https://www.linkedin.com/in/indu-rajawat-632b04257',
      image: indu
    },
    {
      id: 14,
      name: 'Khushi Gupta',
      field: 'ECE',
      year: 'Class of 2025',
      role: 'YTL (Networks)',
      linkedin: 'https://www.linkdin.com/in/14khushigupta',
      image:  khushi
    }
    
  ]

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 320 // Width of card + gap
    const newScrollLeft =
      container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const handleScroll = () => {
    updateScrollButtons()
  }

  useEffect(() => {
    // Initial check after render
    const timer = setTimeout(() => {
      updateScrollButtons()
    }, 100)

    // Check on window resize
    const handleResize = () => {
      setTimeout(updateScrollButtons, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Get unique fields for filter
  const uniqueFields = ['All', ...new Set(alumniData.map((alumnus) => alumnus.field))]

  // Filter and sort alumni
  const getFilteredAndSortedAlumni = () => {
    let filtered = alumniData

    // Filter by field
    if (selectedField !== 'All') {
      filtered = filtered.filter((alumnus) => alumnus.field === selectedField)
    }

    // Sort by year
    const sorted = [...filtered].sort((a, b) => {
      const yearA = parseInt(a.year.split(' ')[2])
      const yearB = parseInt(b.year.split(' ')[2])
      return sortBy === 'newest' ? yearB - yearA : yearA - yearB
    })

    return sorted
  }

  const filteredAlumni = getFilteredAndSortedAlumni()

  return (
    <div className="alumni-section">
      <div className="alumni-container">
        <div className="alumni-header">
          <h1 className="alumni-title">Meet Our Alumni</h1>
          <p className="alumni-subtitle">
            Connect with successful graduates and learn from their journey
          </p>
        </div>

        {viewMode === 'carousel' ? (
          <>
            <div className="alumni-carousel-wrapper">
          {showLeftArrow && (
            <button
              className="scroll-button scroll-button-left"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div
            className="alumni-carousel"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {alumniData.map((alumnus, index) => (
              <div 
                key={alumnus.id} 
                className="alumni-card"
                style={{ '--card-index': index }}
              >
                <div className="alumni-image-wrapper">
                  <img
                    src={alumnus.image}
                    alt={alumnus.name}
                    className="alumni-image"
                    loading="lazy"
                  />
                </div>
                <h3 className="alumni-name">{alumnus.name}</h3>
                <p className="alumni-field">{alumnus.field}</p>
                <p className="alumni-year">{alumnus.year}</p>
                <p className="alumni-role">{alumnus.role}</p>
                <a
                  href={alumnus.linkedin}
                  className="alumni-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              className="scroll-button scroll-button-right"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        <div className="view-all-container">
          <button
            className="view-all-button"
            onClick={() => setViewMode('grid')}
          >
            View All Alumni
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </>
        ) : (
          <>
            <div className="grid-controls">
              <button
                className="back-to-carousel-button"
                onClick={() => setViewMode('carousel')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Carousel
              </button>

              <div className="filter-sort-container">
                <div className="filter-group">
                  <label htmlFor="field-filter">Filter by Field:</label>
                  <select
                    id="field-filter"
                    className="filter-select"
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                  >
                    {uniqueFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="sort-filter">Sort by Year:</label>
                  <select
                    id="sort-filter"
                    className="filter-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>

                <div className="results-count">
                  Showing {filteredAlumni.length} alumni
                </div>
              </div>
            </div>

            <div className="alumni-grid">
              {filteredAlumni.map((alumnus, index) => (
                <div
                  key={alumnus.id}
                  className="alumni-card-grid"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="alumni-image-wrapper">
                    <img
                      src={alumnus.image}
                      alt={alumnus.name}
                      className="alumni-image"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="alumni-name">{alumnus.name}</h3>
                  <p className="alumni-field">{alumnus.field}</p>
                  <p className="alumni-year">{alumnus.year}</p>
                  <p className="alumni-role">{alumnus.role}</p>
                  <a
                    href={alumnus.linkedin}
                    className="alumni-linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Alumni