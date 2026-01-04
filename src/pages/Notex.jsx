import { useState, useEffect } from "react";
import "./Notex.css";

export default function Notex() {
  const [activeNotice, setActiveNotice] = useState(null);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const notices = [
    {
      id: 1,
      title: "Second Periodical Datesheet",
      description: "Mid-semester exams schedule released for all departments.",
      type: "pdf",
      file: "/sample.pdf",
      tag: "Examination",
      date: "12 Dec 2025",
      department: "All",
    },
    {
      id: 2,
      title: "Cultural Fest Auditions",
      description: "Auditions for dance, music & drama competitions open now.",
      type: "image",
      file: "/sample-image.jpg",
      tag: "Cultural",
      date: "15 Dec 2025",
      department: "Cultural Committee",
    },
    {
      id: 3,
      title: "Holiday Announcement",
      description: "University will remain closed on Friday for maintenance work.",
      type: "text",
      tag: "Notice",
      date: "16 Dec 2025",
      department: "Administration",
    },
    {
      id: 4,
      title: "Workshop Schedule",
      description: "AI & Web Development workshop timetable available for students.",
      type: "pdf",
      file: "/sample.pdf",
      tag: "Workshop",
      date: "18 Dec 2025",
      department: "Computer Science",
    },
    {
      id: 5,
      title: "Sports Meet Poster",
      description: "Annual sports meet poster and registration details released.",
      type: "image",
      file: "/sample-image.jpg",
      tag: "Sports",
      date: "20 Dec 2025",
      department: "Sports Committee",
    },
    {
      id: 6,
      title: "Library Timing Update",
      description: "Library will remain open till 9 PM during examination period.",
      type: "text",
      tag: "Library",
      date: "22 Dec 2025",
      department: "Library",
    },
    {
      id: 7,
      title: "Placement Drive - Google",
      description: "Google campus recruitment scheduled for final year students.",
      type: "pdf",
      file: "/sample.pdf",
      tag: "Placement",
      date: "25 Dec 2025",
      department: "Placement Cell",
    },
    {
      id: 8,
      title: "Semester Fee Payment Deadline",
      description: "Last date for semester fee payment is 30th December.",
      type: "text",
      tag: "Fee",
      date: "24 Dec 2025",
      department: "Accounts",
    },
    {
      id: 9,
      title: "Research Paper Competition",
      description: "Submit your research papers for the annual competition.",
      type: "pdf",
      file: "/sample.pdf",
      tag: "Academic",
      date: "28 Dec 2025",
      department: "Research Cell",
    },
    {
      id: 10,
      title: "Hostel Maintenance Notice",
      description: "Hostel will undergo maintenance from Jan 1-7.",
      type: "text",
      tag: "Hostel",
      date: "29 Dec 2025",
      department: "Hostel Office",
    },
  ];

  const filters = [
    { id: "all", label: "All Notices", icon: "📋" },
    { id: "Examination", label: "Examination", icon: "📝" },
    { id: "Placement", label: "Placement", icon: "💼" },
    { id: "Cultural", label: "Cultural", icon: "🎭" },
    { id: "Sports", label: "Sports", icon: "⚽" },
    { id: "Workshop", label: "Workshop", icon: "⚙️" },
    { id: "Library", label: "Library", icon: "📚" },
    { id: "Academic", label: "Academic", icon: "🎓" },
  ];

  const sortOptions = [
    { id: "latest", label: "Latest First", icon: "⬇️" },
    { id: "oldest", label: "Oldest First", icon: "⬆️" },
    { id: "title", label: "A to Z", icon: "🔤" },
  ];

  useEffect(() => {
    let results = [...notices];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        notice =>
          notice.title.toLowerCase().includes(query) ||
          notice.description.toLowerCase().includes(query) ||
          notice.tag.toLowerCase().includes(query) ||
          notice.department.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedFilter !== "all") {
      results = results.filter(notice => notice.tag === selectedFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "latest":
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        results.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "title":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredNotices(results);
  }, [searchQuery, selectedFilter, sortBy]);

  const getTagColor = (tag) => {
    const colors = {
      Examination: "#ef4444",
      Placement: "#10b981",
      Cultural: "#8b5cf6",
      Sports: "#f59e0b",
      Workshop: "#3b82f6",
      Library: "#06b6d4",
      Notice: "#64748b",
      Fee: "#f97316",
      Academic: "#6366f1",
      Hostel: "#84cc16",
    };
    return colors[tag] || "#6366f1";
  };

  // Function to download notice
  const downloadNotice = (notice) => {
    if (notice.type === "text") {
      // Create a text file for text notices
      const content = `
NOTICE: ${notice.title}
Date: ${notice.date}
Department: ${notice.department}
Tag: ${notice.tag}

${notice.description}

---
Issued by: University Notice Board
`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${notice.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (notice.file) {
      // For PDF and Image files
      const a = document.createElement('a');
      a.href = notice.file;
      a.download = notice.file.split('/').pop() || `notice_${notice.id}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="notex-page">
      {/* Header */}
      <div className="notex-header">
        <div className="header-content">
          <div>
            <h1>📢 Notex</h1>
            <p>Official announcements & important updates</p>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{notices.length}</span>
              <span className="stat-label">Total Notices</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{notices.filter(n => n.type === "pdf").length}</span>
              <span className="stat-label">PDF Files</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="notex-controls">
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter & Sort */}
        <div className="filter-sort-container">
          {/* Filters */}
          <div className="filter-group">
            <div className="filter-scroll">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${selectedFilter === filter.id ? "active" : ""}`}
                  onClick={() => setSelectedFilter(filter.id)}
                  style={selectedFilter === filter.id ? { 
                    backgroundColor: getTagColor(filter.id) 
                  } : {}}
                >
                  <span className="filter-icon">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {selectedFilter !== "all" && (
        <div className="active-filter">
          <span className="active-filter-tag" style={{ backgroundColor: getTagColor(selectedFilter) }}>
            {filters.find(f => f.id === selectedFilter)?.icon} {selectedFilter}
          </span>
          <button className="clear-filter" onClick={() => setSelectedFilter("all")}>
            ✕ Clear Filter
          </button>
        </div>
      )}

      {/* Notices Grid */}
      <div className="notex-grid">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => {
            const tagColor = getTagColor(notice.tag);
            return (
              <div
                key={notice.id}
                className="notex-card"
                onClick={() => setActiveNotice(notice)}
              >
                {/* Card Header */}
                <div className="card-header">
                  <span className="notex-tag" style={{ backgroundColor: tagColor }}>
                    {notice.tag}
                  </span>
                  <button 
                    className="download-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadNotice(notice);
                    }}
                    title="Download Notice"
                  >
                    ⬇️
                  </button>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <h3>{notice.title}</h3>
                  <p className="desc">{notice.description}</p>

                  {/* Preview */}
                  <div className="preview-container">
                    {notice.type === "image" && (
                      <div className="preview-box image-preview">
                        <img src={notice.file} alt="preview" />
                        <div className="preview-overlay">👁️ View Image</div>
                      </div>
                    )}

                    {notice.type === "pdf" && (
                      <div className="preview-box pdf-preview">
                        <div className="pdf-icon">📄</div>
                        <div className="pdf-text">
                          <strong>PDF Document</strong>
                          <small>Click to view PDF</small>
                        </div>
                      </div>
                    )}

                    {notice.type === "text" && (
                      <div className="preview-box text-preview">
                        <div className="text-icon">📝</div>
                        <div className="text-content">
                          <strong>Text Notice</strong>
                          <small>No attachment file</small>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer">
                    <div className="footer-left">
                      <span className="date">📅 {notice.date}</span>
                      <span className="department">🏛️ {notice.department}</span>
                    </div>
                    <div className="footer-right">
                      <span className="notice-type">{notice.type.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No notices found</h3>
            <p>Try changing your search or filter criteria</p>
            <button
              className="reset-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {activeNotice && (
        <div className="notex-modal" onClick={() => setActiveNotice(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-top">
                <span 
                  className="modal-tag"
                  style={{ backgroundColor: getTagColor(activeNotice.tag) }}
                >
                  {activeNotice.tag}
                </span>
                <button className="close" onClick={() => setActiveNotice(null)}>
                  ✕
                </button>
              </div>
              
              <h2>{activeNotice.title}</h2>
              
              <div className="modal-meta">
                <span className="modal-date">📅 {activeNotice.date}</span>
                <span className="modal-department">🏛️ {activeNotice.department}</span>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-description">
                <h4>Description</h4>
                <p>{activeNotice.description}</p>
              </div>

              {activeNotice.type === "image" && (
                <div className="modal-media-container">
                  <div className="modal-media-header">
                    <h4>Image Preview</h4>
                    <button 
                      className="download-btn"
                      onClick={() => downloadNotice(activeNotice)}
                    >
                      ⬇ Download Image
                    </button>
                  </div>
                  <img
                    src={activeNotice.file}
                    alt="Full preview"
                    className="modal-media"
                  />
                </div>
              )}

              {activeNotice.type === "pdf" && (
                <div className="modal-media-container">
                  <div className="modal-media-header">
                    <h4>PDF Document</h4>
                    <button 
                      className="download-btn"
                      onClick={() => downloadNotice(activeNotice)}
                    >
                      ⬇ Download PDF
                    </button>
                  </div>
                  <iframe
                    src={activeNotice.file}
                    title="PDF Viewer"
                    className="modal-media pdf-viewer"
                  />
                </div>
              )}

              {activeNotice.type === "text" && (
                <div className="text-notice-container">
                  <div className="text-notice-header">
                    <div className="text-notice-icon">📄</div>
                    <div>
                      <h4>Text Notice</h4>
                      <p>No attached files</p>
                    </div>
                  </div>
                  <div className="text-notice-content">
                    <h4>Notice Content</h4>
                    <p>{activeNotice.description}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <div className="modal-footer-actions">
                <button 
                  className="modal-action-btn download-action"
                  onClick={() => downloadNotice(activeNotice)}
                >
                  <span>⬇</span>
                  Download {activeNotice.type === "text" ? "as Text File" : "File"}
                </button>
                <button 
                  className="modal-action-btn print-action"
                  onClick={() => window.print()}
                >
                  <span>🖨️</span>
                  Print Notice
                </button>
                <button 
                  className="modal-action-btn share-action"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: activeNotice.title,
                        text: activeNotice.description,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(
                        `${activeNotice.title}\n\n${activeNotice.description}\n\nDate: ${activeNotice.date}\nDepartment: ${activeNotice.department}`
                      );
                      alert('Notice details copied to clipboard!');
                    }
                  }}
                >
                  <span>📤</span>
                  Share
                </button>
              </div>
              <button className="close-modal" onClick={() => setActiveNotice(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}