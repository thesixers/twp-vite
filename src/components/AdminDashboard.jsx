import React from 'react'

export default function AdminDashboard({ approvedToonz, pendingToonz, rejectedToonz, users }) {
  return (
    <div className="dashboard-wrapper">
            <div className="box">
              <div className="head">Published webtoonz</div>
              <div className="count">
                  { approvedToonz.length }
              </div>
            </div>
            <div className="box">
              <div className="head">Users</div>
              <div className="count">
                  { users.length }
              </div>
            </div>
            <div className="box">
              <div className="head">Pending webtoonz</div>
              <div className="count">
                  { pendingToonz.length }
              </div>
            </div>
            <div className="box">
                <div className="head">Rejected webtoonz</div>
                <div className="count">
                    { rejectedToonz.length }
                </div>
            </div>
        </div>
  )
}
