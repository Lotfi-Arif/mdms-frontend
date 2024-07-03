import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Grid,
  Divider,
  Paper,
  Checkbox,
} from '@mui/material';

const EvaluationPage = () => {
  const [evaluationData, setEvaluationData] = useState({
    date: '',
    time: '',
    venue: '',
    studentName: '',
    programme: '',
    researchTitle: '',
    examiner1: '',
    examiner2: '',
    chairperson: '',
    result: '',
    representationNextSemester: false,
    rejectionReason: '',
    comments: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvaluationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvaluationData(prevData => ({
      ...prevData,
      representationNextSemester: e.target.checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Evaluation submitted:', evaluationData);
    // Here you would typically send the data to your backend
  };

  return (
    <Box component={Paper} elevation={3} p={4} m={2}>
      <Typography variant="h4" gutterBottom>
        EVALUATION REPORT ON MIXED MODE PROPOSAL FOR MASTERS/DOCTOR OF PHILOSOPHY
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              value={evaluationData.date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Time"
              name="time"
              value={evaluationData.time}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Venue"
              name="venue"
              value={evaluationData.venue}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name of Student"
              name="studentName"
              value={evaluationData.studentName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Programme"
              name="programme"
              value={evaluationData.programme}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Research Title"
              name="researchTitle"
              value={evaluationData.researchTitle}
              onChange={handleInputChange}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Examiner 1"
              name="examiner1"
              value={evaluationData.examiner1}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Examiner 2"
              name="examiner2"
              value={evaluationData.examiner2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Chairperson/Supervisor"
              name="chairperson"
              value={evaluationData.chairperson}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            The examiners** have decided a result as stated below:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="evaluation-result"
                  name="result"
                  value={evaluationData.result}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="A"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">A. Research proposal is accepted</Typography>
                        <Typography variant="body2">• Does not require any correction to the proposal report;</Typography>
                        <Typography variant="body2">• Requires minor text editing, formatting of tables and/or figures, correction of grammar, spelling or typos.</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="B1"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">B1. Research proposal is accepted with minor amendments</Typography>
                        <Typography variant="body2">• Requires minor text editing, formatting of tables and/or figures, correction of grammar, spelling or typos;</Typography>
                        <Typography variant="body2">• Improvement in declaration of research objectives and problem statement;</Typography>
                        <Typography variant="body2">• Requires a little addition or explanations pertaining to several short sections in the text;</Typography>
                        <Typography variant="body2">• Submission of correction form and corrected pages only must be on the second (2nd) week after presentation.</Typography>
                        <Typography variant="body2">• The semester result will be TM (Unsatisfactory) if the corrected documents are not submitted by the deadline.</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="B2"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">B2. Research proposal is accepted with major amendments</Typography>
                        <Typography variant="body2">• Requires major text editing, formatting of tables and/or figures, correction of grammar, spelling or typos;</Typography>
                        <Typography variant="body2">• Requires major revision on the proposal report writing and content;</Typography>
                        <Typography variant="body2">• Revision of literature;</Typography>
                        <Typography variant="body2">• Major improvement in the description of methodology;</Typography>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body2">• Representation in the following semester:</Typography>
                          <Checkbox
                            checked={evaluationData.representationNextSemester}
                            onChange={handleCheckboxChange}
                            name="representationNextSemester"
                          />
                          <Typography variant="body2">Yes</Typography>
                          <Checkbox
                            checked={!evaluationData.representationNextSemester}
                            onChange={(e) => handleCheckboxChange({ target: { checked: !e.target.checked } } as React.ChangeEvent<HTMLInputElement>)}
                            name="representationNextSemester"
                          />
                          <Typography variant="body2">No</Typography>
                        </Box>
                        <Typography variant="body2">• Note: Submission of two (2) reports to the office for representation.</Typography>
                        <Typography variant="body2">• Submission of correction form and report(s) must be on the sixth (6th) week after presentation.</Typography>
                        <Typography variant="body2">• The semester result will be TM (Unsatisfactory) if the corrected report and correction form is not submitted by the deadline.</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="C"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">C. Research proposal is rejected</Typography>
                        <Typography variant="body2">• Has substantial weakness that resulted the proposal report to be below acceptable standards which cannot be addressed even with additional work or corrections;</Typography>
                        <Typography variant="body2">• Inadequate problem formulation, literature review and/or research methodology;</Typography>
                        <Typography variant="body2">• Has plagiarized work or text;</Typography>
                        <Typography variant="body2">• Resubmit new proposal and re-present in the following semester.</Typography>
                        <Typography variant="body2">• The semester result will be TM (Unsatisfactory).</Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
                <Radio checked={evaluationData.result === 'A'} />
                <Radio checked={evaluationData.result === 'B1'} />
                <Radio checked={evaluationData.result === 'B2'} />
                <Radio checked={evaluationData.result === 'C'} />
              </Box>
            </Grid>
          </Grid>
          {evaluationData.result === 'C' && (
            <TextField
              fullWidth
              label="Please state reason(s) of rejection:"
              name="rejectionReason"
              value={evaluationData.rejectionReason}
              onChange={handleInputChange}
              multiline
              rows={4}
              margin="normal"
            />
          )}
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            **Please ✓ the appropriate box for the result
          </Typography>
        </Paper>

        <TextField
          fullWidth
          label="Comments of the First Assessment Session"
          name="comments"
          value={evaluationData.comments}
          onChange={handleInputChange}
          multiline
          rows={6}
          margin="normal"
        />

        <Box mt={4}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit Evaluation
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EvaluationPage;