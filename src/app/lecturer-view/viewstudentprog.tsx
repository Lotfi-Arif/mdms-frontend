import React from 'react';
import styles from '@/styles/ViewStudentProgress.module.css';

interface Student {
  id: number;
  name: string;
  progress: number;
}

const MyStudentProgress: React.FC = () => {
  const students: Student[] = [
    { id: 1, name: "John Doe", progress: 75 },
    { id: 2, name: "Jane Smith", progress: 60 },
    { id: 3, name: "Alice Johnson", progress: 90 },
    { id: 4, name: "Bob Williams", progress: 40 },
    { id: 5, name: "Charlie Brown", progress: 85 },
    // Add more students as needed
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Student Progress</h1>
      <div className={styles.card}>
        <div className={styles.scrollableList}>
          {students.map((student) => (
            <div key={student.id} className={styles.studentItem}>
              <h3 className={styles.studentName}>{student.name}</h3>
              <div className={styles.progressBarContainer}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${student.progress}%` }}
                ></div>
                <span className={styles.progressText}>{student.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStudentProgress;