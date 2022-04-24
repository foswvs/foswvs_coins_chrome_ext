let activate = document.getElementById('activate'),
    info_msg = document.getElementById('info_msg');

activate.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: info1,
  });
});


function info1() {
  if( this.location.host !== 'app.coins.ph' ) {
    this.location.assign('https://app.coins.ph/welcome/login');
    return;
  }

  let jwt = this.localStorage.getItem('coins_jwt');

  if( !jwt ) {
    let p = document.createElement('p');

    p.innerText = 'Sign-in to activate';
    p.style.fontSize = '1.4em';
    p.style.color = '#FFFFFF';
    p.style.backgroundColor = '#FF5733';
    p.style.padding = '10px';
    p.style.bottom = 0;
    p.style.margin = 0;
    p.style.left = 0;
    p.style.right = 0;
    p.style.zIndex = 9999;
    p.style.position = 'fixed';
    p.style.textAlign = 'center';

    document.body.append(p);

    setTimeout(()=>p.remove(),3000);

    return;
  }

  let x = new XMLHttpRequest();

  x.addEventListener('readystatechange', ()=> {
    if( x.readyState === 4 ) {
      if( x.status === 200 ) {
        location.assign(x.responseText);
      }
      else {
        alert('Unexpected error occured. Try again.');
      }
    }
  });

  x.open('POST','https://10.0.0.1/coinsph/activate.php');
  x.send(jwt.replace(/"/g,''));  
}
