export async function load({ locals }) {
    // Authentication and redirects are handled in hooks.server.js
    return {
        session: locals.session
    };
}