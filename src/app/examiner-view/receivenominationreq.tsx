import React, { useState } from 'react';
import styles from '@/styles/ReceiveNomination.module.css';
import Modal from '@/components/modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Project {
  id: number;
  title: string;
  type: string;
  fieldOfArea: string;
}

const NominationList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: "Green Energy Initiative", type: "Sustainability", fieldOfArea: "Renewable Energy" },
    { id: 2, title: "AI in Healthcare", type: "Technology", fieldOfArea: "Medical Research" },
    // Add more projects as needed
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleApprove = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDeny = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedProject && selectedDate && selectedTime) {
      console.log(`Approved project: ${selectedProject.title}`);
      console.log(`Selected date: ${selectedDate.toDateString()}`);
      console.log(`Selected time: ${selectedTime}`);
      // Add your approval logic here
      setShowModal(false);
      setSelectedProject(null);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nomination List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <strong>Project Title:</strong> {project.title}<br />
                <strong>Project Type:</strong> {project.type}<br />
                <strong>Field of Area:</strong> {project.fieldOfArea}
              </td>
              <td>
                <button className={styles.approveButton} onClick={() => handleApprove(project)}>Approve</button>
                <button className={styles.denyButton} onClick={() => handleDeny(project.id)}>Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Select Date and Time</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateSelect}
          inline
        />
        {selectedDate && (
          <div className={styles.timeSlots}>
            <h3>Select Time Slot</h3>
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={selectedTime === time ? styles.selectedTime : ''}
              >
                {time}
              </button>
            ))}
          </div>
        )}
        <button 
          onClick={handleConfirm} 
          disabled={!selectedDate || !selectedTime}
          className={styles.confirmButton}
        >
          Confirm
        </button>
      </Modal>
    </div>
  );
};

export default NominationList;