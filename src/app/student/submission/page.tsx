"use client";
import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  fetchStudentByEmail,
  addSubmission,
  clearError,
} from "@/store/student/studentSlice";
import { uploadFile } from "@/store/file-upload/fileUploadSlice";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface FileUpload {
  id: string;
  name: string;
  file: File | null;
}

type SubmissionStage = "proposal" | "progress1" | "progress2" | "final";

export default function SubmissionPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
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

  useEffect(() => {
    if (!currentUser) {
      return router.push("/login");
    }
    if (currentUser?.email) {
      dispatch(fetchStudentByEmail(currentUser.email));
    }
    return () => {
      dispatch(clearError());
    };
  }, [currentUser, router, dispatch]);

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

  const handleSubmit = async () => {
    if (!currentUser?.email) {
      alert("User information is missing");
      return;
    }

    for (const fileUpload of files[activeTab]) {
      if (fileUpload.file) {
        const formData = new FormData();
        formData.append("file", fileUpload.file);
        formData.append("title", fileUpload.name);
        formData.append("submissionType", activeTab);
        formData.append("studentEmail", currentUser.email);

        // Log the FormData
        Array.from(formData.entries()).forEach(([key, value]) => {
          console.log(key, value);
        });

        try {
          const response = await dispatch(uploadFile(formData)).unwrap();
          alert(response.message);
        } catch (error) {
          console.error("Error uploading file and creating submission:", error);
          alert("Error uploading file and creating submission");
        }
      }
    }
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
