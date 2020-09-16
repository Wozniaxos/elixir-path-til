import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import useUser from '../utils/customHooks/useUser'

const UserProfile = () => {
  // const [userPosts, setUserPosts] = useState(null)
  const user = useUser()

  useEffect(() => {
    if (user) {
      // setUserPosts(user.posts)
    }
  }, [user])

  const userPosts = [
    {
      author: {
        email: 'l.walczak@selleo.com',
        firstName: 'Łukasz',
        image:
          'https://lh3.googleusercontent.com/a-/AOh14GghKn-B5cr43z1j2u7PXuC9fmefHBl2h0hUTyhz',
        lastName: 'Walczak',
        uuid: '06b5f538-0166-4421-88c0-afc58ea871d3',
      },
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare turpis vitae nibh gravida, ut facilisis nisl dapibus. Aliquam ornare tortor quis tellus posuere egestas.',
      categories: [
        'chrome',
        'commandline',
        'ember',
        'angular',
        'aws',
        'css',
        'docker',
        'elasticsearch',
        'crystal',
      ],
      id: 3,
      isPublic: false,
      reactionCount: 0,
      reactions: [],
      reviewed: true,
      title: 'Post Title',
    },
  ]

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
