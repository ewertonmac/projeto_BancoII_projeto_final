const Evento = require('../model/evento');

const listar = async (req, res) => {
    
    try {
        const result = await Evento.find({});
        const eventos = result.map((evento) => {
            return evento;
        })
        res.status(200).render('eventos', {
            usuario: req.session.user,
            evento: eventos
        });
    }catch(e) {
        res.status(500).send(`Error: ${e.message}`);
    }

}

const listarHome = (req, res) => {
    Evento.find().limit(3)
        .then(eventos => {
            if (!eventos) {
                return res.status(404).json({ "status": 404, "conteudo": "Nenhum evento encontrado" });
            }
            return res.status(200).render('index', {
                usuario: req.session.user,
                evento: eventos,
            });
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const listarPorId = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        const ouvintes = evento.ouvintes.map((ouvinte) => {
            return ouvinte;
        })
        return res.status(200).render('detalhes-evento', {
            usuario: req.session.user,
            evento: evento,
            ouvinte: ouvintes
        });
    } catch(e) {
        res.status(500).send(`Error: ${e.message}`);
    }
}

const proximosEventos = (req, res) => {
    Evento.find({ data: { $gte: new Date() } }).limit(req.params.quantidade).sort({ data: 1 })
        .then(eventos => {
            if (eventos.length === 0) {
                return res.status(404).json({ "status": 404, "conteudo": "Nenhum evento encontrado" });
            }
            return res.status(200).send(eventos);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const listarPorEmailPalestrante = (req, res) => {
    Evento.find({ "palestrante.email": { $eq: req.params.email } })
        .then(eventos => {
            if (eventos.length === 0) {
                return res.status(404).json({ "status": 404, "conteudo": "Nenhum evento encontrado" });
            }
            return res.status(200).send(eventos);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const cadastrar = (req, res) => {
    const evento = new Evento(req.body);
    evento.palestrante = req.session.user;

    evento.save()
        .then(evento => {
            return res.status(201).redirect('/');
        }).catch(err => {
            if (err.code === 11000) {
                return res.status(400).json({ "status": 400, "conteudo": "evento já cadastrado" });
            }
            req.flash('error', `${err.message}`);
            return res.status(500).redirect('/');
        })

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

const atualizar = (req, res) => {
    Evento.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(evento => {
            if (!evento) {
                return res.status(404).json({ "status": 404, "conteudo": "evento não encontrado" });
            }
            return res.status(200).send(evento);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const deletar = (req, res) => {
    try {
        Evento.deleteOne({ _id: req.params.id })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({ "status": 404, "conteudo": "evento não encontrado" });
                }
                return res.status(200).json({ "status": 200, "conteudo": "evento deletado com sucesso" });
            }).catch(err => {
                return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
            });
    } catch(e) {
        return res.status(500).send(`<b>Eror:</b> ${e.message}`);
    }
}


module.exports = {
    listar,
    listarHome,
    proximosEventos,
    inscreverOuvinte,
    listarPorId,
    listarPorEmailPalestrante,
    cadastrar,
    atualizar,
    deletar
};