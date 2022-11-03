const Amount = ({value}) => {
    const numberValue = parseInt(value);

    if (Number.isNaN(numberValue)) {
        return <>{numberValue}</>
    }
    return <>{numberValue.toLocaleString(undefined, {minimumFractionDigits: 3})}</>
}

export default Amount