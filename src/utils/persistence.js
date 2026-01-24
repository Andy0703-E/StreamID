/**
 * Request persistent storage from the browser.
 * This helps prevent the browser from automatically clearing data (like cookies/localstorage)
 * during background cleanup processes.
 */
export async function requestPersistence() {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
        try {
            const isPersisted = await navigator.storage.persist();
            console.log(`[Persistence] Storage persist status: ${isPersisted ? 'Persistent' : 'Best-effort'}`);
            return isPersisted;
        } catch (error) {
            console.error('[Persistence] Error requesting persistence:', error);
            return false;
        }
    }
    return false;
}

export async function checkPersistence() {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persisted) {
        return await navigator.storage.persisted();
    }
    return false;
}
