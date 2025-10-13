'use client';

import type { FC, ChangeEvent } from 'react';
import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddIcon from '@mui/icons-material/Add';

interface CreateRecipientModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateRecipientModal: FC<CreateRecipientModalProps> = ({ open, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setSelectedFile(file);
    } else {
      alert('Please drop a valid CSV file');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (selectedFile) {
      console.log('Saving file:', selectedFile.name);
      // Handle file upload logic here
      onClose();
    }
  };

  const handleDownload = () => {
    // Handle template download
    console.log('Downloading template');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: '#1A1A1A',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box className="flex justify-between items-center mb-4">
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            Create Recipient
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: '#B0B0B0',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0, mb: 3 }}>
          <Stack spacing={3}>
            {/* New Recipient Section */}
            <Box>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  mb: 2,
                }}
              >
                New Recipient
              </Typography>

              {/* Add another Recipient Button */}
              <Button
                startIcon={<AddIcon />}
                sx={{
                  color: '#FFFFFF',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  mb: 3,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                Add another Recipient
              </Button>

              {/* File Upload Area */}
              <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadClick}
                sx={{
                  border: `2px dashed ${isDragging ? '#E91E8C' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '12px',
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: isDragging ? 'rgba(233, 30, 140, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                  '&:hover': {
                    borderColor: '#E91E8C',
                    background: 'rgba(233, 30, 140, 0.05)',
                  },
                }}
              >
                <CloudUploadOutlinedIcon
                  sx={{
                    fontSize: 48,
                    color: '#B0B0B0',
                    mb: 2,
                  }}
                />
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    mb: 1,
                  }}
                >
                  Upload .CSV File
                </Typography>
                <Typography
                  sx={{
                    color: '#808080',
                    fontSize: '0.875rem',
                  }}
                >
                  {selectedFile ? selectedFile.name : 'Upload .CSV File only'}
                </Typography>
              </Box>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </Box>
          </Stack>
        </DialogContent>

        {/* Footer Actions */}
        <DialogActions sx={{ p: 0, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleDownload}
            sx={{
              flex: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              borderRadius: '8px',
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Download
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!selectedFile}
            sx={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              color: '#0A0A0A',
              borderRadius: '8px',
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#F0F0F0',
              },
              '&:disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                color: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateRecipientModal;