import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log({ user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }
  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log({ user });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}

// import { Injectable } from '@angular/core';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor() {}

//   async registerUser(email: string, password: string): Promise<void> {
//     const auth = getAuth();

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       console.log('User registered successfully!');
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;

//       console.error(errorMessage); // Log the error for debugging
//       throw new Error('An error occurred during registration. Please try again.'); // Throw a custom error for handling in the component
//     }
//   }
// }
