import React , {useState, useEffect} from 'react';
import { Link ,useParams,Navigate, useNavigate} from 'react-router-dom'
import './styles.css';
import {FiCornerDownLeft,FiUserPlus} from 'react-icons/fi'
import api from '../../services/api'

export  default function NovoAluno(){
    const {alunoId} = useParams();

    const [id,setId] = useState(null);
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [idade,setIdade] = useState('');

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const authorization = {
        headers :{
            Authorization: `Bearer ${token}`
        }
    }


    useEffect(()=>{
        if(alunoId==='0')
            return;
        else
        loadAluno();
    },alunoId)
    
    async function loadAluno(){
        try
        {
            const response = await api.get(`/api/alunos/${alunoId}`,authorization);
            setId(response.data.id);
            setNome(response.data.nome);
            setEmail(response.data.email);
            setIdade(response.data.idade);

        } catch (error) 
        {
            alert('Erro ao recuperar aluno'+ error)
            navigate('/alunos');
        }
       
    }

    async function saveOrUpdate(event){
        event.preventDefault();
        const data =
        {
            nome,
            email,
            idade
        }

        try
        {
            if(alunoId==="0"){
                console.log('Caiu novo aluno')
                await api.post('/api/alunos',data,authorization);
                
            }else
            {
                data.id = id;
                console.log('Caiu Editar aluno')
                await api.put(`/api/alunos/${id}`,data,authorization);
                
            }
        } catch (error) 
        {
            alert('Erro ao gravar aluno'+ error)
        }finally {
            navigate('/alunos');
        }
       
    }



return (
    <div className='novo-aluno-container'>
        <div className='content'>        
            <section className='form'>
                <FiUserPlus size="105" color="#17202a"></FiUserPlus>
                <h1>{alunoId ==="0"?'Incluir Novo Aluno':'Atualizar Aluno'}</h1>
                <Link className="back-link" to="/alunos">
                 <FiCornerDownLeft size="25" color="#17202a"/>   
                 Retornar
                </Link>
            </section>
            <form onSubmit={saveOrUpdate}>
                <input placeholder="Nome"  
                    value={nome}
                    onChange={e=> setNome(e.target.value)}
                />    
                <input placeholder="Email"  
                    onChange={e=> setEmail(e.target.value)}
                    value={email}
                />    
                <input placeholder="Idade"  
                    onChange={e=> setIdade(e.target.value)}
                    value={idade}
                />    
                <button className='button'type='submit'>{alunoId==="0"?'Inlcuir':'Atualizar'}</button>

            </form>
        </div>
    </div>
)

}