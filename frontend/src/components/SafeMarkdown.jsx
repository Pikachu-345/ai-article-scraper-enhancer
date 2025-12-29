import React from 'react';
import ReactMarkdown from 'react-markdown';

// Error Boundary for ReactMarkdown
class MarkdownErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Markdown rendering error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={this.props.className} style={{ whiteSpace: 'pre-wrap' }}>
                    {this.props.fallbackContent || 'Content unavailable'}
                </div>
            );
        }

        return this.props.children;
    }
}

// Safe wrapper for ReactMarkdown
function SafeMarkdown({ children, className = '' }) {
    // Ensure we have valid string content
    if (children === null || children === undefined) {
        return <div className={className}>No content available</div>;
    }

    // Convert to string if needed
    const content = typeof children === 'string' ? children : String(children);

    // Empty content check
    if (content.trim().length === 0) {
        return <div className={className}>No content available</div>;
    }

    return (
        <MarkdownErrorBoundary className={className} fallbackContent={content}>
            <div className={className}>
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </div>
        </MarkdownErrorBoundary>
    );
}

export default SafeMarkdown;
