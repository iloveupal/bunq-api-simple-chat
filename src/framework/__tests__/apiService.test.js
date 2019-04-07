import PropTypes from 'prop-types';

import { createApiService } from '../api';


describe('Api.createApiService', () => {
    it('should pass correct params to service provider', () => {
        const testProvider = jest.fn();

        const testService = createApiService(testProvider);

        const testRequest = {
            method: 'put',
            propTypes: {
                id: PropTypes.string.isRequired,
                userId: PropTypes.string.isRequired,
                conversationId: PropTypes.string.isRequired,
            },
            query: ({ userId }) => ({ userId }),
            body: ({ id }) => ({ id }),
            uri: ({ conversationId }) => `/conversation/${conversationId}`,
        };

        const testProps = {
            id: '1',
            userId: '2',
            conversationId: '3',
        };

        const expectedResult = {
            method: 'put',
            url: '/conversation/3',
            data: {
                id: '1',
            },
            params: {
                userId: '2',
            },
            context: {
                apiRequest: testRequest,
                params: testProps,
            },
        };

        testService(testRequest, testProps);

        expect(testProvider).toHaveBeenCalledWith(expectedResult);
    });

    it('should throw when props are not fitting', () => {
        const testProvider = jest.fn();

        const testService = createApiService(testProvider);

        const testRequest = {
            method: 'put',
            propTypes: {
                id: PropTypes.string.isRequired,
                userId: PropTypes.string.isRequired,
                conversationId: PropTypes.string.isRequired,
            },
            query: ({ userId }) => ({ userId }),
            body: ({ id }) => ({ id }),
            uri: ({ conversationId }) => `/conversation/${conversationId}`,
        };

        const testProps = {
            id: '1',
            userId: '2',
        };

        const expectedResult = {
            method: 'put',
            url: '/conversation/3',
            data: {
                id: '1',
            },
            params: {
                userId: '2',
            },
            context: {
                apiRequest: testRequest,
                params: testProps,
            },
        };

        expect(() => {
            testService(testRequest, testProps);
        }).toThrow();
    });
});