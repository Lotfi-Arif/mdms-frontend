import React, { useState } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import FileUpload from '@/components/FileUpload';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function StudentSubmission() {
  const [value, setValue] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<boolean[][]>(
    Array(4).fill(Array(4).fill(false))
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleFileUpload = (tabIndex: number, fileIndex: number) => {
    const newUploadedFiles = [...uploadedFiles];
    newUploadedFiles[tabIndex] = [...newUploadedFiles[tabIndex]];
    newUploadedFiles[tabIndex][fileIndex] = true;
    setUploadedFiles(newUploadedFiles);
  };

  const isTabEnabled = (tabIndex: number) => {
    if (tabIndex === 0) return true;
    return uploadedFiles[tabIndex - 1].every(file => file);
  };

  const renderTabs = () => {
    return ['Page 1', 'Page 2', 'Page 3', 'Page 4'].map((label, index) => (
      <Tab
        key={index}
        label={label}
        disabled={!isTabEnabled(index)}
      />
    ));
  };

  const renderTabPanels = () => {
    return [0, 1, 2, 3].map(tabIndex => (
      <TabPanel key={tabIndex} value={value} index={tabIndex}>
        <h2>Upload Files for {`Page ${tabIndex + 1}`}</h2>
        {[0, 1, 2, 3].map(fileIndex => (
          <FileUpload
            key={fileIndex}
            onUpload={() => handleFileUpload(tabIndex, fileIndex)}
            isUploaded={uploadedFiles[tabIndex][fileIndex]}
          />
        ))}
        {tabIndex < 3 && uploadedFiles[tabIndex].every(file => file) && (
          <Button onClick={() => setValue(tabIndex + 1)}>
            Next Page
          </Button>
        )}
      </TabPanel>
    ));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="student submission tabs">
          {renderTabs()}
        </Tabs>
      </Box>
      {renderTabPanels()}
    </Box>
  );
}