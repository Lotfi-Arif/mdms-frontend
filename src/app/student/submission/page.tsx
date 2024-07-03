import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface FileUpload {
  id: string;
  name: string;
  file: File | null;
}

type SubmissionStage = "proposal" | "progress1" | "progress2" | "final";

export default function SubmissionPage() {
  const [activeTab, setActiveTab] = useState<SubmissionStage>("proposal");
  const [files, setFiles] = useState<Record<SubmissionStage, FileUpload[]>>({
    proposal: [{ id: "proposal", name: "Proposal", file: null }],
    progress1: [
      { id: "demo1", name: "Demo slide", file: null },
      { id: "logbook1", name: "Logbook", file: null },
      { id: "report1", name: "PSM-report", file: null },
    ],
    progress2: [
      { id: "demo2", name: "Demo slide", file: null },
      { id: "logbook2", name: "Logbook", file: null },
      { id: "report2", name: "PSM-report", file: null },
    ],
    final: [
      { id: "presentation", name: "Presentation Slide", file: null },
      { id: "logbookFinal", name: "Logbook", file: null },
      { id: "reportTOC", name: "PSM Report (TOC)", file: null },
      { id: "reportCh1", name: "PSM Report (Chapter 1)", file: null },
      { id: "reportFull", name: "PSM Report (Full)", file: null },
      { id: "shortPaper", name: "Short paper", file: null },
    ],
  });

  const handleFileChange = (
    stage: SubmissionStage,
    id: string,
    file: File | null
  ) => {
    setFiles((prev) => ({
      ...prev,
      [stage]: prev[stage].map((item) =>
        item.id === id ? { ...item, file } : item
      ),
    }));
  };

  const handleDelete = (stage: SubmissionStage, id: string) => {
    handleFileChange(stage, id, null);
  };

  const renderFileUpload = (stage: SubmissionStage, fileUpload: FileUpload) => (
    <Box key={fileUpload.id} sx={{ mb: 2 }}>
      <Typography variant="subtitle1">{fileUpload.name}</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={(e) =>
              handleFileChange(
                stage,
                fileUpload.id,
                e.target.files?.[0] || null
              )
            }
          />
        </Button>
        {fileUpload.file && (
          <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {fileUpload.file.name}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(stage, fileUpload.id)}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Submission Page
      </Typography>
      <Tabs
        value={activeTab}
        onChange={(_, newValue: SubmissionStage) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Proposal" value="proposal" />
        <Tab label="Progress 1" value="progress1" />
        <Tab label="Progress 2" value="progress2" />
        <Tab label="Final Progress" value="final" />
      </Tabs>
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </Typography>
        {files[activeTab].map((file) => renderFileUpload(activeTab, file))}
      </Box>
    </Box>
  );
}
