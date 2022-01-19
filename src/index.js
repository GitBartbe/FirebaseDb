import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyApJmXVRSsOumphADbT1w9dNh9pUH01Pfc",
  authDomain: "netninjatut-fcde2.firebaseapp.com",
  projectId: "netninjatut-fcde2",
  storageBucket: "netninjatut-fcde2.appspot.com",
  messagingSenderId: "251485416063",
  appId: "1:251485416063:web:ef5c5812c9abe0f59eed4a",
};

// init firebase
initializeApp(firebaseConfig)


// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef,orderBy('createAt'))

// realtime collection data
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})