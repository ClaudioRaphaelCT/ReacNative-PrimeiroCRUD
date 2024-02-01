import usuarioUpdate from '../service/methods/usuarioUpdate';
import usuariosGet from '../service/methods/usuariosGET';

export const handleUpdateUsuario = async (
  usuarioIdParaAtualizar,
  usuarioNome,
  usuarioIdade,
  setUsuarios,
  setUsuarioNome,
  setUsuarioIdade,
  setUsuarioIdParaAtualizar,
) => {
  if (!usuarioIdParaAtualizar) {
    console.log('Id não especificado!');
    return;
  }
  const novoUsuario = {
    nome: usuarioNome,
    idade: usuarioIdade,
  };
  await usuarioUpdate(usuarioIdParaAtualizar, novoUsuario);
  // Atualiza o estado após a atualização
  const usuariosAtualizados = await usuariosGet();
  setUsuarios(usuariosAtualizados);
  setUsuarioNome('');
  setUsuarioIdade('');
  setUsuarioIdParaAtualizar('');
};

const handleEditUsuario = (usuario, setUsuarioNome, setUsuarioIdade, setUsuarioIdParaAtualizar) => {
  setUsuarioNome(usuario.nome);
  setUsuarioIdade(usuario.idade);
  setUsuarioIdParaAtualizar(usuario.id);
};

export default { handleUpdateUsuario };
export { handleEditUsuario };
