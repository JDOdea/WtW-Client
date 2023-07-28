export const ResortSearch = ({ setterFunction }) => {
    return (
        <div className="resort-search">
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" placeholder="Enter search terms"
            />
        </div>
    )
}