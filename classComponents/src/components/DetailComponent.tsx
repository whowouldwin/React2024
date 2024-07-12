import { useEffect, useState } from 'react';
import { Detail } from '../interfaces';

interface DetailComponentProps {
  id: string;
}

const DetailComponent = ({ id }: DetailComponentProps) => {
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
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