const Evento = require('../model/evento');
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
        const evento = await eventoService.listarPorId(req.params.id)
        if (evento) {
            const { ouvintes } = evento;
            let adminEvento;
            if (req.session.user) {
                adminEvento = (evento.palestrante.id === req.session.user._id) ? true : false;
            }

            return res.status(200).render('detalhes-evento', {
                usuario: req.session.user,
                evento: evento,
                ouvinte: ouvintes,
                autorizacaoEvento: adminEvento
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

const inscreverOuvinte = (req, res) => {
    const {nome, sobrenome, email} = req.session.user;

    if (!nome || !sobrenome || !email) {
        return res.status(400).json({ "status": 400, "conteudo": "Dados insuficientes" });
    }

    Evento.findById(req.params.id)
        .then(evento => {
            if (!evento.ouvintes.some(ouvinte => ouvinte.email === email)) {

                evento.updateOne({ $push: { ouvintes: { nome, sobrenome, email } } })
                    .then(e => {
                        return res.status(200).redirect(`/eventos/${req.params.id}`);
                    }).catch(err => {
                        return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
                    });
                    
            } else {
                return res.status(400).redirect(`/eventos/${req.params.id}`);
            }
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        })
}

const atualizar = async (req, res) => {
    const evento = await Evento.findOne({_id: req.params.id});
    try {
        if(req.session.user._id === evento.palestrante._id) {
            Evento.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(evento => {
                if (!evento) {
                    return res.status(404).json({ "status": 404, "conteudo": "evento não encontrado" });
                }
                return res.status(200).redirect(`/eventos/${evento.id}`);
            }).catch(err => {
                return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
            });
        }
    } catch(e) {
        return res.status(500).send(`<b>Eror:</b> ${e.message}`);       
    }
}

const atualizarEvento = async (req, res) => {
    try {
        const evento = await Evento.findOne({_id: req.params.id});
        res.status(200).render('atualizar-evento', {
            usuario: req.session.user,
            evento: evento
        })
    } catch(e) {
        res.status(500).send(`<b>Error:</b> ${e.message}`);
    }
}

const deletar = async (req, res) => {
    try {
        const evento = await Evento.findOne({_id: req.params.id});
        if(req.session.user._id === evento.palestrante._id) {
            Evento.deleteOne({ _id: req.params.id })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({ "status": 404, "conteudo": "evento não encontrado" });
                }
                return res.status(200).redirect('/eventos');
            });
        }
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