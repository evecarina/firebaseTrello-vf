import store from './store/store';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA6tJ7Ls_wj-_h5hMz56wG21HISKuJi7lM",
    authDomain: "trellofire.firebaseapp.com",
    databaseURL: "https://trellofire.firebaseio.com",
    projectId: "trellofire",
    storageBucket: "trellofire.appspot.com",
    messagingSenderId: "322437950508"
  };
  firebase.initializeApp(config);

export function readBoard(user) {
    firebase.database().ref(user + '/boards').on('value', res => {
        let stages = [];
        res.forEach(snap => {
            const stage = snap.val();
            stages.push(stage);
        })
        store.setState({
            boards: stages,
            loading: false
        })
    })
}
export const addBoard = (value) => {
    let user = store.getState().user;
    let boards = [...store.getState().boards];
    let newBoard = {
        name: value,
        id: boards.length + '-' + value
    }
    firebase.database().ref(user.id + '/boards/' + newBoard.id).set(newBoard)
        .then(() => console.log('error'));
}
export const addList = (value, board) => {
    let user = store.getState().user;
    let list = board.list ? board.list : [];
    list.push({ name: value });
    firebase.database().ref(user.id + '/boards/' + board.id + '/list').set(list)
        .then(() => console.log('error'));

}
export const addCard = (value, board, list) => {
    let user = store.getState().user;
    let newList = board.list.map(item => {
        if (item.name === list) {
            if (item.cards) {
                item.cards.push(value);
            } else {
                item.cards = [value];
            }
        }
        return item;
    });

    firebase.database().ref(user.id + '/boards/' + board.id + '/list').set(newList)
        .then(() => console.log('error'));

}
// creando un usuario nuevo y a la ves autentificandolo.
export function signUser(firstName, lastName, email, pass, confirm) {
    if (confirm) {
        firebase.auth().createUserWithEmailAndPassword(email, pass).then(user => {
            let newuser = {
                firstName, lastName, email, pass
            }
            firebase.database().ref('users/' + user.uid).set(newuser);
            store.setState({
                password: false
            })
        }).catch(e => {
            store.setState({
                password: true
            })
            console.log(e)
        })
    }

}
// Para salir de la sesion 
export function signOut() {
    firebase.auth().signOut();
    store.setState({
        user: '',
        boards: [],
        login: false,
        password: false,
        loading: true
    })
}
//creando un nuevo usuario y autentificandolo
export function signIn(user, pass) {
    firebase.auth().signInWithEmailAndPassword(user, pass).catch(e => {
        console.log(e.message)
        store.setState({
            login: true
        })
    })
}
// Autentificando de que el usuario exista
export const authentication = () => {
    firebase.auth().onAuthStateChanged(usuario => {
        if (usuario) {
            firebase.database().ref('users/' + usuario.uid).once('value').then(res => {
                const fullUserInfo = res.val();
                store.setState({
                    user: {
                        id: 'users/' + usuario.uid,
                        name: fullUserInfo.firstName,
                        lastName: fullUserInfo.lastName
                    }
                })
            })
            readBoard('users/' + usuario.uid);
        }
    });
}