'use client';

import React, { useEffect, useState } from 'react';
import api from '@/src/lib/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/src/store/useAuthStore';

interface Comment {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

interface CommentsSectionProps {
  postId: string;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const { token } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/user/posts/${postId}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to comment');
      return;
    }
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post(`/user/posts/${postId}/comments`, { content: newComment });
      setComments([res.data, ...comments]);
      setNewComment('');
      toast.success('Comment posted successfully');
    } catch (err) {
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="mt-8">Loading comments...</div>;

  return (
    <div className="flex flex-col gap-[24px] mt-8 w-full max-w-[1119px] shrink-0 font-['Figtree',sans-serif]">
      <h3 className="font-semibold text-[20px] text-[#1a1a1a]">Comments ({comments.length})</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full min-h-[100px] p-4 rounded-[12px] border border-[#d8d1c7] resize-none focus:outline-none focus:ring-1 focus:ring-[#f95c4b] bg-white"
        />
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={submitting || !newComment.trim()}
            className="bg-[#f95c4b] hover:bg-[#e04a39] text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-[20px] mt-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-[16px] items-start">
            <div className="w-[40px] h-[40px] rounded-full bg-[#ebebeb] overflow-hidden shrink-0 flex items-center justify-center text-[#5a5a5a] font-bold">
              {comment.user.avatar ? (
                <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
              ) : (
                comment.user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex flex-col gap-[4px] w-full">
              <div className="flex items-baseline gap-[12px]">
                <span className="font-semibold text-[#1a1a1a] text-[15px]">{comment.user.name}</span>
                <span className="text-[#9a9a9a] text-[12px]">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-[#5a5a5a] text-[15px] leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-center text-[#9a9a9a] py-8 border-t border-[#d8d1c7] mt-4">No comments yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}
