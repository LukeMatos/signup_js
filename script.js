let B7Validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');
        B7Validator.clearErrors()
        
        for (let i=0;i<inputs.length;i++) {
            let input = inputs[i];          
            let check = B7Validator.checkInput(input);
            if (check !== true) {
                send = false;
            B7Validator.showError(input, check);
            }
        }

        send = false;


        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split ('=');
                switch(rDetails[0]) {
                    case 'required':
                        if (input.value =='') {
                            return 'Campo nao pode ser vazio.';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Mínimo de '+rDetails[1]+' caracteres';
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Campo de email inválido'
                            }
                        }

                }
            }
        }

        return true
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000'
        let errorEl = document.createElement('div')
        errorEl.classList.add('error');
        errorEl.innerHTML = error;
        input.parentElement.insertBefore(errorEl, input.ElementSibling)

    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
            inputs[i].style = '';
        }
        let errorEl = document.querySelectorAll('.error');
        for (let i=0;i<errorEl.length;i++) {
            errorEl[i].remove();
        }

    }
}

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit)

