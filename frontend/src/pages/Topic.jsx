
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import unlike from '../assests/unlike.svg'; 
import liked from '../assests/liked.svg'; 
import { publicRequest, userRequest } from '../requestMethod';
import { toast } from 'react-toastify';

const TopicPage = () => {
  const { topicId } = useParams();
  const location = useLocation();
  const { topicName } = location.state || {};
  const { createdBy } = location.state || {};
  const [commentId, setCommentId] = useState({});
  const [comments, setComments] = useState([]);
  const [newReply, setNewReply] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [replies, setReplies] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [likedComments, setLikedComments] = useState({});
  const [currentUserId, setCurrentUserId]=useState(null);

  const addComment = async (data) => {
    try {
      const commentData = { comment: data.comment, topicId: topicId };
      const comment = await userRequest.post(`${process.env.REACT_APP_API_URL}comment/create`, commentData);
      toast.success('Comment added successfully');
      setComments([...comments, comment.data]);
      reset();
      fetchTopic();
    } catch (error) {
      toast.error('Something went wrong, Please try again');
    }
  };

  const fetchTopic = async () => {
    try {
      const response = await publicRequest.get(`${process.env.REACT_APP_API_URL}topic/${topicId}`);
      const { data: { _comment: comments } } = response.data;
      setComments(comments);
      const { data: { _user: users } } = response.data;
      setCurrentUserId(users._id)
      // Set initial like status
      const userLikes = {}; // To track like status for each comment
      comments.forEach(comment => {
        userLikes[comment._id] = comment.like.includes(currentUserId); // Check if the current user has liked this comment
      });
      setLikedComments(userLikes);
    } catch (error) {
      console.error('Error fetching topic:', error);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  const addReply = async (index) => {
    const replyText = newReply[index]?.trim();

    if (!replyText) {
      toast.error('Reply cannot be empty');
      return;
    }

    try {
      const replyData = {
        reply: replyText,
        commentId: comments[index]._id,
      };

      const reply = await userRequest.post(`${process.env.REACT_APP_API_URL}reply/create`, replyData);
      toast.success('You replied');

      // Make sure the replies array is defined before pushing a new reply
      const updatedComments = [...comments];
      if (!updatedComments[index].replies) {
        updatedComments[index].replies = []; // Initialize replies array if it's undefined
      }
      updatedComments[index].replies.push(reply.data);
      setComments(updatedComments);

      // Reset the input field and close the reply section
      setNewReply({ ...newReply, [index]: '' });
      setReplyingTo(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getReply = async (id) => {
    setSelectedIndex(id);
    try {
      const response = await publicRequest.get(`${process.env.REACT_APP_API_URL}comment/${id}`);
      setCommentId(id);
      setReplies(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const currUserId = currentUserId;
      const alreadyLiked = likedComments[commentId];

      const response = await userRequest.put(`${process.env.REACT_APP_API_URL}comment/like`, {
        commentId,
        topicId,
        like: !alreadyLiked
      });

      // Update the like status
      setLikedComments({
        ...likedComments,
        [commentId]: !alreadyLiked
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to like/unlike comment');
    }
  };

  return (
    <>
      <div className="w-full mt-14">
        <div className="flex flex-col md:flex-row md:gap-4 px-4">
          <div className="md:w-1/3">
            <h1 className="text-2xl font-bold mb-4">{topicName}</h1>
            <p className='text-gray-500 pl-2'>by: <span className='text-gray-400'>{createdBy}</span></p>
          </div>
          <div className="md:w-2/3 h-auto">
            <div className="comment-section flex justify-between mb-4">
              <form onSubmit={handleSubmit(addComment)} className="flex flex-grow gap-2">
                <input
                  type="text"
                  placeholder="Add a new comment"
                  {...register('comment', { required: true })}
                  className="flex-grow border rounded px-2 py-1"
                />
                <button type="submit" className="border rounded px-3 py-1 bg-blue-500 text-white hover:bg-blue-600">
                  Submit
                </button>
              </form>
              <Link to="/" className="border rounded px-3 py-1 bg-gray-300 hover:bg-gray-400">
                Back
              </Link>
            </div>

            <div className="h-[80vh] overflow-y-auto border-t-2 rounded-t-md hide-scrollbar">
              {comments.map((item, index) => (
                <div key={index} className="border shadow-md rounded-md mb-2 p-4">
                  <div className="comment-text text-lg mb-2">{item.comment}</div>

                  <div className="gap-3">
                    <div>
                      {replies && selectedIndex === item._id && (replies.map((reply, index) => (
                        <div key={index} className="m-1 text-w-full text-left text-gray-500">
                          {reply._reply.map((r) => (
                            <p key={r._id}>{r.reply}</p>
                          ))}
                        </div>
                      )))}
                    </div>
                    <div className='flex gap-3'>
                      <button
                        onClick={() => handleLike(item._id)}
                        className="bg-gray-200 border flex items-center justify-center rounded gap-2 px-2"
                      >
                        <img className="w-[18px] h-[15px]" alt="heart" src={likedComments[item._id] ? liked : unlike} />
                        {likedComments[item._id] ? 'Liked' : 'Like'}
                      </button>
                      <button onClick={() => setReplyingTo(index)} className="bg-gray-200 border rounded px-2">
                        Reply
                      </button>
                      <button onClick={() => getReply(item._id)} className="bg-gray-200 border rounded px-2">
                        View Reply
                      </button>
                    </div>
                  </div>
                  {replyingTo === index && (
                    <div className="reply-section mt-2">
                      <input
                        type="text"
                        value={newReply[index] || ''}
                        onChange={(e) => setNewReply({ ...newReply, [index]: e.target.value })}
                        placeholder="Add a reply..."
                        className="border rounded px-2 py-1 w-full"
                      />
                      <button
                        onClick={() => addReply(index)}
                        className="mt-2 border rounded px-3 py-1 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicPage;





