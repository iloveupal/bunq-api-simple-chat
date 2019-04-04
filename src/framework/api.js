import axios from 'axios';
import { assertPropTypes } from 'check-prop-types';
import qs from 'qs';

import config from 'Config/ApiConfig';

const { baseUrl } = config;

/**
 * @param {Object} serviceProvider A custom axios-like object that can be used in tests.
 * @returns {Function} The api service itself.
 * @throws
 */
export const createApiService = (serviceProvider) => (apiRequest, params = {}) => {
    if ( !apiRequest ) {
        throw new Error('apiService: apiRequest should be defined');
    }

    const finalProps = { ...apiRequest.defaultProps, ...params };

    if ( apiRequest.propTypes ) {
        assertPropTypes(apiRequest.propTypes, params, 'param', apiRequest.name || 'Api call');
    }

    const uri = apiRequest.uri(finalProps);
    const { method } = apiRequest;

    const query = apiRequest.query && apiRequest.query(finalProps) || undefined;
    const body = apiRequest.body && apiRequest.body(finalProps) || undefined;

    return serviceProvider({
        method,
        url: uri,
        data: body,
        params: query
    });
};

/**
 * An http service for the app.
 */
export const HttpApi = createApiService(axios.create({
    baseURL: baseUrl,
    paramsSerializer: (params) => qs.stringify(params),
}));