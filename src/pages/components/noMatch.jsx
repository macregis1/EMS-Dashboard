import {FaExclamationTriangle} from 'react-icons/fa';

const NoMatch = () => {
    return (
        <>
             <section className="text-center" style={{flex: 'flex-col', justify: 'center', marginTop: '25px'}}>
             <FaExclamationTriangle className="fa-x mb-4 text-yellow text-xl" style={{ color: 'yellow', width: '300' }}/>
                <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
                <p className="text-xl mb-5">This page does not exist</p>
            </section>
            {/* -400 fa-4x mb-4 */}
        </>
    )
};
export default NoMatch;