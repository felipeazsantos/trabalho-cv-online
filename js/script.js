window.addEventListener('load', function() {
    // atribuindo a função manipuladora do método click ao carregar a página
    const btnSendMessage = document.getElementById('btnSendMessage');
    btnSendMessage.addEventListener('click', function(e) {
        handleSendMessageClick(e);
    });
})

function handleSendMessageClick(e) {
    e.preventDefault();
    // seleciona o form
    const formContact = document.querySelector('.form-contact');
    isFormValid = validateForm(formContact);
    if (!isFormValid) {
        return
    }
    
    // limpa os campos do formulário
    cleanFormFields(formContact);

    // mostra a mensagem enviada
    const messageSent = document.querySelector('.message-sent');
    messageSent.style.display = 'block';

    // após 3 segundos esconde a mensagem
    setTimeout(() => {
        messageSent.style.display = 'none';
    }, 3000) 
}

function validateForm(form) {
    let isFormValid = true;

    // Limpa as mensagens anteriores
    Array.from(form.elements).forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.classList.remove('invalid');
            const spanError = element.nextElementSibling;
            if (spanError && spanError.classList.contains('form-field-error')) {
                spanError.textContent = '';
            }
        }
    })

    // Valida o preenchimento dos campos
    Array.from(form.elements).forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (!element.value.trim()) {
                isFormValid = false;
                element.classList.add('invalid');
                const spanError = element.nextElementSibling;
                if (spanError && spanError.classList.contains('form-field-error')) {
                    spanError.textContent = 'Este campo é obrigatório';
                }
            }
        }
    })

    return isFormValid;
}

// cleanFormFields limpa todos os campos do formulário de acordo com o tipo de tag e tipo de atributo do input
function cleanFormFields(form) {
    Array.from(form.elements).forEach(element => {
        if (element.tagName === 'INPUT') {
            switch(element.type) {
                case "text":
                case "email":
                case "number":
                case "password":
                case "tel":
                case "url":
                case "date":
                    element.value = "";
                    break; 
                case "checkbox":
                case "radio":
                    element.checked = false;
                    break;
                default:
                    break;

            }
        } else if (element.tagName === 'TEXTAREA') {
            element.value = '';
        } else if (element.tagName === 'SELECT') {
            element.selectedIndex = 0;
        }
    })
}