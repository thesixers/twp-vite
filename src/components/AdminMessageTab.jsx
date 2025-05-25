import React from 'react'

export default function AdminMessageTab({messages}) {
    const [showing, setShowing] = React.useState('all');
    const [messageId, setMessageId] = React.useState(null);


    const showMessageDetails = (name, email, message, time) => {
        console.log({name, email, message, time});
    }

    
  return (
    <div className="admin-messages">
    <div className="head">
        <div className={`webtoonz-sub msg-all ${showing === 'all' ? 'text-red-500' : "text-gray-400"}`} onClick={() => setShowing('all')}>All</div>
        <div className={`webtoonz-sub msg-all ${showing === 'unreplied' ? 'text-red-500' : "text-gray-400"}`} onClick={() => setShowing('unreplied')}>Unreplied</div>
        <div className={`webtoonz-sub msg-all ${showing === 'replied' ? 'text-red-500' : "text-gray-400"}`} onClick={() => setShowing('replied')}>Replied</div>
    </div>
    <div className="message-list">
    {messages
    .filter(msg => showing === 'all' || msg.status === showing)
    .map(msg => (
        <div
            key={msg._id}
            className="message-card"
            onClick={() => {
                showMessageDetails(msg.name, msg.email, msg.message, msg.createdAt);
                setMessageId(msg._id);
            }}
        >
            <h3 className="sender-name">{msg.name}</h3>
            <p className="message-preview">{msg.message.slice(0, 40)}...</p>
            <span className="message-time">{msg.createdAt.split(",")[2]}</span>
        </div>
    ))}

      </div>
    
      <div id="message-modal" className="modal hidden">
        <div className="modal-content">
          <h2 id="modal-sender-name"></h2>
          <p><strong>Email:</strong> <span id="modal-email"></span></p>
          <p><strong>Message:</strong></p>
          <p id="modal-message-body"></p>
          <p><strong>Time:</strong> <span id="modal-time"></span></p>
          <button className="reply-button" onclick="showReplyForm()">Reply</button>
          <button className="close-button" onclick="closeModal()">Close</button>
        </div>
      </div>
    

      <div id="reply-modal" className="modal hidden">
        <div className="modal-content">
          <h2>Reply to <span id="reply-to-name"></span></h2>
          <textarea className="reply-input" placeholder="Write your reply here..."></textarea>
          <br/>
          <button className="send-button">Send Reply</button>
          <button className="close-button" onclick="closeModal()">Close</button>
        </div>
      </div>
    
</div>
  )
}
