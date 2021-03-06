import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <div style={{display: 'flex'}}>
            <span>
                {props.isAuthenticated ? <NavigationItem link='/landing' ><i className="material-icons">person</i></NavigationItem> : null}
            </span>
            <span style={{ marginLeft: 'auto' }}>
                {props.isAuthenticated ? <NavigationItem link='/logout'>Sign Out</NavigationItem> : <NavigationItem link='/' ><span onClick={props.onSignUpWindow}>Sign In</span> </NavigationItem>}
                {props.isAuthenticated ? <NavigationItem link='/landing'>Home</NavigationItem> : null}
            </span>
        </div>
    </ul>
);

export default navigationItems;