import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Detail } from '../../interfaces';

const DetailComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: Detail = await response.json();
        setDetail(data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleCloseDetails = () => {
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
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