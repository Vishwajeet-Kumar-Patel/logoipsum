'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
  parentComment?: string | null;
}

interface CommentsSectionProps {
  postId: string;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string; error?: string } } }).response;
    return response?.data?.message || response?.data?.error || fallback;
  }

  return fallback;
};

const collectCommentTreeIds = (commentId: string, allComments: Comment[]) => {
  const ids = new Set<string>([commentId]);
  let changed = true;

  while (changed) {
    changed = false;
    allComments.forEach((comment) => {
      if (comment.parentComment && ids.has(comment.parentComment) && !ids.has(comment._id)) {
        ids.add(comment._id);
        changed = true;
      }
    });
  }

  return ids;
};

const getRelativeTime = (dateString: string) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const daysDifference = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  if (Math.abs(daysDifference) < 1) {
     const hoursDifference = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60));
     if(Math.abs(hoursDifference) < 1) {
         const mins = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60));
         return rtf.format(mins, 'minute');
     }
     return rtf.format(hoursDifference, 'hour');
  }
  return rtf.format(daysDifference, 'day');
};

const NestedComment = ({ 
  comment, 
  allComments, 
  postId, 
  onCommentAdded,
  onCommentUpdated,
  onCommentDeleted,
}: { 
  comment: Comment, 
  allComments: Comment[], 
  postId: string, 
  onCommentAdded: (c: Comment) => void,
  onCommentUpdated: (c: Comment) => void,
  onCommentDeleted: (commentId: string) => void,
}) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const childComments = allComments.filter(c => c.parentComment === comment._id);
  const isOwner = user?._id === comment.user._id;

  React.useEffect(() => {
    setEditText(comment.content);
  }, [comment.content]);

  const handleReplySubmit = async () => {
    if (!token) {
      toast.error('Login to reply');
      return;
    }
    if (!replyText.trim()) return;

    setSubmittingReply(true);
    try {
      const res = await api.post(`/user/posts/${postId}/comments`, { 
        content: replyText,
        parentCommentId: comment._id
      });
      onCommentAdded(res.data);
      setReplyText('');
      setShowReplyInput(false);
      toast.success('Reply added!');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to post reply'));
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!token) {
      toast.error('Please login to edit comment');
      return;
    }

    const content = editText.trim();
    if (!content) {
      toast.error('Comment cannot be empty');
      return;
    }

    setSavingEdit(true);
    try {
      const res = await api.put(`/user/comments/${comment._id}`, { content });
      onCommentUpdated(res.data);
      setIsEditing(false);
      toast.success('Comment updated');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update comment'));
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      toast.error('Please login to delete comment');
      return;
    }

    const confirmed = window.confirm('Delete this comment?');
    if (!confirmed) {
      return;
    }

    setDeleting(true);
    try {
      await api.delete(`/user/comments/${comment._id}`);
      onCommentDeleted(comment._id);
      toast.success('Comment deleted');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to delete comment'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-[4px] items-start w-full relative mt-[16px]">
      <div className="flex gap-[16px] items-start w-full">
        <div className="w-[40px] h-[40px] rounded-full bg-[#ebebeb] overflow-hidden shrink-0 flex items-center justify-center text-[#5a5a5a] font-bold relative">
          {comment.user.avatar ? (
            <Image src={comment.user.avatar} alt={comment.user.name} fill className="object-cover" />
          ) : (
            comment.user.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex flex-col w-full flex-1">
          <div className="flex items-baseline gap-[12px]">
            <span className="font-semibold text-[#1a1a1a] text-[15px]">{comment.user.name}</span>
            <span className="text-[#9a9a9a] text-[12px]">
              {getRelativeTime(comment.createdAt)}
            </span>
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-2 mt-[6px] w-full max-w-[600px]">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full min-h-[60px] p-3 rounded-[12px] border border-[#d8d1c7] resize-none focus:outline-none focus:ring-1 focus:ring-[#f95c4b] bg-white text-[14px]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(comment.content);
                  }}
                  className="px-4 py-1.5 rounded-full text-[13px] font-medium border border-[#d8d1c7] text-[#5a5a5a] hover:bg-[#f6f4f1]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  disabled={savingEdit}
                  className="bg-[#f95c4b] hover:bg-[#e04a39] text-white px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors disabled:opacity-50"
                >
                  {savingEdit ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[#5a5a5a] text-[15px] leading-relaxed whitespace-pre-wrap mt-[4px]">
              {comment.content}
            </p>
          )}
          
          <div className="flex gap-[15px] items-start mt-[8px]">
            <button
              type="button"
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center justify-center cursor-pointer hover:underline text-[#9a9a9a] text-[13px] font-medium"
            >
              Reply
            </button>

            {isOwner && !isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center cursor-pointer hover:underline text-[#9a9a9a] text-[13px] font-medium"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center justify-center cursor-pointer hover:underline text-[#b4534a] text-[13px] font-medium disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
          </div>

          {showReplyInput && (
            <div className="flex flex-col gap-3 mt-[8px] w-full max-w-[600px]">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.user.name}...`}
                className="w-full min-h-[60px] p-3 rounded-[12px] border border-[#d8d1c7] resize-none focus:outline-none focus:ring-1 focus:ring-[#f95c4b] bg-white text-[14px]"
              />
              <div className="flex justify-end">
                <button 
                  onClick={handleReplySubmit}
                  disabled={submittingReply || !replyText.trim()}
                  className="bg-[#f95c4b] hover:bg-[#e04a39] text-white px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors disabled:opacity-50"
                >
                  {submittingReply ? 'Posting...' : 'Reply'}
                </button>
              </div>
            </div>
          )}

          {childComments.length > 0 && (
            <div className="flex flex-col w-full border-l-2 border-[#e4ded2] pl-[16px] ml-[8px] mt-[4px]">
              {childComments.map(child => (
                <NestedComment 
                  key={child._id} 
                  comment={child} 
                  allComments={allComments} 
                  postId={postId} 
                  onCommentAdded={(newComment) => onCommentAdded(newComment)}
                  onCommentUpdated={(updatedComment) => onCommentUpdated(updatedComment)}
                  onCommentDeleted={(commentId) => onCommentDeleted(commentId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const token = useAuthStore((state) => state.token);
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
      setComments((prev) => [res.data, ...prev]);
      setNewComment('');
      toast.success('Comment posted successfully');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to post comment'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentUpdated = (updatedComment: Comment) => {
    setComments((prevComments) =>
      prevComments.map((existingComment) =>
        existingComment._id === updatedComment._id ? updatedComment : existingComment
      )
    );
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments((prevComments) => {
      const idsToDelete = collectCommentTreeIds(commentId, prevComments);
      return prevComments.filter((comment) => !idsToDelete.has(comment._id));
    });
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

      <div className="flex flex-col mt-4">
        {comments.filter(c => !c.parentComment).map((comment) => (
          <NestedComment
            key={comment._id}
            comment={comment}
            allComments={comments}
            postId={postId}
            onCommentAdded={(newComment) => setComments(prev => [...prev, newComment])}
            onCommentUpdated={handleCommentUpdated}
            onCommentDeleted={handleCommentDeleted}
          />
        ))}
        {comments.length === 0 && (
          <p className="text-center text-[#9a9a9a] py-8 border-t border-[#d8d1c7] mt-4">No comments yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}
