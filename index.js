// Source code to interact with smart contract

//connection with node
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  window.ethereum.enable()
}
else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
}
else {
  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log (window.web3.currentProvider)


// contractAddress and abi are setted after contract deploy
var contractAddress = '0xa4cedb7277baec50e0445d65bd84869e666fbb18';
var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]' );

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Ocorreu um erro ao buscar suas contas.");
    return;
  }
  if (accounts.length == 0) {
    alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions

function apiGetName() {
  contract.methods.name().call().then( function( name ) { 
    console.log("Name: ", name);
    document.getElementById('name').innerHTML = name;
  });    
}

function apiGetSymbol() {
  contract.methods.symbol().call().then( function( symbol ) { 
    console.log("Symbol: ", symbol);
    document.getElementById('symbol').innerHTML = symbol;
  });    
}

function apiGetDecimals() {
  contract.methods.decimals().call().then( function( decimals ) { 
    console.log("Decimals: ", decimals);
    document.getElementById('decimals').innerHTML = decimals;
  });    
}

function apiGetTotalSupply() {
  contract.methods.totalSupply().call().then( function( totalSupply ) { 
    console.log("Total Supply: ", totalSupply);
    document.getElementById('totalSupply').innerHTML = totalSupply;
  });    
}

function apiGetBalanceOf() {
  info = $("#owner").val();
  if ($("#owner").val()=="") {
    showAlert2("Informe o Endereço", "alert alert-danger", "#alert_placeholder");
  } else {
    try {
      contract.methods.balanceOf(info).call().then( function( balanceOf ) {
        console.log("Balance Of: ", balanceOf); 
        showAlert2(`Balance Of: ${balanceOf} FIT`, "alert alert-success", "#alert_placeholder");
      });
    } catch(err) {
      console.error(err.message);
      showAlert2(`Erro: ${err.message}`, "alert alert-danger", "#alert_placeholder");
    }
  }
  $("#owner").val('');
}

function apiGetAllowance() {
  owner = $("#owner1").val();
  spender = $("#spender").val();
  if ($("#owner1").val()=="" || $("#spender").val()=="" ) {
    showAlert2("Informe o Endereço", "alert alert-danger", "#alert_placeholder2");
  } else {
    try {
      contract.methods.allowance(owner, spender).call().then( function( allowance ) {
        showAlert2(`Allowance: ${allowance}`, "alert alert-success", "#alert_placeholder2");
      });
    } catch(err) {
      console.error(err.message);
      showAlert2(`Erro: ${err.message}`, "alert alert-danger", "#alert_placeholder2");
    }
    
  }
  $("#owner1").val('');
  $("#spender").val('');
}

function apiMint() {
  addrto = $("#mintto").val();
  value = $("#value").val();
  if ($("#mintto").val()=="" || $("#value").val()=="" ) {
    showAlert2("Informe o endereço e o valor", "alert alert-danger", "#alert_placeholder3");
  } else {
    try {
      contract.methods.mint(addrto, value).send( {from: account} ).then( function(tx) { 
        console.log("Transaction: ", tx); 
        showAlert2("Tx realizada com sucesso", "alert alert-success", "#alert_placeholder3");
      });
    } catch(err) {
        console.error(err.message);
        showAlert2(`Erro: ${err.message}`, "alert alert-danger", "#alert_placeholder3");
    }
  }
  
  $("#mintto").val('');
  $("#value").val('');
}

function apiIncreaseAllowance() {
  addrSpender = $("#addrspender").val();
  valueSpender = $("#valuespender").val();
  if ($("#addrspender").val()=="" || $("#valuespender").val()=="" ) {
    showAlert2("Informe o endereço e o valor", "alert alert-danger", "#alert_placeholder4");
  } else {
    try {
      contract.methods.increaseAllowance(addrSpender, valueSpender).send( {from: account} ).then( function(tx) { 
        console.log("Transaction: ", tx); 
        showAlert2("Tx realizada com sucesso", "alert alert-success", "#alert_placeholder4");
      });
    } catch(err) {
      console.error(err.message);
      showAlert2(`Erro: ${err.message}`, "alert alert-danger", "#alert_placeholder4");
    }
  }
  
  $("#addrspender").val('');
  $("#valuespender").val('');
}

function apiDecreaseAllowance() {
  addrSpenderDecr = $("#addrspenderdecr").val();
  valueSpenderDecr = $("#valuedecrease").val();
  if ($("#addrSpenderDecr").val()=="" || $("#valuedecrease").val()=="" ) {
    showAlert2("Informe o endereço e o valor", "alert alert-danger", "#alert_placeholder5");
  } else {
      try {
          contract.methods.decreaseAllowance(addrSpenderDecr, valueSpenderDecr).send( {from: account} ).then( function(tx) { 
          console.log("Transaction: ", tx); 
          showAlert2("Tx realizada com sucesso", "alert alert-success", "#alert_placeholder5");
        });
      } catch(err) {
        console.error(err.message);
        showAlert2(`Erro: ${err.message}`, "alert alert-danger", "#alert_placeholder5");
      }
  }
  
  $("#addrspenderdecr").val('');
  $("#valuedecrease").val('');
}

function apiTransfer() {
  trfAddr = $("#trfadd").val();
  trfValue = $("#trfvalue").val();
  if ($("#trfadd").val()=="" || $("#trfvalue").val()=="" ) {
    showAlert2("Informe o endereço e o valor", "alert alert-danger", "#alert_placeholder6");
  } else {
      try {
        contract.methods.mint(trfAddr, trfValue).send( {from: account} ).then( function(tx) { 
          console.log("Transaction: ", tx); 
          showAlert2("Tx realizada com sucesso", "alert alert-success", "#alert_placeholder6");
        });
      } catch(err) {
        console.error(err.message);
        showAlert2(`Erro: ${err.message}`, "alert alert-danger", "#alert_placeholder6");
    }
  }
  
  $("#trfadd").val('');
  $("#trfvalue").val('');
}

function apiApprove() {
  addrSpenderAp = $("#addrspenderap").val();
  valueSpenderAp= $("#valuespenderap").val();
  if ($("#addrspenderap").val()=="" || $("#valuespenderap").val()=="" ) {
    showAlert2("Informe o endereço e o valor", "alert alert-danger", "#alert_placeholder7");
  } else {
      try {
        contract.methods.approve(addrSpenderAp, valueSpenderAp).send( {from: account} ).then( function(tx) { 
          console.log("Transaction: ", tx); 
          showAlert2("Tx realizada com sucesso", "alert alert-success", "#alert_placeholder7");
        });
      } catch(err) {
        console.error(err.message);
        showAlert2(`Erro: ${err.message}`, "alert alert-danger", "#alert_placeholder7");
    }
  }
  $("#addrspenderap").val('');
  $("#valuespenderap").val('');
}

function apiTransferFrom() {
  addrFrom = $("#from").val();
  addrTo = $("#to").val();
  valueTo= $("#valueto").val();
  if ($("#from").val()=="" || $("#to").val()=="" || $("#valueto").val()=="" ) {
    showAlert2("Informe o endereços e o valor", "alert alert-danger", "#alert_placeholder8");
  } else {
      try {
        contract.methods.transferFrom(addrFrom, addrTo, valueTo).send( {from: account} ).then( function(tx) { 
          console.log("Transaction: ", tx); 
          showAlert2("Tx realizada com sucesso", "alert alert-success", "#alert_placeholder8");
        });
      } catch(err) {
        console.error(err.message);
        showAlert2(`Erro: ${err.message}`, "alert alert-danger", "#alert_placeholder8");
    }
  }
  
  $("#from").val('');
  $("#to").val('');
  $("#valueto").val('');
}

function showAlert2( message, alerttype, alert_placeholder ) {
  console.log(alert_placeholder);
  $(alert_placeholder).append('<div id="alertdiv" class="alert ' +  alerttype + '"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')

  setTimeout( function() {
      $("#alertdiv").remove();
  }, 4000 );

}
