
function openClaim() {
  // check is owner

  // check superchat status
  // check reply validity
  // compute nextNounce
  // sign superChat mutation with nonce and parameters of whitdrawal
}

function executeClaim () {
  // check is owner

  // check nonce on superchat at commit#2
  // check transaction status on chain

  
  
  // if superChat has commit #2, then return
  // (check reply has content up to limit set on superchat config)
  // check master streamID match superChat one
  // check transaction nounce has not been used
  // sign withdraw (send transaction) to the creator address of the pkp
  // sign superChat second commit update

}

function closeClaim () {
  // can be called by bidder - 
  // will check if bid expired and if no claim transaction has been made 
  // then sign a transfer transaction back to the bidder of the corresponding amount
  // return a commit#3
  // 
  // can be the owner -
  // will check the claim transaction has been posted onchain and sign back a superchat stream update for commit#3
}