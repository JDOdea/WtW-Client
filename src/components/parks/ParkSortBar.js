import Breadcrumb from 'react-bootstrap/Breadcrumb';

export const ParkSortBar = () => {

    return (
        <div className="parks-bar">
            <Breadcrumb>
                <Breadcrumb.Item href='#'>Home</Breadcrumb.Item>
                <Breadcrumb.Item href='#'>Resorts</Breadcrumb.Item>
                <Breadcrumb.Item active>Parks</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}