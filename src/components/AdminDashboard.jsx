import React from 'react'

export default function AdminDashboard({ approvedToonz, pendingToonz, rejectedToonz, users }) {
  return (
    <div className="dashboard-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
  {/* Published */}
  <div className="box bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center">
    <div className="head text-gray-600 font-medium text-sm uppercase tracking-wide">
      Published Webtoonz
    </div>
    <div className="count text-4xl font-bold text-green-600 mt-2">
      {approvedToonz.length}
    </div>
  </div>

  {/* Users */}
  <div className="box bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center">
    <div className="head text-gray-600 font-medium text-sm uppercase tracking-wide">
      Users
    </div>
    <div className="count text-4xl font-bold text-blue-600 mt-2">
      {users.length}
    </div>
  </div>

  {/* Pending */}
  <div className="box bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center">
    <div className="head text-gray-600 font-medium text-sm uppercase tracking-wide">
      Pending Webtoonz
    </div>
    <div className="count text-4xl font-bold text-yellow-600 mt-2">
      {pendingToonz.length}
    </div>
  </div>

  {/* Rejected */}
  <div className="box bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center">
    <div className="head text-gray-600 font-medium text-sm uppercase tracking-wide">
      Rejected Webtoonz
    </div>
    <div className="count text-4xl font-bold text-red-600 mt-2">
      {rejectedToonz.length}
    </div>
  </div>
</div>

  )
}
