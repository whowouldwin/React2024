import { useDispatch, useSelector } from 'react-redux';
import { unselectAll } from '../../store/selectedItemsSlice';
import type { RootState, AppDispatch } from '../../store/store';

const Flyout = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);

  if (selectedItems.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const csvContent = `data:text/csv;charset=utf-8,${selectedItems
      .map(item => `${item.name},${item.height},${item.mass},${item.hair_color},${item.skin_color},${item.eye_color},${item.birth_year}`)
      .join('\n')}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flyout">
      <p>{selectedItems.length} items are selected</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;