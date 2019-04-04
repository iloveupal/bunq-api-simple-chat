export default function makeAction (type, payload = null, meta = null) {
    return {
        type,
        payload,
        meta,
    };
}

export const makeActionCreator = (type) => (payload, meta) => makeAction(type, payload, meta);