import { Box, Chip, Typography } from '@mui/material';

export default function FilterBar({ currentFilter, onFilterChange }) {
  const filters = ['Event', 'Result', 'Placement'];

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body1">Filter Priority:</Typography>
      <Chip 
        label="All" 
        onClick={() => onFilterChange('')} 
        color={currentFilter === '' ? 'primary' : 'default'}
      />
      {filters.map((filter) => (
        <Chip 
          key={filter} 
          label={filter} 
          onClick={() => onFilterChange(filter)} 
          color={currentFilter === filter ? 'primary' : 'default'}
        />
      ))}
    </Box>
  );
}
