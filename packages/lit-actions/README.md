# Super Comm3nts

The creator open a PKP for SuperChats. The PKP has a set of defined lit actions. Each Lit action execution will validate integrity of actions authorized. the PKP is `mintGrantAndBurn`
The Lit action owns a set of streams and only sign streams mutations on certain conditions.

SuperChat creation flow :
The bidder creates a SuperChat message 
-> send an amount to the creator's PKP account with the streamID of the ceramic Post the superChat is for in the datas of the transaction.
-> call the lit action `registerSuperChat` that belongs to the PKP, will return a signed ceramic message by the pkp that is posted by the bidder on the network. `commit#1`

A SuperChat may only exists once for a specific transfer transaction hash.

Claim a superChat flow:
-> The creator write a reply and post it on the ceramic network.

**The next nonce of the transaction is assigned and added to the superChat stream in the second commit, thus keeping transaction usable only once on chain**
In the futur, in order to limit the number of atomic transactions one needs to make, it will be ideal to allow outside contract to control the bookeeping and batch withdrawals.

-> call the `claim` lit action on the pkp to retrieve the transfer signature and relay it to the corresponding chain.
The claimer need to provide a superchat streamId and a reply streamId. the claim action returns a signed transfer transaction of the corresponding eth amounnt.


---

Bidders open a question to a creator with an associated bounty, called a super-chat.
the following datas are associated to the master post in `content.data`: 
  ```
  type SuperChat = {
    oPostId: StreamID;
    chainId: CAIP2;
    txHash: string; // transaction hash of the bid, used to get amount to send
    amount: BigNumber; // for display purposes
    expirationBlock?: number; // if set, allow withdrawal of funds if current block height > expirationBlock
  }
  ```

SuperChats are submitted to a ceramic stream controlled by the pkp that guards writting into a superchat stream. 
The message is only signed if:
- the txHash amount as effectively been transfered to the PKP account.
- amount passed for display is matching.
- expirationBlock is in the futur, thus preventing data witholding.

---
An owner of the PKP

The creator needs to reply to the SuperChat in order to successfully claim the transaction amount. Once the data is recorded on ceramic, the creator trigger the pkp lit action for withdrawal. The action calls parameters are the following :
  ```
  function claim(StreamID): <TxHash>
  ```

The claim function should return a valid signed transaction.
We make the assumption the recipient of the superchat will post the signed transaction on chain and not call the claim function with the same streamId again, in order to avoid that security problem, we can implement a two step claim:
- `openClaim` will mutate the SuperChat datas by adding the reply CID and an openClaim status. can only be called once
- `validateClaim` will return 

The claim function check
- check caller is owner of pkp
- fetch the streamIDs of the replies,
  - for each reply, it fetches the master streamId at the first commit (prevent data re-writting of txHash).
  - check for inclusion into the SuperChat pkp's stream.
  - check for `expirationBlock < currentBlock`
  - retrieve txHash amount (double checking).
  - sign transfer transaction to  with `const amount = txHash amount - fees`.


Superchats are (lit-action + pkp) lit escrow based on datas that allow only two transactions:
- sending the pkp funds to the creator wallet. This is only possible if the creator provides the CID proving the pkp superchat has been answered.
- withdrawing the pkp funds to the bidder wallet. This is only possible if the creator provides the CID proving the pkp superchat has been answered.
