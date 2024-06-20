import bcrypt from 'bcrypt'

// Función para hashear la contraseña
export function encryptPassword(password, saltRounds) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

// Función para verificar la contraseña
export function verifyPassword(password, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}