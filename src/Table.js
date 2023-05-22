import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ data }) {
  return (
    <TableContainer component={Paper} marginTop={2}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "600" }} align='left'>
              Array 1
            </TableCell>
            <TableCell sx={{ fontWeight: "600" }} align='left'>
              Array 2
            </TableCell>
            <TableCell sx={{ fontWeight: "600" }} align='left'>
              Min Difference
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align='left'>{JSON.stringify(row.array1)}</TableCell>
              <TableCell align='left'>{JSON.stringify(row.array2)}</TableCell>
              <TableCell align='left'>{row.difference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
