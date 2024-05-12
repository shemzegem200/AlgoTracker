import {Outlet, Link} from 'react-router-dom';

export default function Layout(){
    return (
            <div className='layout'>
                <div className='outer-container'>

                    <div className="nav-bar">
                        <Link to="/" className="logo">Algo-Tracker</Link>
                    </div>
                    
                    <Outlet/>
                </div>
                
            </div>
    );
}