import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://codebuddy.review/posts')
      .then(response => response.json())
      .then(data => setPosts(data.data.posts));
  }, []);

  const navigate = useNavigate();
  const goToAddPost = () => navigate('/');
  return (
    <>
      <Button onClick={goToAddPost}>Add Post</Button>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Write up</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 1 &&
            posts.map(post => (
              <tr key={post.id}>
                <td>{post.firstName}</td>
                <td>{post.lastName}</td>
                <td>{post.writeup}</td>
                <td>
                  <img src={post.image} alt={post.image} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Posts;
