class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);
            } 
            
            else {
                this.atualizar(this.editId, produto);                
            }
            
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = ''; //limpa a tabela para não duplicar informações com array

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center'); // centralizando o ID na tela

            let imgEdit = document.createElement('img');
            imgEdit.setAttribute("onclick", "produto.preparaEditacao(" + JSON.stringify(this.arrayProdutos[i]) + ")");
            imgEdit.src = 'img/edit.png';

            let imgDelete = document.createElement('img');
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");
            imgDelete.src = 'img/delete.png';

            td_acoes.appendChild(imgEdit) //adicionando img editar
            td_acoes.appendChild(imgDelete) //adicionando img editar

            console.log(this.arrayProdutos)
        }
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
                alert('Produto e preço atualizados!');
            }
        }
    }

    preparaEditacao(dados) {
        this.editId = dados.id;


        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';
        alert('Digite o nome ou preço do produto: ' + dados.nomeProduto);
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
    }

    validaCampos() {
        let msg = '';

        if (document.getElementById('produto').value == '') {
            msg += '- Informe o nome do Produto \n';
        }

        if (document.getElementById('preco').value == '') {
            msg += '- Informe o preço do Produto \n';
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;

    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id) {


        if (confirm('Deseja realmente deletar o produto do ID ' + id)) {
            let tbody = document.getElementById('tbody');

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1); //deleta determinado registro do array
                tbody.deleteRow(i); //deleta linha da tabeça
            }
        }

        console.log(this.arrayProdutos);
        }
        
    }

}

var produto = new Produto()