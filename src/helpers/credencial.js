class Credential {
    static instance = null;

    constructor() {
        if (Credential.instance) {
            return Credential.instance;
        }

        Credential.instance = this;
    }

    static isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    static isValidPassword(password) {
        return password.length >= 6 && password.length <= 12;
    }
}

const credentialSingleton = new Credential();
Object.freeze(credentialSingleton);

export default Credential;
