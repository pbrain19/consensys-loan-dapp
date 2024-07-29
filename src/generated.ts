import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Banker
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bankerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_stakableToken', internalType: 'address', type: 'address' },
      { name: '_lendableToken', internalType: 'address', type: 'address' },
      { name: '_loanAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'InvalidQueryRange' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'NotCompatibleWithSpotMints' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'SequentialMintExceedsLimit' },
  { type: 'error', inputs: [], name: 'SequentialUpToTooSmall' },
  { type: 'error', inputs: [], name: 'SpotMintTokenIdTooSmall' },
  { type: 'error', inputs: [], name: 'TokenAlreadyExists' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LOAN_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'addFunding',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'availableForLending',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        name: 'ownership',
        internalType: 'struct IERC721A.TokenOwnership',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lendableToken',
    outputs: [{ name: '', internalType: 'contract ERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'repay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakableToken',
    outputs: [
      { name: '', internalType: 'contract ERC721AQueryable', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'stop', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokensOfOwnerIn',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BasicNft
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const basicNftAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'InvalidQueryRange' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'NotCompatibleWithSpotMints' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'SequentialMintExceedsLimit' },
  { type: 'error', inputs: [], name: 'SequentialUpToTooSmall' },
  { type: 'error', inputs: [], name: 'SpotMintTokenIdTooSmall' },
  { type: 'error', inputs: [], name: 'TokenAlreadyExists' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        name: 'ownership',
        internalType: 'struct IERC721A.TokenOwnership',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'stop', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokensOfOwnerIn',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Usdc
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const usdcAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__
 */
export const useReadBanker = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"LOAN_AMOUNT"`
 */
export const useReadBankerLoanAmount = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'LOAN_AMOUNT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"availableForLending"`
 */
export const useReadBankerAvailableForLending =
  /*#__PURE__*/ createUseReadContract({
    abi: bankerAbi,
    functionName: 'availableForLending',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadBankerBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"explicitOwnershipOf"`
 */
export const useReadBankerExplicitOwnershipOf =
  /*#__PURE__*/ createUseReadContract({
    abi: bankerAbi,
    functionName: 'explicitOwnershipOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"explicitOwnershipsOf"`
 */
export const useReadBankerExplicitOwnershipsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: bankerAbi,
    functionName: 'explicitOwnershipsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadBankerGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadBankerIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: bankerAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"lendableToken"`
 */
export const useReadBankerLendableToken = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'lendableToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"name"`
 */
export const useReadBankerName = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadBankerOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"stakableToken"`
 */
export const useReadBankerStakableToken = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'stakableToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadBankerSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: bankerAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadBankerSymbol = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadBankerTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"tokensOfOwner"`
 */
export const useReadBankerTokensOfOwner = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'tokensOfOwner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"tokensOfOwnerIn"`
 */
export const useReadBankerTokensOfOwnerIn = /*#__PURE__*/ createUseReadContract(
  { abi: bankerAbi, functionName: 'tokensOfOwnerIn' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadBankerTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: bankerAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bankerAbi}__
 */
export const useWriteBanker = /*#__PURE__*/ createUseWriteContract({
  abi: bankerAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"addFunding"`
 */
export const useWriteBankerAddFunding = /*#__PURE__*/ createUseWriteContract({
  abi: bankerAbi,
  functionName: 'addFunding',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteBankerApprove = /*#__PURE__*/ createUseWriteContract({
  abi: bankerAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"borrow"`
 */
export const useWriteBankerBorrow = /*#__PURE__*/ createUseWriteContract({
  abi: bankerAbi,
  functionName: 'borrow',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"repay"`
 */
export const useWriteBankerRepay = /*#__PURE__*/ createUseWriteContract({
  abi: bankerAbi,
  functionName: 'repay',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteBankerSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: bankerAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteBankerSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: bankerAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteBankerTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: bankerAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bankerAbi}__
 */
export const useSimulateBanker = /*#__PURE__*/ createUseSimulateContract({
  abi: bankerAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"addFunding"`
 */
export const useSimulateBankerAddFunding =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bankerAbi,
    functionName: 'addFunding',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateBankerApprove = /*#__PURE__*/ createUseSimulateContract(
  { abi: bankerAbi, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"borrow"`
 */
export const useSimulateBankerBorrow = /*#__PURE__*/ createUseSimulateContract({
  abi: bankerAbi,
  functionName: 'borrow',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"repay"`
 */
export const useSimulateBankerRepay = /*#__PURE__*/ createUseSimulateContract({
  abi: bankerAbi,
  functionName: 'repay',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateBankerSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bankerAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateBankerSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bankerAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bankerAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateBankerTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bankerAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bankerAbi}__
 */
export const useWatchBankerEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bankerAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bankerAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchBankerApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bankerAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bankerAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchBankerApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bankerAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bankerAbi}__ and `eventName` set to `"ConsecutiveTransfer"`
 */
export const useWatchBankerConsecutiveTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bankerAbi,
    eventName: 'ConsecutiveTransfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bankerAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchBankerTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bankerAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__
 */
export const useReadBasicNft = /*#__PURE__*/ createUseReadContract({
  abi: basicNftAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadBasicNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: basicNftAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"explicitOwnershipOf"`
 */
export const useReadBasicNftExplicitOwnershipOf =
  /*#__PURE__*/ createUseReadContract({
    abi: basicNftAbi,
    functionName: 'explicitOwnershipOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"explicitOwnershipsOf"`
 */
export const useReadBasicNftExplicitOwnershipsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: basicNftAbi,
    functionName: 'explicitOwnershipsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadBasicNftGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: basicNftAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadBasicNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: basicNftAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"name"`
 */
export const useReadBasicNftName = /*#__PURE__*/ createUseReadContract({
  abi: basicNftAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadBasicNftOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: basicNftAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadBasicNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: basicNftAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadBasicNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: basicNftAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadBasicNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: basicNftAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"tokensOfOwner"`
 */
export const useReadBasicNftTokensOfOwner = /*#__PURE__*/ createUseReadContract(
  { abi: basicNftAbi, functionName: 'tokensOfOwner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"tokensOfOwnerIn"`
 */
export const useReadBasicNftTokensOfOwnerIn =
  /*#__PURE__*/ createUseReadContract({
    abi: basicNftAbi,
    functionName: 'tokensOfOwnerIn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadBasicNftTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: basicNftAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicNftAbi}__
 */
export const useWriteBasicNft = /*#__PURE__*/ createUseWriteContract({
  abi: basicNftAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteBasicNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: basicNftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"safeMint"`
 */
export const useWriteBasicNftSafeMint = /*#__PURE__*/ createUseWriteContract({
  abi: basicNftAbi,
  functionName: 'safeMint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteBasicNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: basicNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteBasicNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: basicNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteBasicNftTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: basicNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicNftAbi}__
 */
export const useSimulateBasicNft = /*#__PURE__*/ createUseSimulateContract({
  abi: basicNftAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateBasicNftApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicNftAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"safeMint"`
 */
export const useSimulateBasicNftSafeMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicNftAbi,
    functionName: 'safeMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateBasicNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateBasicNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateBasicNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link basicNftAbi}__
 */
export const useWatchBasicNftEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: basicNftAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link basicNftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchBasicNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: basicNftAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link basicNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchBasicNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: basicNftAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link basicNftAbi}__ and `eventName` set to `"ConsecutiveTransfer"`
 */
export const useWatchBasicNftConsecutiveTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: basicNftAbi,
    eventName: 'ConsecutiveTransfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link basicNftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchBasicNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: basicNftAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__
 */
export const useReadUsdc = /*#__PURE__*/ createUseReadContract({ abi: usdcAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadUsdcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadUsdcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadUsdcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"name"`
 */
export const useReadUsdcName = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadUsdcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadUsdcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__
 */
export const useWriteUsdc = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteUsdcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteUsdcMint = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteUsdcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteUsdcTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__
 */
export const useSimulateUsdc = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateUsdcApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateUsdcMint = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateUsdcTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateUsdcTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdcAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__
 */
export const useWatchUsdcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdcAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchUsdcApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdcAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchUsdcTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdcAbi,
    eventName: 'Transfer',
  })
