import db from '../fireBaseConnection';
import { collection, addDoc } from 'firebase/firestore/lite';

const inserirUsuario = async novoUsuario => {
  try {
    const usuariosCollection = collection(db, 'usuarios');
    await addDoc(usuariosCollection, novoUsuario);
  } catch (error) {
    console.log(`Error ao tentar deletar o usuario: ${error}`);
  }
};

export default inserirUsuario;
