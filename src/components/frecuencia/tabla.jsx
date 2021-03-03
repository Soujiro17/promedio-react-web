import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'Xi', label: 'Xᵢ', maxWidth: 20 },
    { id: 'frecuenciaAbsoluta', label: 'Frecuencia absoluta (nᵢ)', maxWidth: 20 },
    { id: 'frecuenciaAbsolutaAcumulada', label: 'Frecuencia absoluta acumulada (Nᵢ)', maxWidth: 20 },
    { id: 'frecuenciaRelativa', label: 'Frecuencia relativa (fᵢ = nᵢ / N)', maxWidth: 20 },
    { id: 'frecuenciaRelativaAcumulada', label: 'Frecuencia relativa acumulada (fᵢ = nᵢ / N)', maxWidth: 20 },
    { id: 'frecuenciaRelativaPercentage', label: 'Frecuencia relativa (fᵢ = nᵢ / N) en %', maxWidth: 20 },
    { id: 'frecuenciaRelativaAcumuladaPercentage', label: 'Frecuencia relativa acumulada (Fᵢ = Nᵢ / N) en %', maxWidth: 20 },
];

function createData(Xi, frecuenciaAbsoluta, frecuenciaAbsolutaAcumulada, frecuenciaRelativa, frecuenciaRelativaAcumulada, frecuenciaRelativaPercentage, frecuenciaRelativaAcumuladaPercentage) {
    return { Xi, frecuenciaAbsoluta, frecuenciaAbsolutaAcumulada, frecuenciaRelativa, frecuenciaRelativaAcumulada, frecuenciaRelativaPercentage, frecuenciaRelativaAcumuladaPercentage };
}

const calcularFrecuenciaA = (data) =>{
    let count = {};
    data.forEach(number => {
        count[number] = (count[number] || 0) + 1;
        count["Total"] = (count["Total"] || 0) + 1;
    });
    return count;
}

const calcularFrecuenciaR = (frecuencia) =>{
    let count = {};
    for (let property in frecuencia) {
        count[property] = Math.round(frecuencia[property] / frecuencia["Total"] * 100) / 100
    }
    return count;
}

const crearFilas = (frecuenciaA, frecuenciaB) =>{
    let countFrecuenciaA = 0, countFrecuenciaB = 0;
    let array = [];
    for (let property in frecuenciaA) {
        if(property !== "Total"){
            countFrecuenciaA += frecuenciaA[property];
            countFrecuenciaB += frecuenciaB[property];
        }
        array.push(createData(property, frecuenciaA[property], countFrecuenciaA, frecuenciaB[property], countFrecuenciaB, parseInt(frecuenciaB[property] * 100) + "%", parseInt(countFrecuenciaB * 100) + "%"))
    }
    return array;
}

const useStyles = makeStyles({

    root: {
        overflowX: "auto",
        padding: "10px",
    },
});

export default function StickyHeadTable(props) { 
    const frecuenciaA = calcularFrecuenciaA(props.data.split(","));
    const frecuenciaR = calcularFrecuenciaR(frecuenciaA);
    const rows = crearFilas(frecuenciaA, frecuenciaR);

    const classes = useStyles();
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
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                        );
                    })}
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
    );
}
