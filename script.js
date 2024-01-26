'use strict';

(() => {
    class Order_form_availability {
        #modal_checkbox = null;
        #input_checkbox = null;
        #label_policy = null;
        #label_checkbox = null;
        #form_send_btn = null;

        constructor(classes) {
            this.class_modal_checkbox = classes.modal_checkbox;                                     // class чекбокса, отвечающего за появление окна
            this.class_form_send_btn = classes.form_send_btn;                                       // class кн Отправить в форме
            this.class_form_input_checkbox_policy = classes.form_input_checkbox_policy;             // class input чекбокса с политикой в форме
            this.class_form_label_checkbox_policy = classes.form_label_checkbox_policy;             // class labek для чекбокса с политикой в форме
            this.class_form_label_policy = classes.form_label_policy;                               // class labek с политикой в форме
        }

        init() {
            if (this.#get_label()) {                                                                // * 1 - если есть параметр-триггер
                this.#get_elements();                                                               // * 2 - получить элементы окна и формы
                this.#show_modal();                                                                 // * 3 - показать модальное окно
                this.#processing_personal_data_checkbox();                                          // обработка нажатия чекбокса о персональных данных
            }
        }

        #get_elements() {                                                                           // ! получить элементы окна и формы
            this.#modal_checkbox = document.querySelector(this.class_modal_checkbox);               // получить чекбокс, отвечающий за появление окна
            this.#input_checkbox = document.querySelector(this.class_form_input_checkbox_policy);   // получить скрытый чекбокс с политикой
            this.#label_policy = document.querySelector(this.class_form_label_policy);              // получить текстовый элемент для чекбокса с политикой
            this.#label_checkbox = document.querySelector(this.class_form_label_checkbox_policy);   // получить дитзайнерский чекбокс с политикой
            this.#form_send_btn = document.querySelector(this.class_form_send_btn);                 // получить кнопку отправить в форме            
        }

        #get_label() {                                                                              // ! проверить наличие параметра в url
            let params = new URLSearchParams(document.location.search);
            return params.get('ofa') === 'order' ? true : false;
        }

        #show_modal() { this.#modal_checkbox.checked = 'true'; }                                    // ! показать модальное окно

        #processing_personal_data_checkbox() {                                                      // ! обработка нажатия чекбокса о персональных данных
            this.#label_checkbox.addEventListener('click', () => { this.#change_button_state(this.#input_checkbox, this.#form_send_btn); });
            this.#label_policy.addEventListener('click', () => { this.#change_button_state(this.#input_checkbox, this.#form_send_btn); });
        }

        // ! включение / отключение кн Отправить
        #change_button_state(checkbox, button) { if (checkbox.checked) { button.disabled = 'true'; } else { button.removeAttribute('disabled'); } }
    };


    let classes = {                                                                                 // классы элементов в модальном окне
        'modal_checkbox': '.modal-oa__input',
        'form_send_btn': '.modal-oa__form-send',
        'form_input_checkbox_policy': '#modal-oa-chek-order-product',
        'form_label_checkbox_policy': '.modal-oa__form-chek-policy',
        'form_label_policy': '.modal-oa__form-label-policy',
    }

    let order_form = new Order_form_availability(classes);
    order_form.init();
})();