/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';
import '../styles/Home.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { publicRequest, userRequest } from '../requestMethod.js';
import Header from '../components/Header.jsx';

const Home = () => {
  const [topics, setTopics] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const fetchTopics = async () => {
    try {
      const response = await publicRequest.get(`${process.env.REACT_APP_API_URL}topic`);
      const topics = response.data.data;
      if (Array.isArray(topics)) {
        setTopics(topics);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleAddTopic = async (data) => {
    try {
      await userRequest.post(`${process.env.REACT_APP_API_URL}topic/create`, data);
      toast.success('Topic added successfully');
      fetchTopics();
      reset(); // Reset the input field after submission
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error adding topic:', error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      <Header />

      <div className="container mx-auto mt-20 p-4">
        <div className="fixed top-16 left-0 right-0 z-10 p-4 flex justify-center">
          <form 
            onSubmit={handleSubmit(handleAddTopic)} 
            className=""
          >
            <input
              type="text"
              {...register('topicName', { required: true })}
              placeholder="Add a new topic"
              className="p-2 mr-3 border rounded"
            />
            <button type="submit" className="p-2 bg-blue-600 text-white rounded">
              Add Topic
            </button>
          </form>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[calc(100vh-8rem)] overflow-y-auto justify-center hide-scrollbar">
          {topics.map((topic, index) => (
            <Card key={index} topic={topic} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
