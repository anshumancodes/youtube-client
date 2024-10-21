import React, { useState } from 'react';
import { User, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

type Comment = {
  id: number;
  user: string;
  content: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
};

type CommentProps = {
  comment: Comment;
  onReply: (parentId: number, content: string) => void;
};

const SingleComment: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };
 
  return (
    <div className="flex space-x-3 mb-4">
      <User className="w-10 h-10 text-gray-400" />
      <div className="flex-1">
        <p className="font-semibold">{comment.user}</p>
        <p className="text-sm text-gray-600">{comment.content}</p>
        <div className="flex items-center space-x-4 mt-2">
          <button className="flex items-center text-sm text-gray-500">
            <ThumbsUp className="w-4 h-4 mr-1" /> {comment.likes}
          </button>
          <button className="flex items-center text-sm text-gray-500">
            <ThumbsDown className="w-4 h-4 mr-1" /> {comment.dislikes}
          </button>
          <button 
            className="text-sm text-blue-500"
            onClick={() => setIsReplying(!isReplying)}
          >
            Reply
          </button>
        </div>
        {isReplying && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
             
              placeholder="Add a reply..."
            />
            <button 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleReply}
            >
              Reply
            </button>
            
          </div>
        )}
        {comment.replies.map((reply) => (
          <SingleComment key={reply.id} comment={reply} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    
  ]);

  const [newComment, setNewComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const addComment = (content: string, parentId?: number) => {
    const newCommentObj: Comment = {
      id: Date.now(),
      user: 'Current User',
      content,
      likes: 0,
      dislikes: 0,
      replies: [],
    };

    if (parentId) {
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === parentId
            ? { ...comment, replies: [...comment.replies, newCommentObj] }
            : comment
        )
      );
    } else {
      setComments(prevComments => [...prevComments, newCommentObj]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(newComment);
      setNewComment('');
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className=" w-[900px] mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          className="w-full px-2  outline-none border-b border-gray-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Add a comment..."
        />
        
        {isFocused && (<button 
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-[21px]"
        >
          Comment
        </button>)}
      </form>
      <div>
        {comments.map((comment) => (
          <SingleComment 
            key={comment.id} 
            comment={comment} 
            onReply={(parentId, content) => addComment(content, parentId)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;