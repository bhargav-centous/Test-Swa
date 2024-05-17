export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUGHIJKLMNOPQRSGHIJKLMNOPQRSTUTUGHIJKLMNOPQRSTUGHIJKLMNOPQRSTUGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

export const checkisLocal = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL === 'http://localhost:3033';