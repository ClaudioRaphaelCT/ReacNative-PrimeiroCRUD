import inserirUsuario from '../service/methods/usuariosInsert';
import usuariosGet from '../service/methods/usuariosGET';

export const handleInsertUsuario = async (nome, idade, setUsuarios, setUsuarioNome, setUsuarioIdade) => {
  const novoUsuario = {
    nome: nome,
    idade: idade,
  };
  await inserirUsuario(novoUsuario);
  const usuariosAtualizados = await usuariosGet();
  setUsuarios(usuariosAtualizados);

  //Limpar Input
  setUsuarioNome('');
  setUsuarioIdade('');
};
