import { collection} from 'firebase/firestore';
import { db } from './firebase.config.js';

const appCollection = collection(db, 'users')
