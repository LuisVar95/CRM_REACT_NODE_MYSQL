const meses = [
    { id: 1, mes: "Enero" },
    { id: 2, mes: "Febrero" },
    { id: 3, mes: "Marzo" },
    { id: 4, mes: "Abril" },
    { id: 5, mes: "Mayo" },
    { id: 6, mes: "Junio" },
    { id: 7, mes: "Julio" },
    { id: 8, mes: "Agosto" },
    { id: 9, mes: "Septiembre" },
    { id: 10, mes: "Octubre" },
    { id: 11, mes: "Noviembre" },
    { id: 12, mes: "Diciembre" }
];

const dias = [
    { id: 1, dia: 1 }, { id: 2, dia: 2 }, { id: 3, dia: 3 }, { id: 4, dia: 4 }, { id: 5, dia: 5 },
    { id: 6, dia: 6 }, { id: 7, dia: 7 }, { id: 8, dia: 8 }, { id: 9, dia: 9 }, { id: 10, dia: 10 },
    { id: 11, dia: 11 }, { id: 12, dia: 12 }, { id: 13, dia: 13 }, { id: 14, dia: 14 }, { id: 15, dia: 15 },
    { id: 16, dia: 16 }, { id: 17, dia: 17 }, { id: 18, dia: 18 }, { id: 19, dia: 19 }, { id: 20, dia: 20 },
    { id: 21, dia: 21 }, { id: 22, dia: 22 }, { id: 23, dia: 23 }, { id: 24, dia: 24 }, { id: 25, dia: 25 },
    { id: 26, dia: 26 }, { id: 27, dia: 27 }, { id: 28, dia: 28 }, { id: 29, dia: 29 }, { id: 30, dia: 30 },
    { id: 31, dia: 32 }
];

const ultimos10Anos = [
    { id: 1, ano: new Date().getFullYear() },
    { id: 2, ano: new Date().getFullYear() - 1 },
    { id: 3, ano: new Date().getFullYear() - 2 },
    { id: 4, ano: new Date().getFullYear() - 3 },
    { id: 5, ano: new Date().getFullYear() - 4 },
    { id: 6, ano: new Date().getFullYear() - 5 },
    { id: 7, ano: new Date().getFullYear() - 6 },
    { id: 8, ano: new Date().getFullYear() - 7 },
    { id: 9, ano: new Date().getFullYear() - 8 },
    { id: 10, ano: new Date().getFullYear() - 9 }
];

export{
    meses,
    dias,
    ultimos10Anos
} 