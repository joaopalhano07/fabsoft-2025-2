package br.univille.entity;

public class Cidade {

    private String nome;

    //Construtor - Inicialiar Variáveis
    public Cidade(String nome){
        this.nome = nome;
    }
    
    public String getNome(){
        return this.nome;
    }
}
