import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import usuariosGET from './src/service/methods/usuariosGET';
import { useEffect, useState } from 'react';
import handleDeleteUsuario from './src/actions/handleDeleteUsuario';
import { handleInsertUsuario } from './src/actions/handlerInsertUsuario';
import { handleUpdateUsuario, handleEditUsuario } from './src/actions/handleUpdateUsuario';
import Input from './src/components/AppInput';

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

  return (
    <View style={styles.container}>
      <Text>Adicionar/Atualizar Usuario</Text>
      <Input placeholder="Insira o nome" value={usuarioNome} onChangeText={text => setUsuarioNome(text)} />
      <Input
        placeholder="Isira a idade"
        value={usuarioIdade.toString()}
        keyboardType="numeric"
        onChangeText={text => setUsuarioIdade(text)}
      />

      {usuarioIdParaAtualizar ? (
        <Button
          title="Atualizar Usuario"
          onPress={() =>
            handleUpdateUsuario(
              usuarioIdParaAtualizar,
              usuarioNome,
              usuarioIdade,
              setUsuarios,
              setUsuarioNome,
              setUsuarioIdade,
              setUsuarioIdParaAtualizar,
            )
          }
        />
      ) : (
        <Button
          title="Inserir Usuario"
          onPress={() => handleInsertUsuario(usuarioNome, usuarioIdade, setUsuarios, setUsuarioNome, setUsuarioIdade)}
        />
      )}

      <Text>Usuarios</Text>
      {usuarios.map((usuario, indice) => (
        <View key={indice}>
          <Text>Nome: {usuario.nome}</Text>
          <Text style={styles.btn}>Idade: {usuario.idade}</Text>
          <Button
            title="Editar"
            onPress={() => handleEditUsuario(usuario, setUsuarioNome, setUsuarioIdade, setUsuarioIdParaAtualizar)}
          />
          <Button style={styles.btn} title="Deletar" onPress={() => handleDeleteUsuario(usuario.id, setUsuarios)} />
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
  btn: {
    marginBottom: 10,
  },
});
