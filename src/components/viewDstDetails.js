import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function CustomizedTables({selectedDst}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Legal Name</StyledTableCell>
            <StyledTableCell align="right">Sponsor Name</StyledTableCell>
            <StyledTableCell align="right">Number of Properties</StyledTableCell>
            <StyledTableCell align="right">Number of Units</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[selectedDst].map((row,key) => (
            <StyledTableRow key={"dstDetails"+key}>
              <StyledTableCell component="th" scope="row">
                {row.legalName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.sponsorName}</StyledTableCell>
              <StyledTableCell align="right">{row.numberOfProperties}</StyledTableCell>
              <StyledTableCell align="right">{row.numberOfUnits}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
