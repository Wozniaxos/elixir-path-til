import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import useUser from '../utils/customHooks/useUser'

const UserProfile = () => {
  const [userPosts, setUserPosts] = useState(null)
  const user = useUser()

  useEffect(() => {
    if (user) {
      setUserPosts(user.posts)
    }
  }, [user])

  return (
    <>
      {userPosts ? (
        <div className="posts">
          {userPosts.map(post => (
            <Post key={post.id} post={post} userPost userImage={user.image} />
          ))}
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  )
}

export default UserProfile
