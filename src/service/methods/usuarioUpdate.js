import db from '../fireBaseConnection';
import { doc, updateDoc } from 'firebase/firestore/lite';

const usuarioUpdate = async (usuarioId, novosDadosUsuario) => {
  try {
    const usuariosCollection = doc(db, 'usuarios', usuarioId);
    await updateDoc(usuariosCollection, novosDadosUsuario);
  } catch {
    const usuariosCollection = doc(db, 'usuarios', usuarioId);
    await updateDoc(usuariosCollection, novosDadosUsuario);
  }
};

export default usuarioUpdate;
