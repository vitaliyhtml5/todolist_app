'use strict';

import {showAlert,showLoaderMain,closeLoaderMain} from './components.js';

document.querySelector('.login-form').addEventListener('submit', e => {
    e.preventDefault();
    makelogin();
});

async function makelogin() {
    const input = document.querySelectorAll('.login-form input');
    const data = {
        login: input[0].value,
        password: input[1].value
    }

    const res = await fetch('/get-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    showLoaderMain();

    if (result.message === 'access is allowed') {
        window.location.href = '/';
    } else {
        closeLoaderMain();
        showAlert(result.message,'unsuccess');
    }
}