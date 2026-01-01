import React, { useState } from 'react';

const TransactionItem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingCat, setIsEditingCat] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Initialisation avec LocalStorage
  const [category, setCategory] = useState(
    localStorage.getItem(`cat-${data.id}`) || data.category
  );

  const [notes, setNotes] = useState(
    localStorage.getItem(`notes-${data.id}`) || data.notes
  );

  // SAUVEGARDE
  const saveCategory = (e) => {
    e.stopPropagation();
    localStorage.setItem(`cat-${data.id}`, category);
    setIsEditingCat(false);
  };

  const saveNotes = (e) => {
    e.stopPropagation();
    localStorage.setItem(`notes-${data.id}`, notes);
    setIsEditingNotes(false);
  };

  return (
    <div className="transaction-item-container">
      <div className="transaction-main-info" onClick={() => setIsOpen(!isOpen)}>
        <div className="arrow-col">
          <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
        <div>{data.date}</div>
        <div>{data.description}</div>
        <div>{data.amount}</div>
        <div>{data.balance}</div>
      </div>

      {isOpen && (
        <div className="transaction-details-content">
          <p>Transaction Type: {data.type}</p>
          
         
          <div className="editable-row">
            <span>Category: </span>
            {isEditingCat ? (
              <>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="Food">Food</option>
                  <option value="Services">Services</option>
                  <option value="Others">Others</option>
                </select>
                <button onClick={saveCategory} className="save-button">Save</button>
              </>
            ) : (
              <>
                <span>{category}</span>
                <i className="fa-solid fa-pencil-alt" onClick={(e) => { e.stopPropagation(); setIsEditingCat(true); }}></i>
              </>
            )}
          </div>

         
          <div className="editable-row">
            <span>Notes: </span>
            {isEditingNotes ? (
              <>
                <input 
                  type="text" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
                <button onClick={saveNotes} className="save-button">Save</button>
              </>
            ) : (
              <>
                <span>{notes || "Add a note..."}</span>
                <i className="fa-solid fa-pencil-alt" onClick={(e) => { e.stopPropagation(); setIsEditingNotes(true); }}></i>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;