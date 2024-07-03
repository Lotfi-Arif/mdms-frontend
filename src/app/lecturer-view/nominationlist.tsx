import React, { useState } from 'react';
import styles from '@/styles/NominationList.module.css';

interface Lecturer {
  id: number;
  name: string;
  expertise: string;
  nominated: boolean;
}

const NominationList: React.FC = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([
    { id: 1, name: "Dr. Jane Smith", expertise: "Artificial Intelligence", nominated: false },
    { id: 2, name: "Prof. John Doe", expertise: "Machine Learning", nominated: false },
    { id: 3, name: "Dr. Emily Brown", expertise: "Computer Networks", nominated: false },
    { id: 4, name: "Prof. Michael Johnson", expertise: "Cybersecurity", nominated: false },
    { id: 5, name: "Dr. Sarah Lee", expertise: "Data Science", nominated: false },
  ]);

  const handleNominate = (id: number) => {
    setLecturers(lecturers.map(lecturer => 
      lecturer.id === id ? { ...lecturer, nominated: !lecturer.nominated } : lecturer
    ));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nomination List</h1>
      <table className={styles.nominationTable}>
        <thead>
          <tr>
            <th>Lecturer & Expertise</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer) => (
            <tr key={lecturer.id}>
              <td>
                <strong>{lecturer.name}</strong>
                <br />
                <span>{lecturer.expertise}</span>
              </td>
              <td>
                <button 
                  className={`${styles.nominateButton} ${lecturer.nominated ? styles.nominated : ''}`}
                  onClick={() => handleNominate(lecturer.id)}
                >
                  {lecturer.nominated ? 'Nominated' : 'Nominate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NominationList;