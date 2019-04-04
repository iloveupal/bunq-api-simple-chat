import React from 'react';

/**
 * It's a simple router, just for the means of this test assignment.
 *
 */

export const renderCurrentRoute = (availableRoutes, currentRoute) => {
    const route = availableRoutes[currentRoute.name];

    if ( route ) {
        return (
            <route.Component
                {...currentRoute.params}
            />
        );
    }
    else {
        const defaultRoute = availableRoutes.default;

        return (
            <defaultRoute.Component
                {...currentRoute.params}
            />
        );
    }
};