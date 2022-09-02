const eventoService = require("../service/eventoService")

const listar = async (req, res) => {

    try {
        const eventos = await eventoService.listar();
        res.status(200).render('eventos', {
            usuario: req.session.user,
            evento: eventos
        });
    } catch (e) {
        res.status(500).send(`Error: ${e.message}`);
    }

}

const listarHome = async (req, res) => {
    const eventos = await eventoService.ultimosEventos();

    try {
        if (!eventos) {
            return res.status(404).json({ "status": 404, "conteudo": "Nenhum evento encontrado" });

        }
        return res.status(200).render('index', {
            usuario: req.session.user,
            evento: eventos,
        });
    } catch (error) {
        return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
    }
}

const listarPorId = async (req, res) => {
    try {
        const usuario = req.session.user;
        const result = await eventoService.listarPorId(req.params.id, usuario);
        const {evento} = result
        if (evento) {
            const { ouvintes } = evento;
            return res.status(200).render('detalhes-evento', {
                usuario,
                evento,
                ouvinte: ouvintes,
                autorizacaoEvento: result.adminEvento
            });
        }
        return res.status(404).send({ mensagem: 'Evento não encontrado!' });
    } catch (e) {
        res.status(500).send(`Error: ${e.message}`);
    }
}

const cadastrar = async (req, res) => {
    if (req.session.minicurriculo === '') {
        return res.status(400).send('Preencha seu minicurriculo e outras informações no perfil primeiro!');
    }

    try {
        const result = await eventoService.cadastrar(req.session.user, req.body)
        
        if(result){
            return res.status(201).redirect('/');
        }

        return res.status(400).json({ "status": 400, "conteudo": "evento já cadastrado" });
        
    } catch (error) {
        req.flash('error', `${error.message}`);
        return res.status(500).redirect('/');
    }

}

const inscreverOuvinte = async (req, res) => {
    const {nome, sobrenome, email} = req.session.user;
    try {
        await eventoService.inscreverOuvinte(req.params.id, { nome, sobrenome, email });

        return res.status(200).redirect(`/eventos/${req.params.id}`);

    } catch (error) {
        return res.status(500).json({ "status": 500, "conteudo": `${error.message}` });
    }
}

const atualizar = async (req, res) => {
    try {
        const result = await eventoService.atualizar(req.params.id, req.session.user, req.body);
        if(!result.atualizado){
            return res.status(404).json({ "status": 404, "conteudo": "evento não atualizado" });
        }
        return res.status(200).redirect(`/eventos/${result.idEvento}`);
    } catch(err) {
        return res.status(500).send(`<b>Eror:</b> ${err.message}`);       
    }
}

const atualizarEvento = async (req, res) => {
    try {
        const usuario = req.session.user;
        const {evento} = await eventoService.listarPorId(req.params.id, usuario)
        res.status(200).render('atualizar-evento', {
            usuario,
            evento
        })
    } catch(e) {
        res.status(500).send(`<b>Error:</b> ${e.message}`);
    }
}

const deletar = async (req, res) => {
    try {
        const result = await eventoService.deletar(req.params.id, req.session.user);
        if(result){
            return res.status(200).redirect('/eventos');
        }

        return res.status(404).json({ "status": 404, "conteudo": "evento não deletado" });
    } catch(e) {
        return res.status(500).send(`<b>Eror:</b> ${e.message}`);
    }
}


module.exports = {
    listar,
    listarHome,
    inscreverOuvinte,
    listarPorId,
    cadastrar,
    atualizar,
    atualizarEvento,
    deletar
};