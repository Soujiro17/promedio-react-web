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
    { id: 'rango', label: 'l/m²', maxWidth: 20 },
    { id: 'marcaClase', label: 'Marca de clase (cᵢ)', maxWidth: 20 },
    { id: 'frecuenciaAbsoluta', label: 'Frecuencia absoluta (nᵢ)', maxWidth: 20 },
    { id: 'frecuenciaAbsolutaAcumulada', label: 'Frecuencia absoluta acumulada (Nᵢ)', maxWidth: 20 },
    { id: 'frecuenciaRelativa', label: 'Frecuencia relativa (fᵢ = nᵢ / N)', maxWidth: 20 },
    { id: 'frecuenciaRelativaAcumulada', label: 'Frecuencia relativa acumulada (fᵢ = nᵢ / N)', maxWidth: 20 },
    { id: 'frecuenciaRelativaPercentage', label: 'Frecuencia relativa (fᵢ = nᵢ / N) en %', maxWidth: 20 },
    { id: 'frecuenciaRelativaAcumuladaPercentage', label: 'Frecuencia relativa acumulada (Fᵢ = Nᵢ / N) en %', maxWidth: 20 },
];

function createData(rango, marcaClase, frecuenciaAbsoluta, frecuenciaAbsolutaAcumulada, frecuenciaRelativa, frecuenciaRelativaAcumulada, frecuenciaRelativaPercentage, frecuenciaRelativaAcumuladaPercentage) {
    return { rango, marcaClase, frecuenciaAbsoluta, frecuenciaAbsolutaAcumulada, frecuenciaRelativa, frecuenciaRelativaAcumulada, frecuenciaRelativaPercentage, frecuenciaRelativaAcumuladaPercentage };
}

const calcularFrecuenciaA = (data, inicial, final) =>{
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
        count[property] = frecuencia[property] / frecuencia["Total"]
    }
    return count;
}

const crearFilas = (frecuenciaA, frecuenciaB, amplitudClase, rangoFinal) =>{
    let countFrecuenciaA = 0, countFrecuenciaB = 0, marcaClase = 0, resto = 0;
    let array = [];
    for (let property in frecuenciaA) {
        marcaClase = buscarMedio(resto, resto + amplitudClase);
        if(property !== "Total"){
            countFrecuenciaA += frecuenciaA[property];
            countFrecuenciaB += frecuenciaB[property];
        }
        if(resto === rangoFinal){
            break
        }
        array.push(createData(`[${resto},${resto + 4})`, marcaClase, frecuenciaA[property], countFrecuenciaA, Math.round(frecuenciaB[property] * 100) / 100, Math.round(countFrecuenciaB * 100) / 100, parseInt(frecuenciaB[property] * 100) + "%", parseInt(countFrecuenciaB * 100) + "%"))
        resto+=amplitudClase;

    }
    return array;
}

const buscarMedio = (marca, amplitud) =>{
    return (marca + amplitud)/2;
}

const useStyles = makeStyles({

    root: {
        overflowX: "auto",
        padding: "10px",
    },
});

export default function TablaOrdenada(props) { 
    const arraySorted = props.data.split(",").sort(function(a, b) {
        return a - b;
    });
    const rango = arraySorted[arraySorted.length-1] - arraySorted[0];
    const numeroClases = Math.round(1 + 3.322 * Math.log10(arraySorted.length));
    const amplitudClase = Math.ceil(rango/numeroClases);
    const rangoFinal = amplitudClase * numeroClases;
    
    const frecuenciaA = calcularFrecuenciaA(arraySorted);
    const frecuenciaR = calcularFrecuenciaR(frecuenciaA);
    const rows = crearFilas(frecuenciaA, frecuenciaR, amplitudClase, rangoFinal);

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
