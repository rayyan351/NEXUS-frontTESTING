import React, { useContext, useEffect, useState } from 'react';
import { AdminAuthContext } from '../context/AdminAuthContext';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { enUS } from 'date-fns/locale';
import Modal from 'react-modal';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../styles/Admin.css';

Modal.setAppElement('#root');

const Dashboard = () => {
  const { admin, logout } = useContext(AdminAuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [search, setSearch] = useState({
    name: '',
    email: '',
    social: ''
  });
  
  const [showConfirm, setShowConfirm] = useState(null); // stores the ID for delete confirmation
  const [deletedBackup, setDeletedBackup] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [fadeCard, setFadeCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [undoTimer, setUndoTimer] = useState(5);


  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

const handleDeleteConfirmed = async (id) => {
  setFadeCard(id); // trigger fade animation

  setTimeout(() => {
    const target = submissions.find((item) => item._id === id);
    setDeletedBackup(target);
    setSubmissions((prev) => prev.filter((item) => item._id !== id));
    setFiltered((prev) => prev.filter((item) => item._id !== id));
    setShowConfirm(null);
    setToastMessage('Submission deleted');
    setShowToast(true);

    setUndoTimer(5); // reset timer
setShowToast(true);

let counter = 5;
const interval = setInterval(() => {
  counter -= 1;
  setUndoTimer(counter);
  if (counter === 0) clearInterval(interval);
}, 1000);


    // Auto delete from DB after 5s if not undone
    setTimeout(async () => {
      if (deletedBackup && deletedBackup._id === id) {
        try {
          await axios.delete(`https://nexus-backend-1-qjsa.onrender.com/api/admin/submissions/${id}`, {
            headers: {
              'x-auth-token': admin.token
            }
          });
          setDeletedBackup(null);
        } catch (err) {
          console.error('Delete failed', err);
        }
      }
    }, 5000);
  }, 300); // allow fade animation
};

const handleUndoDelete = () => {
  if (deletedBackup) {
    setSubmissions((prev) => [deletedBackup, ...prev]);
    setFiltered((prev) => [deletedBackup, ...prev]);
    setDeletedBackup(null);
    setToastMessage('Deletion undone');
  }
};

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/submissions', {
          headers: {
            'x-auth-token': admin.token
          }
        });
        setSubmissions(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubs();
  }, [admin]);

  useEffect(() => {
    const filteredData = submissions.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const start = new Date(dateRange[0].startDate).setHours(0, 0, 0, 0);
      const end = new Date(dateRange[0].endDate).setHours(23, 59, 59, 999);
      return (
        item.name.toLowerCase().includes(search.name.toLowerCase()) &&
        item.email.toLowerCase().includes(search.email.toLowerCase()) &&
        item.social.toLowerCase().includes(search.social.toLowerCase()) &&
        (!showCalendar || (itemDate >= start && itemDate <= end))
      );
    });

    setFiltered(filteredData);
  }, [search, submissions, dateRange, showCalendar]);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
    }, 1500);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Contact Submissions</h2>
        <button className="logout-btn" onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? (
            <>
              <span className="spinner"></span> Logging out...
            </>
          ) : (
            'Logout'
          )}
        </button>
      </div>

      <div className="stats-panel">
  <div className="stat-box">
    <h4>Total Submissions</h4>
    <p>{submissions.length}</p>
  </div>
  <div className="stat-box">
    <h4>Filtered Results</h4>
    <p>{filtered.length}</p>
  </div>
  <div className="stat-box">
    <h4>Latest Submission</h4>
    <p>
      {submissions.length > 0
        ? new Date(
            Math.max(...submissions.map((item) => new Date(item.createdAt)))
          ).toLocaleDateString()
        : 'N/A'}
    </p>
  </div>
</div>


      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by email"
          value={search.email}
          onChange={(e) => setSearch({ ...search, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by social URL"
          value={search.social}
          onChange={(e) => setSearch({ ...search, social: e.target.value })}
        />
      </div>

      <button className="date-toggle" onClick={() => setShowCalendar(!showCalendar)}>
        {showCalendar ? 'Hide Date Filter' : 'Filter by Date Range'}
      </button>

      {showCalendar && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          locale={enUS}
        />
      )}

      {filtered.length > 0 && (
        <div className="export-btn-container">
          <CSVLink data={filtered} filename="submissions.csv" className="export-btn">
            Export CSV
          </CSVLink>
        </div>
      )}

      {loading ? (
        <div className="loader">Loading submissions...</div>
      ) : filtered.length === 0 ? (
        <p className="no-data">No matching submissions found.</p>
      ) : (
        <div className="submissions-list">
          {filtered.map((item) => (
            <div className="submission-card" key={item._id}>
              <h4>{item.name}</h4>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Social:</strong> {item.social}</p>
              <p>
                <strong>Message:</strong>{' '}
                <span
                  className="view-more"
                  onClick={() => {
                    setSelectedMessage(item.message);
                    setModalOpen(true);
                  }}
                >
                  View Full
                </span>
              </p>
              <p className="date"><strong>Date:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
             
             {showConfirm === item._id ? (
            <div className="confirm-delete">
         <p>Are you sure?</p>
         <button onClick={() => handleDeleteConfirmed(item._id)}>Yes</button>
        <button onClick={() => setShowConfirm(null)}>No</button>
      </div>
       ) : (
    <button className="delete-btn" onClick={() => setShowConfirm(item._id)}>
      Delete
    </button>
  )}
            </div>
          ))}
        </div>
      )}

      {showToast && (
  <div className="toast">
    <span>{toastMessage}</span>
    {toastMessage === 'Submission deleted' && deletedBackup && (
      <button onClick={handleUndoDelete}>Undo ({undoTimer}s)</button>

    )}
  </div>
)}


      {/* Full Message Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Message Preview"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Full Message</h3>
        <p>{selectedMessage}</p>
        <button onClick={() => setModalOpen(false)} className="modal-close-btn">Close</button>
      </Modal>
    </div>
  );
};

export default Dashboard;
