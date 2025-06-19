import React from 'react';
import LoaderImg2 from '../../assets/Loader.svg'
const LoaderLg: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
            <img src={LoaderImg2} alt="Loader" className='animate-spin h-20 w-20 text-red-500'/>
        </div>
    );
    
};

export default LoaderLg;


//! --uses for other components
// const { setLoading } = useGlobalLoading();
// setLoading(true);
