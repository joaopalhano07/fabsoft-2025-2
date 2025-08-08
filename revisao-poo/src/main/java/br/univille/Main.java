package br.univille;

import br.univille.entity.Cidade;
import br.univille.entity.Cliente;

public class Main {
    public static void main(String[] args) {
        // System.out.println("Hello world!");

        var cliente = new Cliente();
        cliente.setNome("zezinho");
        cliente.setIdade(20);
        cliente.setPeso(75);

        Cidade cidade = new Cidade("Nova Iorque");

        cliente.setCidade(cidade);

    }
}