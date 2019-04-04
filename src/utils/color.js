import lodashMemoize from 'lodash/memoize';
import randomcolor from 'randomcolor';

// will be generated randomly on every app launch, but for a real use case we could generate these colors on server and save to a database for persistent look.
export const stringToColor = lodashMemoize(
    (str) => randomcolor()
);