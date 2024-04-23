export function formatarFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const opciones = { timeZone: 'America/Mexico_City', hour12: false };
    return fecha.toLocaleString('es-MX', opciones);
}

export function formatarCelular(numero) {
    const codigoArea = numero.substring(0, 3);
    const primeraParte = numero.substring(3, 6);
    const segundaParte = numero.substring(6, 10);
    return `${codigoArea} ${primeraParte}-${segundaParte}`;
}

export function formatearTotal(total) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total);
  }
