/* eslint-disable @typescript-eslint/ban-types */
import { BASE_URL, PRODUCTS } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import type { LiquidSymbol } from '@/shared/types/currency'
import type { PublicAPI, Reviver } from '@/shared/types/fetch'

import { join } from 'path'

import type {
  XRP,
  MCO,
  FDX,
  TPT,
  IXT,
  SAL,
  SER,
  ECH,
  GAT,
  SNIP,
  STAC,
  MGO,
  BTRN,
  ADH,
  ALX,
  LND,
  FLP,
  ZPR,
  UBT,
  FTT,
  MITH,
  ONT,
  CMCT,
  KRL,
  GET,
  WIN,
  CRPT,
  DACS,
  DRG,
  TPAY,
  FSN,
  ETN,
  AMLT,
  MRK,
  IHF,
  _1WO,
  ENJ,
  PPL,
  XNK,
  GEN,
  HOT,
  MT,
  UKG,
  SPHTX,
  MTN,
  GZE,
  CAN,
  SIX,
  IPSX,
  LIKE,
  MITX,
  DENT,
  RSV,
  SGR,
  COMP,
  UNI,
  CEL,
  EGLD,
  CLRX,
  SAND,
  ALBT,
  FIO,
  VI,
  AMN,
  XCF,
  BTC,
  GYEN,
  TRX,
  DIA,
  LINK,
  TMTG,
  DOT,
  QBZ,
  AAVE,
  NEO,
  XPR,
  USDT,
  ZUSD,
  VIDYX,
  VIDY,
  FLIXX,
  XSGD,
  XDC,
  SSX,
  SPDR,
  BFC,
  PCI,
  BAT,
  GXT,
  XNO,
  HBAR,
  XKI,
  IDH,
  DEXA,
  CTK,
  NDAU,
  MARX,
  LPT,
  LTX,
  CRT,
  RFOX,
  DOGE,
  MTL,
  DAG,
  ZIL,
  TON,
  ASM,
  PERI,
  GZIL,
  ZWAP,
  WEMIX,
  ETH,
  PAR,
  USDC,
  USD,
  REDI,
  MIMO,
  FUSE,
  KSM,
  XLM,
  BIFI,
  MVL,
  DASH,
  ATOM,
  DS,
  BAAS,
  EWT,
  GATE,
  ABEY,
  POWR,
  USDS,
  ANW,
  ABBC,
  CPH,
  SHX,
  CUDOS,
  MKR,
  XTZ,
  SNX,
  RSR,
  QTUM,
  QASH,
  ETC,
  VET,
  ETH3S,
  PWV,
  BRC,
  STACS,
  ORBS,
  MNR,
  TFT,
  BTC3L,
  ETH3L,
  BTC3S,
  WOM,
  KMD,
  REN,
  BCH,
  PPP,
  RIF,
  BTCV,
  MIOTA,
  LCX,
  BTCSHORT,
  LTC,
  FLEX,
  CHI,
  KLAY,
  ANCT,
  ILK,
  FCT,
  OAX,
  XPT,
  WABI,
  OMG,
  MTC,
  ZEC,
  ARE,
  HYDRO,
  COT,
  PMA,
  CIM,
  ROOBEE,
  RBTC,
  TEM,
  THX,
  STORJ,
  NII,
  XEM,
  WLO,
  GOM2,
  XMR
} from 'cryptocurrency-types'

type ProductOptions = {
  id: string
}

type SymbolUnit =
  | 'S$'
  | 'HK$'
  | 'AU$'
  | '€'
  | '$'
  | '¥'
  | 'Rp'
  | 'Ꝗ'
  | '฿'
  | 'Ξ'
  | '₹'
  | '₱'
  | XRP
  | MCO
  | FDX
  | TPT
  | IXT
  | SAL
  | SER
  | ECH
  | GAT
  | SNIP
  | STAC
  | MGO
  | BTRN
  | ADH
  | ALX
  | LND
  | FLP
  | ZPR
  | UBT
  | FTT
  | MITH
  | ONT
  | CMCT
  | KRL
  | FLIXX
  | GET
  | WIN
  | CRPT
  | IDH
  | DACS
  | DRG
  | TPAY
  | FSN
  | ETN
  | AMLT
  | MRK
  | IHF
  | _1WO
  | ENJ
  | PPL
  | XNK
  | GEN
  | HOT
  | MT
  | UKG
  | SPHTX
  | MTN
  | GZE
  | CAN
  | SIX
  | IPSX
  | LIKE
  | MITX
  | DENT

type BaseCurrency =
  | RSV
  | SGR
  | COMP
  | UNI
  | CEL
  | EGLD
  | CLRX
  | SAND
  | ALBT
  | FIO
  | VI
  | AMN
  | XCF
  | BTC
  | GYEN
  | TRX
  | DIA
  | LINK
  | TMTG
  | DOT
  | QBZ
  | AAVE
  | NEO
  | XPR
  | USDT
  | ZUSD
  | VIDYX
  | VIDY
  | FLIXX
  | XSGD
  | XDC
  | SSX
  | SPDR
  | BFC
  | PCI
  | BAT
  | GXT
  | XNO
  | HBAR
  | XKI
  | IDH
  | DEXA
  | CTK
  | NDAU
  | MARX
  | LPT
  | LTX
  | CRT
  | RFOX
  | DOGE
  | MTL
  | DAG
  | ZIL
  | TON
  | ASM
  | PERI
  | GZIL
  | ZWAP
  | WEMIX
  | ETH
  | PAR
  | USDC
  | USD
  | REDI
  | MIMO
  | FUSE
  | KSM
  | XLM
  | BIFI
  | MVL
  | DASH
  | ATOM
  | DS
  | BAAS
  | EWT
  | GATE
  | ABEY
  | POWR
  | USDS
  | ANW
  | ABBC
  | CPH
  | SHX
  | CUDOS
  | MKR
  | XTZ
  | SNX
  | XRP
  | RSR
  | QTUM
  | QASH
  | ETC
  | VET
  | MCO
  | FDX
  | TPT
  | IXT
  | SAL
  | SER
  | ECH
  | GAT
  | ETH3S
  | SNIP
  | STAC
  | MGO
  | BTRN
  | ADH
  | ALX
  | PWV
  | LND
  | BRC
  | FLP
  | ZPR
  | UBT
  | FTT
  | MITH
  | ONT
  | STACS
  | ORBS
  | HOT
  | MNR
  | TFT
  | BTC3L
  | ETH3L
  | BTC3S
  | LIKE
  | WOM
  | KMD
  | REN
  | CMCT
  | BCH
  | PPP
  | KRL
  | RIF
  | GET
  | WIN
  | BTCV
  | CRPT
  | MIOTA
  | LCX
  | BTCSHORT
  | DACS
  | LTC
  | FLEX
  | DRG
  | TPAY
  | CHI
  | KLAY
  | FSN
  | ETN
  | AMLT
  | ANCT
  | MRK
  | IHF
  | _1WO
  | ILK
  | FCT
  | ENJ
  | OAX
  | XPT
  | WABI
  | PPL
  | XNK
  | OMG
  | MTC
  | ZEC
  | GEN
  | ARE
  | MT
  | UKG
  | SPHTX
  | MTN
  | GZE
  | CAN
  | HYDRO
  | COT
  | PMA
  | CIM
  | ROOBEE
  | RBTC
  | SIX
  | TEM
  | IPSX
  | MITX
  | THX
  | STORJ
  | NII
  | XEM
  | WLO
  | GOM2
  | XMR
  | DENT

type ProductData = {
  id: string
  product_type: 'CurrencyPair' | (string & {})
  code: 'CASH' | (string & {})
  name: string
  market_ask: number
  market_bid: number
  indicator: number
  currency: LiquidSymbol & (string & {})
  currency_pair_code: string
  symbol: null | SymbolUnit | (string & {})
  btc_minimum_withdraw: null
  fiat_minimum_withdraw: null
  pusher_channel: string
  taker_fee: number
  maker_fee: number
  low_market_bid: number
  high_market_ask: number
  volume_24h: number
  last_price_24h: number
  last_traded_price: number
  last_traded_quantity: number
  quoted_currency: LiquidSymbol & (string & {})
  base_currency: BaseCurrency & (string & {})
  tick_size: number
  disabled: boolean
  margin_enabled: boolean
  cfd_enabled: boolean
  perpetual_enabled: boolean
  last_event_timestamp: Date
  timestamp: Date
}

type ProductResponse = ProductData

const reviver: Reviver = (key, value) => {
  if (
    [
      'taker_fee',
      'maker_fee',
      'low_market_bid',
      'high_market_ask',
      'volume_24h',
      'last_price_24h',
      'last_traded_price',
      'last_traded_quantity',
      'tick_size'
    ].includes(key) &&
    typeof value === 'string'
  ) {
    return Number(value)
  }

  if (
    ['last_event_timestamp', 'timestamp'].includes(key) &&
    typeof value === 'string'
  ) {
    return new Date(Number(value) * 1000)
  }

  return value
}

const fetchProduct: PublicAPI<ProductOptions, ProductResponse> = (
  { id },
  init
) => {
  const url = new URL(join(PRODUCTS, id), BASE_URL)

  return jsonFetch(url, init, {
    parseJson: reviver
  })
}

export { fetchProduct }

export type { ProductData, ProductOptions, ProductResponse, SymbolUnit }
