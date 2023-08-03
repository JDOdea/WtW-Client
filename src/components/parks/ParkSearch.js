export const ParkSearch = ({ setterFunction }) => {
    return (
        <div className="park-search">
            <input 
            className="park-search"
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