import construction from '../resources/construction.png'

function ComingSoon() {
    return (
        <div className="container d-flex flex-column vh-100 justify-content-center">
            <div className="align-self-center text-center fs-1">
                Advanced User Features Coming Soon!
            </div>
            <div className="align-self-center text-center fs-1">
                <img style={{height: "50%"}} src={construction} />
            </div>
        </div>
    );
}

export default ComingSoon;