import db from '../fireBaseConnection';
import { collection, getDocs } from 'firebase/firestore/lite';

const usuariosGet = async () => {
  try {
    const dadosCollection = collection(db, 'usuarios');
    const snapShot = await getDocs(dadosCollection);
    const usuariosObtidos = [];

    snapShot.forEach(doc => {
      const dados = doc.data();
      usuariosObtidos.push({ id: doc.id, nome: dados.nome, idade: dados.idade });
    });
    return usuariosObtidos;
  } catch (error) {
    console.log(`Error ao obter usuarios: ${error}`);
    return [];
  }
};

export default usuariosGet;
