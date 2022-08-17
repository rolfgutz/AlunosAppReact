import React,{useState,useEffect} from 'react';
import { Link,useNavigate  } from 'react-router-dom'
import './styles.css';
import {FiEdit, FiUserX, FiXCircle} from 'react-icons/fi';
import logoCadastro from './../../assets/logoCadastro.png'
import api from '../../services/api';


export default function Alunos(){

    //filtrar dados 
    const [searcInput, setSearchInput]=useState('');
    const [filtro,setFiltro] = useState([]);


    const navigate = useNavigate ();

    const [alunos,setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const authorization = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }


    const searchAlunos =(searcValue) => {
        setSearchInput(searcValue);
        if(searcInput!==''){
            const dadosFiltrdados = alunos.filter((item)=>{
                return Object.values(item).join('').toLocaleLowerCase()
                .includes(searcInput.toLocaleLowerCase())
            })
            setFiltro(dadosFiltrdados);
        }else{
            setFiltro(alunos);
        } 
    }

    useEffect(()=>{
        api.get('api/alunos',authorization)
        .then(response=>{setAlunos(response.data);
        },token)
    },[])

    async function logout (){
        try {
            localStorage.clear();
            localStorage.setItem('token','');
            authorization.headers='';
            navigate('/');           
        } catch (error) {
            alert('Não foi possivel fazer o logout '+ error)
        }
    }


    async function editAluno(id){
        try 
        {
            navigate(`/aluno/novo/${id}`);    
        } catch (error) 
        {
            alert('Não foi possivel editar o aluno '+ error)
        }
    }


    async function deleteAluno(id){
        try 
        {
            if(window.confirm('deseja deletar o aluno de id '+id +'?'))
            {
                await api.delete(`api/alunos/${id}`,authorization);
                setAlunos(alunos.filter(aluno =>aluno.id !==id));
            }
           
        } catch (error) {
            alert('Não foi possivel deletar o aluno '+ error)

        }

    }


    return (
        
        <div className='aluno-container'>
            <header>
                <img src={logoCadastro} alt="Cadastro"/>
                <span>Bem-Vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/aluno/novo/0">Novo Aluno </Link>
                <button type="button" onClick={logout}>
                    <FiXCircle size={35} color="#17202a"/>
                </button>
            </header>
            <form>
                <input type="text" 
                placeholder='filtrar por nome...'
                onChange={(e) =>searchAlunos(e.target.value)}
                />


            </form>          
            <h1>Lista de Alunos</h1>
            {searcInput.length>1? 
                (
                <ul>
                    {filtro.map(aluno=>(
                        <li key={aluno.id}>
                        <b>Nome:</b>{aluno.nome}<br></br>
                        <b>Email:</b>{aluno.email}<br></br>
                        <b>Idade:</b>{aluno.idade}<br></br>
                        
                        <button onClick={()=>editAluno(aluno.id)} type="button">
                        <FiEdit size="25" color="#17202a" />
                        </button>
                        
                        <button type="button" onClick={()=>deleteAluno(aluno.id)}>
                            <FiUserX size="25" color="#17202a"/>
                        </button>
                    </li>
                    ))}
                </ul>
                ):
                (
                    <ul>
                        {alunos.map(aluno=>(
                            <li key={aluno.id}>
                            <b>Nome:</b>{aluno.nome}<br></br>
                            <b>Email:</b>{aluno.email}<br></br>
                            <b>Idade:</b>{aluno.idade}<br></br>
                            
                            <button onClick={()=>editAluno(aluno.id)} type="button">
                            <FiEdit size="25" color="#17202a" />
                            </button>
                            
                            <button type="button" onClick={()=>deleteAluno(aluno.id)}>
                            <FiUserX size="25" color="#17202a"/>
                            </button>
                        </li>
                        ))}
                    </ul>
                )
            }
            </div>
    );
}