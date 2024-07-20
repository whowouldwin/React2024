import { useParams, useNavigate } from 'react-router-dom';
import { useGetPersonDetailsQuery } from '../../store/apiSlice';
import { getErrorMessage } from '../../utils/errorUtils';

const DetailComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: detail, error, isLoading } = useGetPersonDetailsQuery(id!);

  const handleCloseDetails = () => {
    navigate('/');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {getErrorMessage(error)}</div>;
  if (!detail) return <div>No detail available</div>;

  return (
    <div className="detail">
      <button onClick={handleCloseDetails}>Close</button>
      <h2>{detail.name}</h2>
      <p>Height: {detail.height}</p>
      <p>Mass: {detail.mass}</p>
      <p>Hair Color: {detail.hair_color}</p>
      <p>Skin Color: {detail.skin_color}</p>
      <p>Eye Color: {detail.eye_color}</p>
      <p>Birth Year: {detail.birth_year}</p>
    </div>
  );
};

export default DetailComponent;