import ReactMarkdown from 'react-markdown'

const Markdown = ({ text }) => {
    return (
        <div>
        <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
}

export default Markdown;