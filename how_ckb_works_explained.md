# How CKB Works 

## Imagine a Toy Storage Town

Think of CKB like a giant toy storage town.

- The town has many toy boxes.
- Each box can hold toys and a note.
- In CKB, these boxes are called **Cells**.

Now imagine the town uses special coins called **CKBytes**.

- CKBytes are like "storage tickets".
- More CKBytes means more space you can use in the town.
- So CKBytes are both money and storage space.

---

## What Is a Cell?

A **Cell** is one box in the storage town.

A Cell has:

1. **Capacity** (how much space it has, measured with CKBytes)
2. **Lock Script** (the lock and key rule: who can open/spend it)
3. **Type Script** (optional extra rule: what this box is allowed to do)
4. **Data** (the information inside)

### Minimum size rule

Every Cell needs enough CKBytes to exist, like paying for shelf space.

- The smallest practical Cell is about **61 CKBytes**.
- People often keep **62+ CKBytes** to leave room for transaction costs.

---

## Live Cell vs Dead Cell

Cells can be in two states:

- **Live Cell**: still available to use.
- **Dead Cell**: already used in a past transaction.

Important idea: You do **not edit** an old Cell.

Instead:

- You use (consume) a Live Cell.
- That old Cell becomes Dead.
- You create brand-new output Cells with updated values/data.

It is like cutting one big pizza into new slices. You do not "edit" the old slice. You make new slices.

---

## Big Real-Life Example: Sending CKBytes to a Friend

Let us use a simple story.

You have one Live Cell with **200 CKBytes**.
You want to send **100 CKBytes** to Alice.

### Step 1: Create transaction

You choose your 200-CKB Live Cell as input.

You make outputs:

- Output A: **100 CKBytes** locked to Alice
- Output B: **99.999 CKBytes** locked back to you (change)

The missing **0.001 CKBytes** is transaction fee.

So:

- Input total = 200
- Output total = 199.999
- Fee = 0.001

### Step 2: Sign transaction

You prove "I own this input Cell" by signing with your private key.

Private key is like your secret signature stamp.

### Step 3: Broadcast transaction

Your wallet sends the signed transaction to a CKB node.

### Step 4: Node validates

The node checks:

- Is input Cell really live?
- Is signature correct?
- Do script rules pass?
- Are capacities valid?
- Is fee acceptable?

### Step 5: Mempool waiting room

If valid, transaction goes to mempool (waiting room).

### Step 6: Miner confirms

A miner picks it, puts it in a block, and mines the block.

When block is accepted:

- Old 200-CKB Cell becomes **Dead**
- New 100-CKB Cell for Alice becomes **Live**
- New 99.999-CKB change Cell for you becomes **Live**

Now the transfer is done.

---

## What Are Scripts?

Scripts are little rule programs (like robot guards).

They decide whether a Cell can be used in a transaction.

### Two main script types

1. **Lock Script** (required)
- Says who can spend the Cell.
- Like a box lock that only the correct key can open.

2. **Type Script** (optional)
- Says how the Cell data can be used/changed.
- Like extra rules: "This box can only hold baseball cards".

---

## Script Parts in Simple Words

A script has 3 key fields:

1. **code_hash**
- "Which program code should run?"
- Like a fingerprint of the rule code.

2. **hash_type**
- "How do we find that code?"
- Like the method for finding the right rulebook shelf.

3. **args**
- "What custom values does this rule use?"
- Usually includes your public-key-hash identity.

---

## Most Common Lock Script on CKB

A famous default lock is:

`secp256k1_blake160_sighash_all`

Child-friendly meaning:

- `secp256k1`: math method used to verify signatures
- `blake160`: hashing method to shorten identity
- `sighash_all`: sign important transaction parts together

In plain words:

"Show a correct signature that matches the owner identity in this Cell."

If it matches, unlock is allowed.

---

## What Is CKB-VM?

**CKB-VM** is the machine that runs scripts.

Think of it like a strict game referee computer.

When transaction arrives, CKB-VM:

1. Loads script code
2. Loads needed Cell and witness data
3. Runs script logic
4. Checks result code

Result rule:

- Return `0` = pass
- Return non-zero = fail

If any required script fails, transaction is rejected.

---

## What Is Witness?

Witness is extra proof data carried by transaction.

It often includes signatures.

Like bringing your school ID card to prove a locker is yours.

---

## What Are Cycles?

Cycles are "compute energy points".

Every instruction the VM runs costs cycles.

Why this matters:

- Prevents never-ending scripts (infinite loops)
- Keeps blocks fair and processable

CKB sets a block-wide limit called `max_block_cycles`.

So one block cannot contain too much total script work.

Important detail:

- Limit is on total cycles in a block.
- A transaction can be heavy, but the whole block must stay under the cap.

---

## Why CKB Design Is Smart

1. **Safe ownership**
- Only correct signatures can spend locked Cells.

2. **Clear state changes**
- Old Cells die, new Cells are created. Easy to track state.

3. **Flexible rules**
- Scripts can represent many app types, not only simple payments.

4. **Storage economy**
- CKBytes represent real on-chain storage capacity.

---

## Super Short Memory Trick

Remember CKB as:

- **C**ells are boxes
- **K**eys unlock boxes (lock scripts + signatures)
- **B**locks record old boxes dying and new boxes being born

If you understand that one sentence, you already understand the heart of CKB.

---

## Tiny Glossary

- **Cell**: a box on blockchain
- **Live Cell**: an unused box you can spend
- **Dead Cell**: an already used box
- **Transaction**: action that consumes old boxes and creates new boxes
- **Lock Script**: ownership rule (who can spend)
- **Type Script**: behavior rule (how data can be used)
- **Witness**: proof data (like signatures)
- **CKB-VM**: script referee computer
- **Cycles**: compute cost points

---

If you want, I can also create a second file with comic-style diagrams (ASCII drawings) showing the full "200 -> 100 + 99.999 + fee" flow visually.
