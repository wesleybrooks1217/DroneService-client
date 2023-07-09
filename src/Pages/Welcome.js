import LogInModal from "../Components/LogInModal";
import './Welcome.css';

const Welcome = () => {
    return (
        <div class='titleContainer'>
            <h1 className='title'>
                Restaurant Supply Express
            </h1>
            <h2 className='description'>
                Procedures and Views
            </h2>
            <div className='loginButton'>
                <LogInModal />
            </div>
        </div>
    );
}


export default Welcome