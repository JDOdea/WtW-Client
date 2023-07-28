export const AttractionSearch = ({ setterFunction}) => {
    return (
        <div className="attraction-search">
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