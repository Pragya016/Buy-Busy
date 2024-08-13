import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase.config";

export async function signUpUser(userData) {
    if (typeof userData.email !== 'string' || typeof userData.password !== 'string') {
        throw new Error('Email and password must be strings');
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const user = userCredential.user;

        // Update the user profile with the name
        await updateProfile(user, {
            displayName: userData.name,
        });    
        
    } catch (error) {
        console.log(error)
    }
}

export async function signInUser(userData) {
    if (typeof userData.email !== 'string' || typeof userData.password !== 'string') {
        throw new Error('Email and password must be strings');
    }
    return signInWithEmailAndPassword(auth, userData.email, userData.password);
}

export async function signOutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error)
    }   
}

export async function deleteUserAccount () {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        try {
            const user = auth.currentUser;
            if (user) {
                await deleteUser(user);
                return { status: 'success' };
            } else {
                return { status: 'failure' };
            }
        } catch (error) {
            console.error(error)
            return {status : 'error'}
        }
    }
};
