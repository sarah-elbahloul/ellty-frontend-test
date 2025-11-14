import { useState, useEffect, } from 'react';

// Define the initial list of pages
const initialPages = [
  { id: 1, name: 'All pages', isChecked: false, isAllPages: true },
  { id: 2, name: 'Page 1', isChecked: false },
  { id: 3, name: 'Page 2', isChecked: false },
  { id: 4, name: 'Page 3', isChecked: false },
  { id: 5, name: 'Page 4', isChecked: false },
  { id: 6, name: 'Page 5', isChecked: false },
  { id: 7, name: 'Page 6', isChecked: false },
];

const App = () => {
  const [pages, setPages] = useState(initialPages);

  const AllPages = pages.find(p => p.isAllPages);
  const SinglePages = pages.filter(p => !p.isAllPages);
  const AllCheckedPages = SinglePages.every(p => p.isChecked);

  useEffect(() => {
    setPages(prevPages => {
      if (prevPages.find(p => p.isAllPages).isChecked === AllCheckedPages) {
        return prevPages;
      }
      return prevPages.map(p =>
        p.isAllPages ? { ...p, isChecked: AllCheckedPages } : p
      );
    });
  }, [AllCheckedPages]);


  const handleCheckboxToggle = (id) => {
    const isAllPagesClicked = id === AllPages.id;

    setPages(prevPages => {
      return prevPages.map(page => {
        if (isAllPagesClicked) {
          return { ...page, isChecked: !AllPages.isChecked };
        } else if (page.id === id) {
          return { ...page, isChecked: !page.isChecked };
        }
        return page;
      });
    });
  };


  const PageItem = ({ page, index }) => {
    const isAllPagesChoice = page.isMaster;

    if (isAllPagesChoice && index !== 0) return null;

    return (
      <label
        key={page.id}
        className="page-selector-row"
        onClick={() => handleCheckboxToggle(page.id)}
      >
        <span>{page.name}</span>
        <label className="checkbox-wrapper">
          <input type="checkbox" checked={page.isChecked} className="hidden-checkbox" />
          <span className="custom-checkbox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="check-icon"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </label>


      </label>
    );
  };

  const masterItem = pages.find(p => p.isAllPages);
  const detailItems = pages.filter(p => !p.isAllPages);

  return (
    <div className="page-selector-wrapper">
      <div className="page-selector-card">
        <div>
          <PageItem page={masterItem} index={0} />
        </div>
        <div className='card-divider-wrapper'>
          <hr className='card-divider' />
        </div>
        <div className="page-selector-scroll-container">
          {detailItems.map((page, index) => (
            <PageItem key={page.id} page={page} index={index + 1} />
          ))}
        </div>
        <div className='card-divider-wrapper'>
          <hr className='card-divider' />
        </div>
        <div className="page-selector-button-wrapper">
          <button
            className="page-selector-button"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;