import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login/index'
import Alunos from './pages/Alunos'
import NovoAluno from './pages/NovoAluno'

export default function rotas(){
    return(
        
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />       
        <Route path="/login" element={<Login />} />       
        <Route path="/alunos" element={<Alunos />} />       
        <Route path="/aluno/novo/:alunoId" element={<NovoAluno />} />       
        
      </Routes>
    </Router>
      
        
    );
}
