/* eslint-disable @typescript-eslint/ban-types */
import { BASE_URL } from "./constants.ts";
import type { LiquidSymbol } from "./types.ts";
import { jsonFetch, Reviver } from "./_utils.ts";

import { isString, join } from "../deps.ts";

import type {
  _1WO,
  AAVE,
  ABBC,
  ABEY,
  ADH,
  ALBT,
  ALX,
  AMLT,
  AMN,
  ANCT,
  ANW,
  ARE,
  ASM,
  ATOM,
  BAAS,
  BAT,
  BCH,
  BFC,
  BIFI,
  BRC,
  BTC,
  BTC3L,
  BTC3S,
  BTCSHORT,
  BTCV,
  BTRN,
  CAN,
  CEL,
  CHI,
  CIM,
  CLRX,
  CMCT,
  COMP,
  COT,
  CPH,
  CRPT,
  CRT,
  CTK,
  CUDOS,
  DACS,
  DAG,
  DASH,
  DENT,
  DEXA,
  DIA,
  DOGE,
  DOT,
  DRG,
  DS,
  ECH,
  EGLD,
  ENJ,
  ETC,
  ETH,
  ETH3L,
  ETH3S,
  ETN,
  EWT,
  FCT,
  FDX,
  FIO,
  FLEX,
  FLIXX,
  FLP,
  FSN,
  FTT,
  FUSE,
  GAT,
  GATE,
  GEN,
  GET,
  GOM2,
  GXT,
  GYEN,
  GZE,
  GZIL,
  HBAR,
  HOT,
  HYDRO,
  IDH,
  IHF,
  ILK,
  IPSX,
  IXT,
  KLAY,
  KMD,
  KRL,
  KSM,
  LCX,
  LIKE,
  LINK,
  LND,
  LPT,
  LTC,
  LTX,
  MARX,
  MCO,
  MGO,
  MIMO,
  MIOTA,
  MITH,
  MITX,
  MKR,
  MNR,
  MRK,
  MT,
  MTC,
  MTL,
  MTN,
  MVL,
  NDAU,
  NEO,
  NII,
  OAX,
  OMG,
  ONT,
  ORBS,
  PAR,
  PCI,
  PERI,
  PMA,
  POWR,
  PPL,
  PPP,
  PWV,
  QASH,
  QBZ,
  QTUM,
  RBTC,
  REDI,
  REN,
  RFOX,
  RIF,
  ROOBEE,
  RSR,
  RSV,
  SAL,
  SAND,
  SER,
  SGR,
  SHX,
  SIX,
  SNIP,
  SNX,
  SPDR,
  SPHTX,
  SSX,
  STAC,
  STACS,
  STORJ,
  TEM,
  TFT,
  THX,
  TMTG,
  TON,
  TPAY,
  TPT,
  TRX,
  UBT,
  UKG,
  UNI,
  USD,
  USDC,
  USDS,
  USDT,
  VET,
  VI,
  VIDY,
  VIDYX,
  WABI,
  WEMIX,
  WIN,
  WLO,
  WOM,
  XCF,
  XDC,
  XEM,
  XKI,
  XLM,
  XMR,
  XNK,
  XNO,
  XPR,
  XPT,
  XRP,
  XSGD,
  XTZ,
  ZEC,
  ZIL,
  ZPR,
  ZUSD,
  ZWAP,
} from "../deps.ts";

const PRODUCTS = "products";

type ProductOptions = {
  id: string;
};

type SymbolUnit =
  | "S$"
  | "HK$"
  | "AU$"
  | "€"
  | "$"
  | "¥"
  | "Rp"
  | "Ꝗ"
  | "฿"
  | "Ξ"
  | "₹"
  | "₱"
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
  | DENT;

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
  | DENT;

type ProductData = {
  id: string;
  product_type: "CurrencyPair" | (string & {});
  code: "CASH" | (string & {});
  name: string | null;
  market_ask: number | null;
  market_bid: number | null;
  indicator: number | null;
  currency: LiquidSymbol & (string & {});
  currency_pair_code: string;
  symbol: null | SymbolUnit | (string & {});
  btc_minimum_withdraw: null;
  fiat_minimum_withdraw: null;
  pusher_channel: string;
  taker_fee: number;
  maker_fee: number;
  average_price: number;
  low_market_bid: number | null;
  high_market_ask: number | null;
  volume_24h: number | null;
  last_price_24h: number | null;
  last_traded_price: number | null;
  last_traded_quantity: number | null;
  quoted_currency: LiquidSymbol & (string & {});
  base_currency: BaseCurrency & (string & {});
  tick_size: number;
  disabled: boolean;
  margin_enabled: boolean;
  cfd_enabled: boolean;
  perpetual_enabled: boolean;
  last_event_timestamp: Date;
  timestamp: Date;
};

type ProductResponse = ProductData;

const reviver: Reviver = (key, value) => {
  if (
    [
      "taker_fee",
      "maker_fee",
      "low_market_bid",
      "high_market_ask",
      "volume_24h",
      "last_price_24h",
      "last_traded_price",
      "last_traded_quantity",
      "tick_size",
      "average_price",
    ].includes(key) && isString(value)
  ) {
    return Number(value);
  }

  if (
    ["last_event_timestamp", "timestamp"].includes(key) &&
    isString(value)
  ) {
    return new Date(Number(value) * 1000);
  }

  return value;
};

export function fetchProduct(
  { id }: ProductOptions,
  init?: RequestInit,
): Promise<ProductResponse> {
  const url = new URL(join(PRODUCTS, id), BASE_URL);

  return jsonFetch(url.toString(), init, {
    parseJson: reviver,
  });
}

export type { ProductData, ProductOptions, ProductResponse, SymbolUnit };
export { reviver };
