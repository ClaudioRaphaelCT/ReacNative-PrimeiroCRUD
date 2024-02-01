import usuarioDelete from '../service/methods/usuariosDelete';
import usuariosGet from '../service/methods/usuariosGET';

const handleDeleteUsuario = async (usuarioId, setUsuarios) => {
  await usuarioDelete(usuarioId);
  const usuariosAtualizados = await usuariosGet();
  setUsuarios(usuariosAtualizados);
};

export default handleDeleteUsuario;
