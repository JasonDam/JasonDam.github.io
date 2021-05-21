import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {
    //temp
    const onClick = () => {
        console.log("click");
    }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color='lightgreen' text='add' onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Missign Title',
}

Header.prototype = {
    //dont need isRequired with default
    title: PropTypes.string.isRequired,
}

export default Header
