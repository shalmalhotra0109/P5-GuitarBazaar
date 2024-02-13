import {useState, useEffect} from 'react'
import { FaGuitar } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { LiaGuitarSolid } from "react-icons/lia";
const LikeButton = ({user, guitar}) => {
    
    const [likes, setLikes] = useState(false);

    useEffect(() => {
      if (user.user_likes) {
        const likesListOG = user.user_likes.map(like => like.guitar_id);
        setLikes(likesListOG.includes(guitar.id));
      }
    }, [user.user_likes, guitar.id]); // Re-run this effect if user's likes or the current guitar changes
    
    const handleLike = (guitarId) => {
      fetch(`http://127.0.0.1:5000/user-like/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guitar_id: guitarId,
        }),
      })
      .then(response => {
        if (response.ok) {
          setLikes(!likes); // Optimistically toggle like state
        } else {
          throw new Error('Failed to toggle like');
        }
      })
      .catch((error) => console.error('Error:', error));
    };
  return (
    <>
 { likes?
        <Button variant="danger" onClick={()=>{handleLike(guitar.id)}}><FaGuitar /></Button>:
        <Button variant="danger" onClick={()=>{handleLike(guitar.id)}}><LiaGuitarSolid /></Button>
}
    </>
  )
}

export default LikeButton
