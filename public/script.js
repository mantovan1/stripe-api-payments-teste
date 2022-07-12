function checkoutProduct(item) {

    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
        
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(({ url }) => {
        window.open(url,'NewWin',
            'toolbar=no,status=no,width=400,height=500');
    })
    .catch(e => {
        console.error(e.error);
    }) 

}

function print() {
    console.log('funcionou');
}