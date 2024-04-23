const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'alerta alerta-error' : 'alerta alerta-exito'}`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta;