import { useParams } from 'react-router-dom';
import './Complaints.css';

function Complaints() {
  const { id } = useParams();
  console.log(id);
  console.log(window.location);
  return <h2 className="logo__title">Welcome</h2>;
}

export default Complaints;
