import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';

function Response({ workflows }, props) {
  let navigate = useNavigate();
  
  console.log("workflows=====>",workflows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <h2>Workflows </h2>
        <div>
          <Button hidden variant="contained" onClick={() => navigate("/")}>
            Edit Workflow
          </Button>
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell>W Id</TableCell>
            <TableCell align="right">Workflow Name</TableCell>
            <TableCell align="right">No. APIs</TableCell>
            <TableCell align="right">Last Exec Status</TableCell>
            <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.apiDetails?.length}</TableCell>
                    <TableCell align="right">success</TableCell>
                    <TableCell align="right">
                    <Tooltip title="Edit">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => navigate("/") }
                      color="success"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon
                        fontSize="inherit"
                        onClick={() => alert("are you sure you want to delete ?")}
                        color="error"
                      />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Re-Execute workflow">
                    <IconButton aria-label="delete" size="small">
                      <RestartAltIcon  
                        fontSize="inherit"
                        onClick={() => alert("re-execute workflow")}
                        color="primary"/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="view last execution results">
                    <IconButton aria-label="delete" size="small">
                      <VisibilityIcon  
                        fontSize="inherit"
                        onClick={() => alert("show last execution results")}
                        />
                    </IconButton>
                    </Tooltip>
                    </TableCell>    
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={workflows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
      {/* <table className="table border">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Api Name</th>
            <th scope="col">Response</th>
          </tr>
        </thead>
        <tbody>
          {apiResp &&
            apiResp.length > 0 &&
            apiList &&
            apiList.length > 0 &&
            apiResp.map((resp, ind) => {
              return (
                <tr key={`${Math.random(ind)}`}>
                  <th scope="row">{ind + 1}</th>
                  <td>{apiList[ind].apiName}</td>
                  <td>
                    <textarea rows="4" cols="50">
                      {JSON.stringify(resp)}
                    </textarea>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table> */}
    </div>
  );
}

export default Response;
