import React from 'react';
import classNames from 'classnames';

export const SpinnerSize =  {
    medium: 'md',
    large: 'lg',
    small: 'sm',
    extraSmall: 'xs'
}

/**
 * 
 * @param {String} background: Config spinner color
 * @param {String} size: Loader size 'medium' | 'large' | 'small' | 'extraSmall'
 */
const Spinner = ({ background, size}) => {
    return (
        <div className="spinner">
            <div
                className={classNames('bounce1', size)}
                style={{ backgroundColor: background }}
            />
            <div
                className={classNames('bounce2', size)}
                style={{ backgroundColor: background }}
            />
            <div
                className={classNames('bounce3', size)}
                style={{ backgroundColor: background }}
            />
        </div>
    );
};

Spinner.defaultProps = {
    background: '#fcdf2a',
    size: SpinnerSize.medium
};

export default Spinner;