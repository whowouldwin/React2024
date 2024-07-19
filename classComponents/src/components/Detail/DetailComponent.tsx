import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Detail } from '../../interfaces';
import { useNavigate} from 'react-router-dom';

const DetailComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('frontpage');

  const currentPage = page ? parseInt(page, 10) : 1;

  const handleCloseDetails = () => {
    navigate(`/?frontpage=${currentPage}`);
  };


  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const peopleId: string = (currentPage - 1) + (id ?? '');
        const response = await fetch(`https://swapi.dev/api/people/${peopleId}/`);
         if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Detail = await response.json();
        setDetail(data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!detail) {
    return <div>No detail available</div>;
  }

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