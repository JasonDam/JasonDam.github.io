import InfoCard from './InfoCard'

const InfoCards = ({infoCards}) => {
    const numElements = infoCards.length
    
    return (
        <div>
            <h2>The Website At A Glance</h2>
            {infoCards.map((infoCards) =>(
                <InfoCard key={infoCards.id} numElements={numElements} infoCards={infoCards}/>    
            ))}
            
        </div>
    )
}

export default InfoCards
