function send(message) {
    return new Promise((resolve, reject) => {
        $.post('https://us-central1-site-casabrendalee.cloudfunctions.net/enviarEmail', message, resolve);
    });
}

$(function() {
    let nav = $('#navbarCollapse');
    nav.on("click", "a", null, function () {
        nav.collapse('hide');
    });

    $('#form').on('submit', function(e) {
        e.preventDefault();
        $('#buttonForm').addClass('disabled').text('Enviando...');
        let message = {
            subject: 'Nova mensagem',
            content: `
                <h1>Nova mensagem recebida do site</h1>
                <p>Nome: ${$('#nome').val()}</p>
                <p>E-mail: ${$('#email').val()}</p>
                <p>Telefone: ${$('#telefone').val()}</p>
                <p>Mensagem: ${$('#mensagem').val()}</p>
                <br>
                <p>Atenciosamente,<br>Casa Brenda Lee</p>
            `
        }
        send(message).then(function(response) {
            console.log(response);
            $('#buttonForm').removeClass('disabled').text('Enviar mensagem');
            $('#alertForm').removeClass('d-none');
            $('#form')[0].reset();
        });
    });

    $('#newsletter').on('submit', function(e) {
        e.preventDefault();
        $('#buttonNewsletter').addClass('disabled');
        let message = {
            subject: 'Novo contato',
            content: `
                <h1>Novo contato para a newsletter</h1>
                <p>${$('#emailNewsletter').val()}</p>
            `
        }
        send(message).then(function(response) {
            console.log(response);
            $('#newsletter').addClass('d-none');
            $('#alertNewsletter').removeClass('d-none');
        });
    });
});