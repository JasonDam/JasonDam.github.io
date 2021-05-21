const InfoCard = ({ numElements, infoCards }) => {
    return (
        <div style={{
            width: `${90 / numElements}%`,
            margin: `${5 / numElements}%`,
            backgroundColor: `rgba(${95}, ${156}, ${236}, ${0.521})`,
            float: 'left',
            textAlign: 'center',
            minHeight: '200px',
            // borderRadius: '10px',
            padding: '20px',
        }}>
            <h2 style={{padding:'15%'}}>{infoCards.title}</h2>
        </div >
    )
}

export default InfoCard
