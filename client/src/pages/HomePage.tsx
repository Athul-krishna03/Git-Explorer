import React , {useEffect}from 'react'

const HomePage = () => {
    const [inputValue, setInputValue] = React.useState('')

    useEffect(() => {
        
    }, [inputValue])
    return (
        <>
        <h1>Welcome to the Home Page</h1>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={() => console.log('Submitted value:', inputValue)}>Submit</button>
        </>
    )
}

export default HomePage