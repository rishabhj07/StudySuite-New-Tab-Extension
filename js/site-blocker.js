const generateSTYLES = () => {
  return `<style>@import url(https://fonts.googleapis.com/css?family=opensans:500);
    html {
      height: 100%;
    }

    body {
      background: rgb(49,58,175);
      background: linear-gradient(107deg, rgba(49,58,175,1) 0%, rgba(42,32,103,1) 100%);
      background-repeat: no-repeat;
      height: 100%;
      color: #fff;
      font-family: "Open Sans", sans-serif;
      overflow: hidden;
    }
    .c {
      text-align: center;
      display: block;
      position: relative;
      width: 80%;
      margin: 100px auto;
    }
    .msg {
      font-size: 220px;
      position: relative;
      display: inline-block;
      z-index: 2;
      height: 250px;
      letter-spacing: 15px;
    }
    ._1 {
      text-align: center;
      display: block;
      position: relative;
      letter-spacing: 12px;
      font-size: 4em;
      line-height: 80%;
    }
    
    hr {
      padding: 0;
      border: none;
      border-top: 5px solid #fff;
      color: #fff;
      text-align: center;
      margin: 0px auto;
      width: 420px;
      height: 10px;
      z-index: -10;
    }  
     </style>`;
};

const generateHTML = (pageName) => {
  return `
     
    <div class='c'>
        <div class='msg'>BUSTED!</div>
        <hr>
        <div class='_1'>STAY FOCUSED</div>

    </div>
     `;
};


var theButton = document.querySelector("input");

function updateButton() {
  // update button based on storage
  chrome.storage.local.get(['onOrOff'], result => {
    theButton.checked = result.onOrOff ? true : false;
    theButton.className = result.onOrOff ? "buttonON" : "buttonOFF";

    if (theButton.checked == true) {
      switch (window.location.hostname) {
        case "www.youtube.com":
          document.head.innerHTML = generateSTYLES();
          document.body.innerHTML = generateHTML();
          break;
        case "www.facebook.com":
          document.head.innerHTML = generateSTYLES();
          document.body.innerHTML = generateHTML();
          break;
        case "www.netflix.com":
          document.head.innerHTML = generateSTYLES();
          document.body.innerHTML = generateHTML();
          break;
        case "www.primevideo.com":
          document.head.innerHTML = generateSTYLES();
          document.body.innerHTML = generateHTML();
          break;
        case "www.tiktok.com":
          document.head.innerHTML = generateSTYLES();
          document.body.innerHTML = generateHTML();
          break;
        case "www.disneyplus.com":
          document.head.innerHTML = generateSTYLES();
          document.body.innerHTML = generateHTML();
          break;
        case "www.reddit.com":
          document.head.innerHTML = generateSTYLES();
          document.body.innerHTML = generateHTML();
          break;
      }
    }
  })
}

function toggleButton(e) {
  chrome.tabs.reload();
  // check className of button
  var bool = e.target.className === 'buttonON' ? false : true
  chrome.storage.local.set({
    'onOrOff': bool
  }, result => {
    updateButton()
  })

}

updateButton()
theButton.onclick = toggleButton