import React, {useEffect, useState} from 'react';
import {LineChart, Area, Line, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import { Link, useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios'


const Graficas = () => {
    const { anio } = useParams(); // Obtener el parámetro 'anio' de la URL
    const [anioSelect, setAnioSelect] = useState('')
    const [datosVentas, setDatosVentas] = useState([]);
    const navigate = useNavigate();

    console.log(anio)

    useEffect(() => {
        const obtenerVentasAnio = async (anio) => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios(`/ventas/ventas-anio/${anio}`, config);
                setDatosVentas(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (anio) {
            obtenerVentasAnio(anioSelect);
        }
    }, [anio]);

    const transformarDatosVentas = (datosVentas) => {
        const ventasPorMes = {};
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        meses.forEach((mes, index) => {
            const clave = `${index + 1}/${anioSelect}`; // Clave para el mes actual
            ventasPorMes[clave] = 0; // Inicializar las ventas del mes en 0
        });
    
        datosVentas.forEach((venta) => {
            const fecha = venta.fecha.split(',')[0]; // Obtener la fecha sin la hora
            const [dia, mes, anio] = fecha.split('/');
            const clave = `${mes}/${anio}`; // Clave para agrupar por mes y año
            ventasPorMes[clave] += parseFloat(venta.total.replace(',', '')); // Sumar el total de la venta
        });
    
        const data = Object.keys(ventasPorMes).map((clave) => ({
            mes: meses[parseInt(clave.split('/')[0]) - 1], // Obtener el nombre del mes
            ventas: ventasPorMes[clave].toFixed(2),
        }));
    
        return data;
    };

    const handleChange = (e) => {
        const nuevoAnio = e.target.value;
        setAnioSelect(nuevoAnio);
        navigate(`/graficas/${nuevoAnio}`);
    };

    /*const data = [
        { mes: "Enero", ventas: 70000.00 },
        { mes: "Febrero", ventas: 28000.00 },
        { mes: "Marzo", ventas: 32000.00 },
        { mes: "Abril", ventas: 27000.00 },
        { mes: "Mayo", ventas: 30000.00 },
        { mes: "Junio", ventas: 35000.00 },
        { mes: "Julio", ventas: 38000.00 },
        { mes: "Agosto", ventas: 40000.00 },
        { mes: "Septiembre", ventas: 33000.00 },
        { mes: "Octubre", ventas: 36000.00 },
        { mes: "Noviembre", ventas: 39000.00 },
        { mes: "Diciembre", ventas: 42000.00 }
    ];*/

  return (
    <>
        <h1 className='dashboard__heading m-l'>Graficas</h1>
        <div className='graficas'>
            <div className='graficas__buscadores'>
                <div className='graficas__campo'>
                    <label htmlFor="ano" className='graficas__label'>Selecciona un año</label>
                    <select onChange={handleChange} value={anio} className='graficas__select'>
                        <option className='graficas__option'>-- Seleccionar --</option>
                        <option value={2024} className='graficas__option'>2024</option>
                        <option value={2023} className='graficas__option'>2023</option>
                        <option value={2022} className='graficas__option'>2022</option>
                    </select>
                </div>
            </div>
                <BarChart
                    width={1200}
                    height={550}
                    data={transformarDatosVentas(datosVentas)}
                    margin={{ top:5, right:30, left:20, bottom:5 }}
                >
                <CartesianGrid strokeDasharray="4 1 2"/>
                <XAxis dataKey="mes" />
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="ventas" fill="#8884d8"/>
                </BarChart>
        </div>

        <div className='graficas'>
            <LineChart
                width={1200}
                height={550}
                data={transformarDatosVentas(datosVentas)}
                margin={{ top:5, right:30, left:20, bottom:5 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ventas" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>

    </>
  )
}

export default Graficas