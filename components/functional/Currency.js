const Currency = ({amount}) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    return <>{formatter.format(amount)}</>
} 

export default Currency