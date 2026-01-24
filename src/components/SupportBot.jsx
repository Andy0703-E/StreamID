import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';

const SupportBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('support_chat_history');
        if (savedHistory) {
            try {
                setMessages(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Failed to parse chat history:', e);
                setMessages([
                    { role: 'assistant', content: 'Halo! Saya StreamID Support Bot. Ada yang bisa saya bantu terkait kendala nonton atau laporan bug?' }
                ]);
            }
        } else {
            setMessages([
                { role: 'assistant', content: 'Halo! Saya StreamID Support Bot. Ada yang bisa saya bantu terkait kendala nonton atau laporan bug?' }
            ]);
        }
    }, []);

    // Persist to localStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            // Filter out internal state if needed, but here we just save the content
            localStorage.setItem('support_chat_history', JSON.stringify(messages));
        }
    }, [messages]);

    const [position, setPosition] = useState({ x: 0, y: 0 }); // Offset from bottom-right (2rem, 2rem)
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [hasMoved, setHasMoved] = useState(false);
    const messagesEndRef = useRef(null);
    const botRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const userMsg = { role: 'user', content: message };
        setMessages(prev => [...prev, userMsg]);
        setMessage('');
        setIsLoading(true);

        const currentActivity = typeof window !== 'undefined' ? window.__STREAMID_ACTIVITY__ : null;
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

        try {
            const response = await fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    history: messages.slice(-5), // Send last 5 messages for context
                    userContext: {
                        activity: currentActivity,
                        url: currentUrl
                    }
                })
            });

            const data = await response.json();
            if (data.message) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
            } else if (data.error) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `Error: ${data.error}. Mohon beritahu admin.`,
                    isError: true
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: 'Maaf, saya sedang mengalami gangguan teknis. Coba lagi nanti ya!',
                    isError: true
                }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Gagal terhubung ke server. Pastikan koneksi internet Anda stabil.',
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = (content) => {
        // Handle bold: **text** -> <strong>text</strong>
        let html = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Handle bullet points: * text -> <li>text</li> (wrapped in <ul> later or just div)
        html = html.replace(/^\* (.*)/gm, '• $1');

        // Handle line breaks
        return html.split('\n').map((line, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
        ));
    };

    const handleStart = (e) => {
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        setIsDragging(true);
        setHasMoved(false);
        setDragStart({
            x: clientX - position.x,
            y: clientY - position.y
        });
    };

    const handleMove = (e) => {
        if (!isDragging) return;

        setHasMoved(true);
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        // Calculate new position
        let newX = clientX - dragStart.x;
        let newY = clientY - dragStart.y;

        setPosition({ x: newX, y: newY });
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    const toggleChat = (e) => {
        // Only toggle if it wasn't a significant drag
        if (!hasMoved) {
            setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleMove, { passive: false });
            window.addEventListener('touchend', handleEnd);
        } else {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, dragStart]);

    return (
        <div className="support-bot-container" style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? 'grabbing' : 'auto',
            touchAction: 'none'
        }}>
            {/* Toggle Button */}
            <button
                className={`support-toggle ${isOpen ? 'active' : ''}`}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
                onClick={toggleChat}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                <span className="tooltip">Tanya Support</span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="header-info">
                            <div className="bot-avatar">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3>StreamID Support</h3>
                                <div className="status">
                                    <span className="dot"></span>
                                    Online
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-wrapper ${msg.role}`}>
                                <div className="message-icon">
                                    {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                                </div>
                                <div className="message-content">
                                    {renderMessage(msg.content)}
                                    {msg.isError && (
                                        <a
                                            href="https://wa.me/6285242891112"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="wa-error-btn"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Hubungi Admin via WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message-wrapper assistant">
                                <div className="message-icon">
                                    <Bot size={14} />
                                </div>
                                <div className="message-content loading">
                                    <Loader2 className="animate-spin" size={16} />
                                    <span>Mengetik...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Ketik pesan..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" disabled={!message.trim() || isLoading}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <style jsx>{`
                .support-bot-container {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 9999;
                    font-family: 'Inter', sans-serif;
                }

                .support-toggle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: #e11d48;
                    border: none;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 10px 25px rgba(225, 29, 72, 0.4);
                    transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                    position: relative;
                }

                .support-toggle:hover {
                    transform: scale(1.1) rotate(5deg);
                }

                .support-toggle.active {
                    background: #1a1d23;
                    transform: rotate(90deg);
                }

                .tooltip {
                    position: absolute;
                    right: 70px;
                    background: #1a1d23;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    white-space: nowrap;
                    opacity: 0;
                    transform: translateX(10px);
                    transition: all 0.3s ease;
                    pointer-events: none;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .support-toggle:hover .tooltip {
                    opacity: 1;
                    transform: translateX(0);
                }

                .chat-window {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 380px;
                    height: 550px;
                    background: #1a1d23;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                    animation: slideUp 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                    backdrop-filter: blur(20px);
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .chat-header {
                    padding: 1.5rem;
                    background: linear-gradient(135deg, #e11d48, #be123c);
                    color: white;
                }

                .header-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .bot-avatar {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .chat-header h3 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin: 0;
                }

                .status {
                    font-size: 0.75rem;
                    opacity: 0.9;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .dot {
                    width: 6px;
                    height: 6px;
                    background: #4ade80;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #4ade80;
                }

                .chat-messages {
                    flex: 1;
                    padding: 1.5rem;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .message-wrapper {
                    display: flex;
                    gap: 0.75rem;
                    max-width: 85%;
                }

                .message-wrapper.user {
                    flex-direction: row-reverse;
                    align-self: flex-end;
                }

                .message-icon {
                    width: 28px;
                    height: 28px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #94a3b8;
                    flex-shrink: 0;
                }

                .user .message-icon {
                    background: rgba(225, 29, 72, 0.1);
                    color: #e11d48;
                }

                .message-content {
                    padding: 0.8rem 1.25rem;
                    border-radius: 16px;
                    font-size: 0.9375rem;
                    line-height: 1.5;
                    white-space: pre-wrap;
                }

                .assistant .message-content {
                    background: rgba(255, 255, 255, 0.03);
                    color: #e2e8f0;
                    border-top-left-radius: 4px;
                }

                .user .message-content {
                    background: #e11d48;
                    color: white;
                    border-top-right-radius: 4px;
                }

                .wa-error-btn {
                    display: inline-flex;
                    align-items: center;
                    margin-top: 1rem;
                    padding: 0.6rem 1rem;
                    background: #25d366;
                    color: white;
                    border-radius: 10px;
                    text-decoration: none;
                    font-size: 0.8125rem;
                    font-weight: 700;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                }

                .wa-error-btn:hover {
                    background: #128c7e;
                    transform: translateY(-2px);
                    color: white;
                }

                .message-content.loading {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #64748b;
                    font-style: italic;
                    background: transparent;
                }

                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .chat-input {
                    padding: 1.25rem;
                    background: rgba(255, 255, 255, 0.02);
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    gap: 0.75rem;
                }

                .chat-input input {
                    flex: 1;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0.75rem 1rem;
                    color: white;
                    outline: none;
                    font-size: 0.9375rem;
                }

                .chat-input input:focus {
                    border-color: #e11d48;
                    background: rgba(225, 29, 72, 0.05);
                }

                .chat-input button {
                    width: 44px;
                    height: 44px;
                    background: #e11d48;
                    border: none;
                    border-radius: 12px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .chat-input button:hover:not(:disabled) {
                    background: #be123c;
                    transform: translateY(-2px);
                }

                .chat-input button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                @media (max-width: 480px) {
                    .support-bot-container {
                        bottom: 1rem;
                        right: 1rem;
                    }
                    .chat-window {
                        width: calc(100vw - 2rem);
                        height: calc(100vh - 120px);
                        bottom: 70px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SupportBot;
