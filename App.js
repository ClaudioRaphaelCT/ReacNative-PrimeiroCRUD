import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import usuariosGET from './src/service/methods/usuariosGET';
import { useEffect, useState } from 'react';
import usuarioDelete from './src/service/methods/usuariosDelete';
import inserirUsuario from './src/service/methods/usuariosInsert';
import usuarioUpdate from './src/service/methods/usuarioUpdate';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioNome, setUsuarioNome] = useState('');
  const [usuarioIdade, setUsuarioIdade] = useState('');
  const [usuarioIdParaAtualizar, setUsuarioIdParaAtualizar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosCapturados = await usuariosGET();
        setUsuarios(usuariosCapturados);
      } catch (error) {
        console.log(`Erro ao buscar usuários: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleInsertUsuario = async () => {
    const novoUsuario = {
      nome: usuarioNome,
      idade: usuarioIdade,
    };
    await inserirUsuario(novoUsuario);
    const usuariosAtualizados = await usuariosGET();
    setUsuarios(usuariosAtualizados);
    // Limpe os campos de input
    setUsuarioNome('');
    setUsuarioIdade('');
  };

  const handleUpdateUsuario = async () => {
    if (!usuarioIdParaAtualizar) {
      console.log('Id do usuario nao especificado');
      return;
    }
    const novoUsario = {
      nome: usuarioNome,
      idade: usuarioIdade,
    };
    await usuarioUpdate(usuarioIdParaAtualizar, novoUsario);
    // Atualize o estado após a atualização
    const usuariosAtualizados = await usuariosGET();
    setUsuarios(usuariosAtualizados);
    // Limpe os campos de input e redefina o ID para atualização
    setUsuarioNome('');
    setUsuarioIdade('');
    setUsuarioIdParaAtualizar(null);
  };

  const handleDeleteUsuario = async usuarioId => {
    await usuarioDelete(usuarioId);
    const usuariosAtualizados = await usuariosGET();
    setUsuarios(usuariosAtualizados);
  };

  const handleEditUsuario = usuario => {
    setUsuarioNome(usuario.nome);
    setUsuarioIdade(usuario.idade);
    setUsuarioIdParaAtualizar(usuario.id);
  };

  return (
    <View style={styles.container}>
      <Text>Adicionar/Atualizar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o nome"
        value={usuarioNome}
        onChangeText={text => setUsuarioNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Insira a idade"
        value={usuarioIdade.toString()}
        keyboardType="numeric"
        onChangeText={text => setUsuarioIdade(text)}
      />

      {usuarioIdParaAtualizar ? (
        <Button title="Atualizar Usuario" onPress={handleUpdateUsuario} />
      ) : (
        <Button title="Inserir Usuario" onPress={handleInsertUsuario} />
      )}

      <Text>Usuarios</Text>
      {usuarios.map((usuario, indice) => (
        <View key={indice}>
          <Text>Nome: {usuario.nome}</Text>
          <Text style={styles.btn}>Idade: {usuario.idade}</Text>
          <Button title="Editar" onPress={() => handleEditUsuario(usuario)} />
          <Button style={styles.btn} title="Deletar" onPress={() => handleDeleteUsuario(usuario.id)} />
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200,
  },
  btn: {
    marginBottom: 10,
  },
});
