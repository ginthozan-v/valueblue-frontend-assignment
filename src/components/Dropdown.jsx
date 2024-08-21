const Dropdown = ({ optionList, handleChange }) => {
    return (
        <select onChange={(e) => handleChange(e.target.value)} className="dropdown">
            {optionList?.map(option => (
                <option key={option.key} value={option.key}>{option.text}</option>
            ))}
        </select>
    )
}

export default Dropdown