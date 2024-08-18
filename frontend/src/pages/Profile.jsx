// import React,{useEffect, useState} from 'react'
// import { userRequest } from '../requestMethod';
// import { Link } from 'react-router-dom';

// const Profile =() => {
//     const [user, setUser] = useState(null);
    


//     const fetchUser = async () => {
//         try {

//           const response = await userRequest.get(`${process.env.REACT_APP_API_URL}user/me`);
//           setUser(response.data.data);
//         } catch (error) {
//           console.error('Error fetching user data:', error.response ? error.response.data : error.message);
//           return null;
//         }
//       };
//     useEffect(()=>{
//         fetchUser();
//     },[])



//     return (
//         <div className="bg-gray-100 mt-7">
//             <div className="container mx-auto pt-8">
//                 <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
//                     <div className="col-span-4 sm:col-span-3 h-full">
//                         <div className="bg-white shadow rounded-lg p-6">
//                             <div className="flex flex-col items-center">
//                                 <img src="https://randomuser.me/api/portraits/men/94.jpg" className=" h-32 bg-gray-300 rounded-full mb-4 shrink-0">

//                                 </img>
//                                 <h1 className="text-xl bg-transparent text-black font-bold">{user.name}</h1>
//                                 <p className="text-gray-700 "> <span className='font-bold'>Email: {user.email}</span>hjkjlj</p>
//                                 <p className="text-gray-700"><span className='font-bold'>Contact No: </span> +91 823145967</p>
//                                 {/* <div className="mt-6 flex flex-wrap gap-4 justify-center">
//                                     <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
//                                     <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
//                                 </div> */}
//                             </div>
//                             <hr className="my-6 border-t border-gray-300" />
//                             {/* <div className="flex flex-col">
//                                 <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
//                                 <ul>
//                                     <li className="mb-2">JavaScript</li>
//                                     <li className="mb-2">React</li>
//                                     <li className="mb-2">Node.js</li>
//                                     <li className="mb-2">HTML/CSS</li>
//                                     <li className="mb-2">Tailwind Css</li>
//                                 </ul>
//                             </div> */}
//                         </div>
//                     </div>
//                     <div className="col-span-4 sm:col-span-9">
//                         <div className="bg-white shadow rounded-lg p-6 h-full">
//                         <div className='flext justify-between'>
//                             <h2 className="text-xl font-bold mb-8">My comments</h2>
//                             <Link to="/" className="border rounded px-3 py-1 bg-gray-300 hover:bg-gray-400">
//                 Back
//               </Link>
//                         </div>
//                             <p className='text-center text-gray-400'>Failed to fetch data</p>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Profile


import React, { useEffect, useState } from 'react';
import { userRequest } from '../requestMethod';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await userRequest.get(`${process.env.REACT_APP_API_URL}user/me`);
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Render a loading state or a placeholder until user data is fetched
  }

  return (
    <div className="bg-gray-100 mt-7">
      <div className="container mx-auto pt-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3 h-[600px]">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/94.jpg"
                  className="h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="User"
                />
                <h1 className="text-xl bg-transparent text-black font-bold">{user.name}</h1>
                <p className="text-gray-700">
                  <span className="font-bold">Email: {user.email}</span>
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Contact No: </span> +91 823145967
                </p>
              </div>
              <hr className="my-6 border-t border-gray-300" />
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6 h-full">
              <div className="flex justify-between  mb-8">
                <h2 className="text-xl font-bold ">My comments</h2>
                <Link to="/" className="border rounded px-3  bg-gray-300 hover:bg-gray-400">
                  Back
                </Link>
              </div>
              <p className="text-center text-gray-400">Failed to fetch data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
