import React, { createContext, useContext, useState } from 'react';
import LoaderLg from '../components/loader/loader';

const LoaderLgContext = createContext<{ loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>> } | undefined>(undefined);



export const useGlobalLoading = () => {
    const context = useContext(LoaderLgContext);
    if (!context) {
        throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider');
    }
    return context;
};

type Props = {
    children:React.ReactNode
}

export const LoaderLgProvider: React.FC<Props> = ({children}: Props) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderLgContext.Provider value={{ loading, setLoading }}>
            {children}
            {loading && <LoaderLg />}
        </LoaderLgContext.Provider>
    );
};
