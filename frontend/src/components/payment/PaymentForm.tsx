import type { FC } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { EmployeeGroup, PaymentSchedule } from '../../types/payment';
import type { PaymentFormProps } from '../../types/payment';

const PaymentForm: FC<PaymentFormProps> = ({
  selectedGroup,
  selectedCurrency,
  totalAmount,
  selectedSchedule,
  onGroupChange,
  onCurrencyChange,
  onScheduleChange,
}) => {
  return (
    <Box
      sx={{
        background: 'rgba(26, 26, 26, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        p: 4,
      }}
    >
      <Stack spacing={4}>
        {/* Employee Group Selection */}
        <Box>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '1rem',
              mb: 3,
              fontWeight: 500,
            }}
          >
            Select Groups for Payment
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              value={selectedGroup}
              onChange={(e) => onGroupChange(e.target.value as EmployeeGroup)}
            >
              <Stack direction="row" spacing={4}>
                <FormControlLabel
                  value={EmployeeGroup.ALL_EMPLOYEES}
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(255, 255, 255, 0.3)',
                        '&.Mui-checked': {
                          color: '#00FF00',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: '#B0B0B0', fontSize: '0.95rem' }}>
                      All Employees
                    </Typography>
                  }
                />
                <FormControlLabel
                  value={EmployeeGroup.ACTIVE}
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(255, 255, 255, 0.3)',
                        '&.Mui-checked': {
                          color: '#00FF00',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: '#B0B0B0', fontSize: '0.95rem' }}>
                      Active
                    </Typography>
                  }
                />
                <FormControlLabel
                  value={EmployeeGroup.ON_LEAVE}
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(255, 255, 255, 0.3)',
                        '&.Mui-checked': {
                          color: '#00FF00',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: '#B0B0B0', fontSize: '0.95rem' }}>
                      On Leave
                    </Typography>
                  }
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Currency and Amount Section */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          {/* Currency Dropdown */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: '#B0B0B0',
                fontSize: '0.875rem',
                mb: 1.5,
              }}
            >
              Currency
            </Typography>
            <Select
              value={selectedCurrency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              fullWidth
              sx={{
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#FFFFFF',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E91E8C',
                },
              }}
            >
              <MenuItem value="STRK">
                <Box className="flex items-center gap-2">
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #9B59B6 0%, #E91E8C 100%)',
                    }}
                  />
                  <Typography>STRK</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="ETH">
                <Box className="flex items-center gap-2">
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4A90E2 0%, #627EEA 100%)',
                    }}
                  />
                  <Typography>ETH</Typography>
                </Box>
              </MenuItem>
            </Select>
          </Box>

          {/* Total Amount Display */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: '#B0B0B0',
                fontSize: '0.875rem',
                mb: 1.5,
              }}
            >
              Total amount to be disbursed
            </Typography>
            <Box
              sx={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                  background: 'rgba(255, 215, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AttachMoneyOutlinedIcon sx={{ fontSize: 20, color: '#FFD700' }} />
              </Box>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                }}
              >
                {totalAmount.toFixed(1)} {selectedCurrency}
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* Payment Schedule Dropdown */}
        <Box>
          <Typography
            sx={{
              color: '#B0B0B0',
              fontSize: '0.875rem',
              mb: 1.5,
            }}
          >
            Payment Schedule
          </Typography>
          <Select
            value={selectedSchedule || ''}
            onChange={(e) => onScheduleChange(e.target.value as PaymentSchedule)}
            displayEmpty
            fullWidth
            sx={{
              background: 'rgba(0, 0, 0, 0.3)',
              color: selectedSchedule ? '#FFFFFF' : '#808080',
              borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E91E8C',
              },
            }}
          >
            <MenuItem value="" disabled>
              <Typography sx={{ color: '#808080' }}>Select Monthly / Yearly</Typography>
            </MenuItem>
            <MenuItem value={PaymentSchedule.MONTHLY}>Monthly</MenuItem>
            <MenuItem value={PaymentSchedule.YEARLY}>Yearly</MenuItem>
          </Select>
        </Box>
      </Stack>
    </Box>
  );
};

export default PaymentForm;