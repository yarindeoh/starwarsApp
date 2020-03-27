import React from 'react';
import Spinner from './Spinner';

import { useLoading } from 'services/general/generalHooks';

const Loader = () => {
    const { isLoading } = useLoading();
    return (
        <React.Fragment>
            {isLoading && (
                <div className="loader-container">
                    <Spinner background="#fcdf2a" />
                </div>
            )}
        </React.Fragment>
    );
};

export default Loader;
