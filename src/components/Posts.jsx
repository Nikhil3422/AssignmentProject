import React, { useState } from 'react';
import './Posts.css';

function Posts() {
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [postComments, setPostComments] = useState({});
  const [posts, setPosts] = useState([]);
  const [showpost, setShowpost] = useState(10);
  const [favourits, setFavourits] = useState(0);
  const [visibleBodyIndex, setVisibleBodyIndex] = useState(null);
  const[check,setCheck]=useState('');
 
  // const[toggelLike,setToggelLike]=useState(false);

  const fetchData = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    var data = [];
    data = await response.json();

    data.forEach((element, index)=> {
      data[index] = {...element, isLiked: false};
    })
    setPosts(data);
    console.log(data);
  };

  const loadMore = () => {
    setShowpost(showpost + 10);
  };

  const fetchComments = async (postId, index) => {
    if (activeItemIndex === index) {
       
      setActiveItemIndex(null);      // Close the comments if the same post is clicked again
    } else {
           
      if (!postComments[index]) {   // If comments for this post are not yet fetched
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=` + postId
        );
        const data = await response.json();
       
        setPostComments((prevComments) => ({
          ...prevComments,
          [index]: data,
        }));
      }

      setActiveItemIndex(index);  // Set the active index to open this post's comments
    }
  };

  const postvisible = posts.slice(0, showpost);

    const handleLike = () => {
      var counter = 0;
      posts.forEach((value)=>{
        if(value.isLiked){
          counter++;
        }
      })
      setFavourits(counter);
    };
   

    const toggleBodyVisibility = (index) => {
      if (index === visibleBodyIndex) {
        setVisibleBodyIndex(null);
        setActiveItemIndex(null); 
      } else {
        setVisibleBodyIndex(index);
        setActiveItemIndex(index);
      }
    };
//  if you clicked on like button is it true then like will apear red otherwise false its apper white.
 const Toggele=(index)=>{

        if(posts[index].isLiked){
          posts[index] = {...posts[index], isLiked: false};
          console.log("Gotcha Toggle False!")
        } else {
          posts[index] = {...posts[index], isLiked: true}
          console.log("Gotcha Toggle True !")
        }

        handleLike();
      
      }
  const favoritePosts = posts.filter(post => post.isLiked);
 const favoriteCount=favoritePosts.length;
 const favoriteIndices=favoritePosts.map(posts=>posts.id)

  const favouritedSentance=()=>{
    if(favoriteCount === 0){
      return "No post favourited ";
    }else if(favoriteCount === 1){
      return "Post " + favoritePosts[0].id + " is favourited ";
    }else if (favoriteCount > 1){
      var multi = getMultipleFavId();
      console.log("multi" + multi);
      return "Post " + multi + " and " + favoritePosts[favoriteCount - 1].id + " are favourited "; 
    }
  }

  const getMultipleFavId = () => {
    var str = "";
    for(let i = 0; i <= favoriteCount - 3; i++) {
      str = str + favoritePosts[i].id + ", ";
    }
    str = str + favoritePosts[favoriteCount - 2].id;
    console.log("Here" + str);
    return str;
  }

  return (
      <div className="container">
        <h1>Posts</h1>
        {/* <p>Favorited: ({favourits})</p> */}
       
        <p>{favouritedSentance()}({favoriteCount}) !</p>
      
        <button onClick={fetchData} className="posts-button">
          Get Posts
        </button>
        <div className="post-cards">
          {postvisible.map((post, index) => (
            <div className="post-card" key={index}>
              <p> <label>UserId:</label> {post.userId}</p>
              <p> <label>Id:</label> {post.id}</p>
              <table className='titleContent'>
                <tr>
                  <td>
                    <p
                      className="title">
                    <label>Title:</label> {post.title}
                    </p>
                  </td>
                  <td width = "30px">
                    <button className="arrow"onClick={() => toggleBodyVisibility(index)}>
                    {visibleBodyIndex===index?<span>⬇️</span>:<span>⬆️</span>}
                    </button>
                  </td>
                </tr>
              </table>
              {visibleBodyIndex === index && (
                <p>Body: {post.body}</p>
              )}
              <button
                onClick={() => fetchComments(post.id, index)}
                className={activeItemIndex === index ? 'active' : ''}
              >
                Read Comments
              </button>
              <button className='heart' onClick={() => Toggele(index)}>{post.isLiked ?<span>💓</span>:<span>🤍</span>}</button>
              {activeItemIndex === index && postComments[index] && (
                <div className='showdata'>
                  {postComments[index].map((item, commentIndex) => (
                    <div className='card-item' key={commentIndex}>
                      <p><label>Name: </label>{item.name}</p>
                      <p><label>Email: </label> {item.email}</p>
                      <p><label>Body: </label> {item.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {postvisible.length < posts.length && (
          <button onClick={loadMore} className="load-more-button">
            Load More
          </button>
        )}
      </div>
  );
}

export default Posts;
