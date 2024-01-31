import db from '../fireBaseConnection';
import { doc, deleteDoc } from 'firebase/firestore/lite';

const usuarioDelete = async usuarioId => {
  try {
    const usuarioReferencia = doc(db, 'usuarios', usuarioId);
    await deleteDoc(usuarioReferencia);
    console.log(`Usuario ${usuarioReferencia}, deletado com sucesso!`);
  } catch (error) {
    console.log(`Erro ao executar usuarioDelete: ${error}`);
  }
};

export default usuarioDelete;
