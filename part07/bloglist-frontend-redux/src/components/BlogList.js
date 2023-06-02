import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import Blog from "./Blog";

import { setGreenNotification, setRedNotification } from '../reducers/notificationReducer'
import { initializeBlogs, destroyBlog, likeBlog } from '../reducers/blogsReducer'

import store from "../store"

const BlogList = ({ user }) => {

    const [successShown, setSuccessShown] = useState(false);
    
    const dispatch = useDispatch();

    const blogs = useSelector(state => {
        return [...state.blogs]
    })

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [blogs, dispatch]);

    useEffect(() => {
        dispatch(initializeBlogs()).then(() => {
            if (!successShown) {
                dispatch(setGreenNotification("successfully connected to blog"));
                setSuccessShown(true);
            }
        })
    }, [dispatch, setGreenNotification, setSuccessShown])

    const handleErrorResponse = (error, user) => {
        if (error?.response?.status === 500) {
          dispatch(setRedNotification("fatal error: lost connection to blog"));
        } else if (error?.response?.status === 401) {
          dispatch(setRedNotification(`session expired: ${user.name} please log and try again`));
        } else {
          dispatch(setRedNotification(`fatal error: something wrong happened (${error?.response?.data.error})`));
        }
    };

    const removeABlog = (returnedBlog) => {
        try {
          if (window.confirm(`remove blog '${returnedBlog.title}' by '${returnedBlog.author}'?`)) {
            dispatch(destroyBlog(returnedBlog.id))
            .then(() => {
              dispatch(setRedNotification(`blog '${returnedBlog.title}' by '${returnedBlog.author}' was removed`));
              const blogsState2 = store.getState().blogs;
              console.log(blogsState2);
            })
            .catch((error) => {
              handleErrorResponse(error, user);
            });
          }
        } catch (exception) {
          dispatch(setRedNotification(`fatal error: something wrong happened (${exception})`));
        }
    };

    const likeABlog = (returnedBlog) => {
        try {
          const blogId = returnedBlog.id;
          const likedBlog = { ...returnedBlog, likes: returnedBlog.likes + 1 };
    
          dispatch(likeBlog(blogId, likedBlog)).catch((error) => {
            handleErrorResponse(error, user);
          });
        } catch (exception) {
          dispatch(setRedNotification(`fatal error: something wrong happened (${exception})`));
        }
    };

    return (
        <div>
            <h2>Blog list</h2>
            {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
            <Blog
                key={blog.id}
                blog={blog}
                user={user}
                removeBlog={removeABlog}
                likeBlog={likeABlog}
            />
            ))}
        </div>
    )
}

export default BlogList