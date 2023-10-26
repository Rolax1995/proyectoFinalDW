const selects = document.querySelectorAll('input[type=checkbox]');

console.log(selects);

for(let i = 0; i < selects.length; i++){
    selects[i].addEventListener('change',(e)=>{
        console.log('cambiaste el estado de la tarea..');
        console.log(e.target.getAttribute('tarea'));
        data = {
            tarea:e.target.getAttribute('tarea'),
            value:(e.target.checked)? 1 : 0
        }
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        fetch('/update',requestOptions);
    })
}