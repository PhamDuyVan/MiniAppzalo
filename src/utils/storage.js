export const STORAGE_KEY = 'mini_zalo_db_v1';

export function initialDB() {
    const now = Date.now();
    return {
        users: [
            { id: 'u1', name: 'Minh Pham', email: 'minh@gmail.com', bio: 'Coder + coffee', status: 'online', avatarColor: 'bg-blue-400' },
            { id: 'u2', name: 'Lan Nguyen', email: 'lan@gmail.com', bio: 'Designer', status: 'away', avatarColor: 'bg-pink-400' }
        ],
        friendships: { 'u1': ['u2'], 'u2': ['u1'] },
        conversations: [{ id: 'c1', participants: ['u1', 'u2'], name: null, messages: [{ id: 'm1', from: 'u2', text: 'Chào Minh!', time: now - 1000 * 60 * 60, seenBy: ['u2'] }] }]
    };
}
export function loadDB() { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) { const db = initialDB(); localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); return db; } try { return JSON.parse(raw); } catch (e) { const db = initialDB(); localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); return db; } }
export function saveDB(db) { localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); }