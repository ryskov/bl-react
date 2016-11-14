import React from 'react';
import './../styles/Style.css';

const ComponentGroup = ({children, direction = 'vertical', width, height, noMargin, noShadow}) => {
    let newChildren = React.Children.map(children, (c, i) => {
        let _style = {
            margin: '0px',
            boxShadow: 'none',
        };
        
        console.log('# Direction', direction, c);

        if (i === 0) {
            // first element
            _style.borderBottomRightRadius = '0px';

            if (direction === 'vertical') {
                _style.borderBottom = 'none';
                _style.borderBottomLeftRadius = '0px';
            }
            else if (direction === 'horizontal') {
                _style.borderRight = 'none';
                _style.borderTopRightRadius = '0px';
            }
        }
        else if (i === React.Children.count(children) - 1) {
            // last element
            _style.borderTopLeftRadius = '0px';

            if (direction === 'vertical') {
                _style.borderTop = 'none';
                _style.borderTopRightRadius = '0px';
            }
            else if (direction === 'horizontal') {
                _style.borderLeft = 'none';
                _style.borderBottomLeftRadius = '0px';
            }
        }
        else {
            // in between
            _style.borderRadius = '0px';    
        }
        
        

        return React.cloneElement(c, { style: _style, width, height });
    });

    return (
        <div className="bl-outer-element">
            {newChildren}
        </div>
    );
};

export default ComponentGroup;