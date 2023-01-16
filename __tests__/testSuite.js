const { doc, getDoc, setDoc, deleteDoc, updateDoc, enableIndexedDbPersistence } = require('firebase/firestore');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signOut } = require('firebase/auth');
const { db, auth } = require('../firebase');



const ADMIN_EMAIL = 'a@a.com'
const PASSWORD = 'admin1'
const VALID_EMAIL = 'validtest@email.com'
const NO_USER_EMAIL = 'idontexists@test.com'
const NO_USER_PASS = '123'
const GOOD_PASSWORD = 'passOK123'
const INVALID_EMAIL = 'test@wrong'
const SHORT_PASSWORD = 'short'

describe('Login Tests',() => {
    test('Successful login with admin email and password', async () => { 
        expect.assertions(1)
        let res
        try {
            res = await signInWithEmailAndPassword(auth, ADMIN_EMAIL.trim(), PASSWORD)
            // const docRef = doc(db, "users", user.uid);
            // const docSnap = await getDoc(docRef);
            // const isAdmin = docSnap.data().isAdmin
        } catch (error) {
            console.log(error)
            return
        }
            expect(res.user.email).toBe(ADMIN_EMAIL)
    })

    test('Wrong password when logging in', async () => { 
        expect.assertions(1)
        let res
        try {
            res = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, NO_USER_PASS) 
        } catch (error) {
            expect(error.code).toBe('auth/wrong-password')
            return
        }        
    })

    test('Email does not exist', async () => { 
        expect.assertions(1)
        let res
        try {
            res = await signInWithEmailAndPassword(auth, NO_USER_EMAIL.trim(), NO_USER_PASS)
            // const docRef = doc(db, "users", user.uid);
            // const docSnap = await getDoc(docRef);
            // const isAdmin = docSnap.data().isAdmin
        } catch (error) {
            expect(error.code).toBe('auth/user-not-found')
            return
        }        
    })
});

describe('Registration Tests',() => {
    test('Invalid email on registration', async () => { 
        expect.assertions(1)
        let user
        try {
            user = await createUserWithEmailAndPassword(auth, INVALID_EMAIL, PASSWORD) 
        } catch (error) {
            expect(error.code).toBe('auth/invalid-email')
            return
        }        
    })

    test('Email already in use on registration', async () => { 
        expect.assertions(1)
        let user
        try {
            user = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, PASSWORD) 
        } catch (error) {
            expect(error.code).toBe('auth/email-already-in-use')
            return
        }        
    })

    test('Weak password on registration', async () => { 
        expect.assertions(1)
        let user
        try {
            user = await createUserWithEmailAndPassword(auth, VALID_EMAIL, SHORT_PASSWORD) 
        } catch (error) {
            expect(error.code).toBe('auth/weak-password')
            return
        }        
    })

    test('Successful create and delete user', async () => { 
        expect.assertions(2)
        let res
        try {
            res = await createUserWithEmailAndPassword(auth, VALID_EMAIL, GOOD_PASSWORD)   
        } catch (error) {
            console.log(error.code)
            return
        }
        expect(res.user.email).toBe(VALID_EMAIL)
        
        deleteUser(res.user).then(() => {

        }).catch((error)=>{
            console.log(error.code)
            return
        })

        try {
            res = await signInWithEmailAndPassword(auth, VALID_EMAIL, GOOD_PASSWORD)
        } catch (error) {
            expect(error.code).toBe('auth/user-token-expired')
            return
        }
    })
})

describe('CRUD Tests',() => {
    
    test('Add/Read installed sign', async () => { 
        expect.assertions(2)
        let res
        try {
            //await signInWithEmailAndPassword(auth, ADMIN_EMAIL.trim(), PASSWORD)
           await setDoc(doc(db, "installedSigns", "TestDoc"), {
                address: "test address",
                rushOrder: true,
                color: "white"
            });

            const docRef = doc(db, "installedSigns", "TestDoc")
            const docSnap = await getDoc(docRef)
            res = docSnap.data()
        } catch (error) {
            console.log(error)
            return
        }
        expect(res.address).toBe("test address")
        expect(res.rushOrder).toBe(true)
        
        
    })

    test('Update Sign', async () => { 
        expect.assertions(1)
        let res
        let docSnap
        try {
            
            const docRef = doc(db, "installedSigns", "TestDoc")
            await updateDoc(docRef, {address: "new address"})
            docSnap = await getDoc(docRef)
            res = docSnap.data()
        } catch (error) {
            console.log(error)
            return
        }
        expect(res.address).toBe("new address")        
    })

    test('Delete sign', async () => { 
        expect.assertions(1)
        let docSnap
        try {
            //await signInWithEmailAndPassword(auth, ADMIN_EMAIL.trim(), PASSWORD)
            await deleteDoc(doc(db, "installedSigns", "TestDoc"));
            const docRef = doc(db, "installedSigns", "TestDoc")
            docSnap = await getDoc(docRef)
        } catch (error) {
            console.log(error)
            return
        }
        expect(docSnap.exists()).toBe(false)        
    })
})
