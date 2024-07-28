"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [produtos, setProdutos] = useState<any>([]);
  const [produto, setProduto] = useState<any>({});

  useEffect(() => {
    obterProdutos();
  }, []);

  async function obterProdutos() {
    const response = await fetch('http://localhost:3001/produtos');
    const listaProdutos = await response.json();
    setProdutos(listaProdutos);
  }

  async function criarProduto() {
    if (produto === '') {
      return;
    }
    const response = await fetch('http://localhost:3001/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto),
    });
    setProduto({});
    await obterProdutos();
  }

  async function alterarProduto(id: number) {
    const response = await fetch(`http://localhost:3001/produtos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto),
    });
    setProduto({});
    await obterProdutos();
  }

  async function excluirProduto(id: number) {
    await fetch(`http://localhost:3001/produtos/${id}`, {
      method: 'DELETE',
    });
    await obterProdutos();
  }

  async function obterProdutoPorId(id: number) {
    const response = await fetch(`http://localhost:3001/produtos/${id}`);
    const produto = await response.json();
    setProduto(produto);
  }

  function renderizarFormProduto() {
    return (
      <>
        {/* <h1 className="flex justify-center items-center bg-zinc-800 mt-10 mb-5">Cadastro de novo produto</h1> */}
        <div className="flex gap-5 items-end">
          <div className="flex flex-col">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={produto.nome ?? ''}
              onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
              className="bg-zinc-700 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              type="text"
              value={produto.descricao ?? ''}
              onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
              className="bg-zinc-700 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="preco">Preço</label>
            <input
              id="preco"
              type="number"
              value={produto.preco ?? ''}
              onChange={(e) => setProduto({ ...produto, preco: +e.target.value })} // o '+' passa de string para number
              className="bg-zinc-700 p-2 rounded-md"
            />
          </div>
          <div>
            {produto.id ? (
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 px-4 py-2 rounded-md"
                  onClick={() => alterarProduto(produto.id)}
                >
                  Alterar produto
                </button>
                <button className="bg-red-500 px-4 py-2 rounded-md" onClick={() => setProduto({})}>Cancelar alteração</button>
              </div>
            ) : (
              <button
                className="bg-blue-500 px-4 py-2 rounded-md"
                onClick={criarProduto}
              >
                Salvar produto
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  function renderizarProdutos() {
    return (
      <div className="flex flex-col gap-2 mt-10">
        {/* <h1 className="flex justify-center items-center bg-zinc-800 mt-10 mb-5">Produtos cadastrados</h1> */}
        {produtos.map((produto: any) => (
          <div key={produto.id} className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-md">
            <div className="flex-1">{produto.nome}</div>
            <div>{produto.preco}</div>
            <div className="flex gap-2">
              <button className="bg-green-500 p-2 rounded-md" onClick={() => obterProdutoPorId(produto.id)}>Alterar</button>
              <button className="bg-red-500 p-2 rounded-md" onClick={() => excluirProduto(produto.id)}>Excluir</button>

            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <h1 className="flex justify-center items-center mt-20">CRUD Produtos - NEXT/NEST/PRISMA/SQLITE</h1>
      <div className="flex flex-col justify-center items-center h-screen">
        {renderizarFormProduto()}
        {renderizarProdutos()}
      </div>
    </>
  );
}
