import { readFileSync } from "node:fs";

// Todos os IDs dos 169 itens do briefing oficial
const ALL_IDS = [
  // Bloco 1
  "18wtZkFBS-mvbU3XM7F8qgVbLOAsQDjWx","1QC_E3K8JZpIv45v5JkAkEG5y6-E1jaDO","1dGy5W2x3Np_iD7xJ2Wmm3CQ9m8kFLtYY",
  "1S93lN_dWRScKKxcYEnWILbGcjx5lU03u","1U69kizHRKUHQ4LtR6rUg9jv2WwX3Q6XV","1uOyB9YHBRrD64O_39hMIH2p9kOnS9CbR",
  "123XK57JaKszVWV6npGF30YVM5XUbc-Iu","1cAVrrpyRZb-y4trjCxPTVphnJBAtHJ6m","1ADl070mYUEOd0iuRRzBqz0EZ0Ez_EutS",
  "1sA4wWma1QWDyxDvtGjLYKFtAMNgk3pK2","1yiugYbI92ooB_V74-QIKyV8kWYCxUIVW","1AKqf3axDmXzZkD860gbk5RRGJTBEx4RZ",
  "184JvF0bNUGKTXOOTvtCjkOtOLWhEaUIm","1j5uFpg1WKmyLn9mkdcptjusPlPR12pTj","1h1l2WusBNmC3BSGvhBHMIFC7uJsmR7-m",
  "1-nn6vy6CGFW-GlN7HoROpl9QJ1oC1FHQ","1DCccai841y-wtRZcZuEXpnRH5L105TlN","1ytJCFfigl5pUj23s7sfGdbc5jnPdjRTV",
  "1Knx923i8hSTpnrVbrlDhKHyO2rKTlz0z","1OUpYtcFezjUSrd80RKHvSf1t2Nfznm0b","1c_OkCIDNDJekoiV2nwVRBckS5xbgVlAE",
  "1SKJx60YyQY-yVPME4qMrNc8pbDzvtKA3","1AUaTLqmR2cYqKS3-GnMNJDeMfzul-_gH","1CwTnLx62ULfhadB3EVsIhzcmd46dZya_",
  "1w_CkAQfb5as_jkGWEsIjVh_XJ4WBEWd5","1QkyUopBQYa03l9xo4E90y6anGkpf270C","1Wy2wVZERXA9T-YQe3UpMHECqZScc0wvX",
  "12SPyIjYF4v1KZ48KgC_2LwETs9WIAuTU","1N6cZwGT1T8S9xERjgAui7iMgy7rHD4Wa","1-IiiSA3XWBnJl1e2bLOQSvm3XUmWwkPa",
  "1z1AGE6iQ9jHx1P84sfGKyPawK0ILVh11","1rLUeCMI2bBR5xAn_kIf_JQreLYvv7oeD","1xPnPlQmnfMvFb3xCkYwyIpPk_U0m4Gz4",
  "1iFIzgPfQkqfsnkBOghaQTFEfntUD04RA","1FC9famY49RebyM9bLLDCbsUOuEwfCOU_","1VQR7EozcGPIBBqq4gAKItiSqxbCHRulb",
  "1pK1X8fneWpTNBKYvaWxdiDNZx7J0NZLU","165dhPYUf1sM_bvmbMrca6rJkg4hFg6xU","10WfbMqDswvF92BbdaeLAUtf5yKf8Wgau",
  "1YaaAtzqQ7vJS-kyOoDNxncPObGJSjWib","1_aMF1Z67p1yKiTCNsChpyOgApfQCDPNA","1ipYeWNXyuqCgvOfu4q4W7q7_M0r2QwIu",
  "1ynA5iStd21b5xQMn8HvcHpnR-HLFJogP","1wnbP-dzN8nQPCbIb0-PBMRoQWnBphecm","1SssoWmLpkkfjqaXiKhrOsUBPWe0_8AV2",
  // Bloco 1 (vídeo extra pet fofinho)
  "1rxwoYn6gUrcoZv0KoTZvCxiis4v4fh86",
  // Bloco 2
  "18n7W_fWz90GFtPHASctpIrosQGAp-a2M","1_EiXGKKzO0jhm81pB1n-YGUQZHJ5AdhU","1HA20x-esdTrBIeecU1G5I5Q5ys5ntElb",
  "1J6lLhsZ3O2cbNjKyxY08Ruaq9Bx5L8De","1Kj0_saL9mbL6uUlpImVuh9PvNxBkusBF","1SBuStB6zl87wqvIgMWAc3n3acQi37GIG",
  "1I3wzRhuA5i-v3o0EzJnwdL2zOXE0X1eY","13wAPwUtP7TBBiClP0lVNOTEH3wt8rrTg","1HcSfIZPzg6CXXhIn4lkDPX_5F2zEHtx4",
  "1K3dd_0QHu0vs4_80fXYAuPVB7OanLQ4G","1CULQ0-Ue3V6iREe7kt3ZM6ceKAO5jK84","12XzmvM21ZkFmA-DRIP0U1orUkba7Ysf1",
  "1wezEPhPUyCnzeO4vLauE1bMvyehJQ1AL","1D5erDRqOGeHyKpgmmuVNA1AR1GSVgN4K","1Bs5Etk8srt2rxKhcrPbO77TzBtF58oU6",
  "1PbulpryNwkN_ZNxmWxKQkZ6uHUrCWTk9","1RQCiegLthQPgRZqUUHANPnUh4CMHgjnY","1kFpbcKml0WL1rj9F7RGa_peBqktcCGgF",
  "1_oFTT6uy4DgR_21TtAPXqeQ-K1f-UdKp","1KYexM_A8o2Zg1G_JuMH45algGcK1QxeG","1mPyMFMgOQi4oFpZaCYFPYMVUuqeH3eWJ",
  "1uTVtQIGuWWsRdDDPDEFY1znk2sOT9MZv","17A7R_-d1ZWD9g5RsrMuz-TICrYKunHgR","1YHAw6bC0UZDaPUTiGtPbLZ0oOD7j-fO1",
  "1TMpZ9dJ2JPAziY3-UAjxRuiAEDQs3CLw","1QFPikD2wC8hpynDa2bJepbYfH8d5yNqS","1wHtxJ1SkSNkalCPlgFyfIihbi3pmn94t",
  "1aitDkSHdJbvK5V3nVrSVzYWXDcQwqZPZ","1FD0DxnmoOgMfFqg0S72iWj3fdDwM8SpD","1FiRZhpnqmQF8gEadhyjGhwIq-G-P6-pb",
  "1eqNXaKiOdGCEVHuMAeeAJLYN-Fb1SBTY","1goeZM_SY8jvAM7IvpcwyTG0_AlpMpF-q","1kKtZgbr84ExBy6oRD8ZObFL0cWhqURgp",
  "1kO4XVkAbV7SPiLnFbvqhYMZVqF6OTkGt","1y20QHzs72FTTP79YUZnAIVTojv8tF_gN","15szdqaoRWcwaH5XKrcllbYYc8BQZmDDt",
  "1qOfb5GzhntT0f-Psr3mPgFSIInmG6K-5","1bQFsQnRceV5b0QdYgKKamgFRgObLpMDl","1b2BrW3sFTIE6SJ8iMx7_bL_0TW6ptmAv",
  "1ETn_3CK8-glD7UrXfV-rFV4AHbCotcnS","1G1Y2_Dvmfcm1BEN0dArMInuNzOPAQd0n",
  // Bloco 3
  "1LrjsKfTt8ZubuJNmm_lP2JTGcRCvi4YF","1hsBH8mBiZxP3-T8_7jFv0w9ELRPj2oll","1rwGLdyiqGlT50KoU6zpFV3hFZtqp7kPG",
  "1mDEa6Ok4K7BUKnJbjodnj_kkCFxBObpQ","1ZpBu7sgWAOzMh0sKVcPFojE9bPpdnxvH","1QZhdiWH48vxB6TRhZFC8eKerd64_YRNL",
  "1IE7_l0Yz9lSWdtKbpcpyYHnOE3_1sLlr","1Z0-orvZrMv3HOmf5ENe4E_uXrI48OCue","1JiiYERFGvytWGbcM0FUSG2pM6o_bA_-g",
  "1nYX7Z-eGe-VpmxIk9izcOifFEicq0VZR","1ZgrFe20wAgNs4TEds8QRn-X8YgcN0_YS","1qsrCZN7ob8-Hf2guTXKv3Y6FlIK0W9_h",
  "1D2GCsw-NTWfA6D0bTRIRaFN7YNDw-cQwQ","1QhR8Ul5190L9-49XvbR-O3qAY1MehajK","1sH-WN3eRpMXHr1pPOfabuVaa1ozIbLCo",
  "1I1EEk6zm5LAUP5n-uv-oHa9tzFm3n_B4","1nPQy_9JO7yxr8alo1y_hVbSSLNnXD2XW","1XwqSBiPhPgrNZEan2MtRCFyFZSVSuB7Q",
  "1O_jJ_z0d3JvvaTCAP77lIA-RJuMkpdld","1SenoPHIjap1hdi7w0lkrxCbSHYLUN8SN",
  "1F5jUdXFy55R5ByW-PGSchLaJsqPkR3kc",
  "1UazlU_9TKX80UonQXtl3NknvqCIMMFrK","1QdQONblTIu78NDDbAl4WJiuMem1axhb6","1tKBmuFw-rSCV2rlHfEyHodNKLzVn60pG",
  "1NVv1qyRz8jL3nizEP8zKY2g4fFs73dQR","1SC2IlnKVxuU-nATDThbyZ2qaXLiI41Zr","1xHc0r9kAO-GTLpT9NxlscSbQDxF94UB6",
  "16ymmnKT5Ns8CnLeEJIDk5TH8wqNw71S6","16WHthJ1lPtgxe3RELNogeGN7OnGKpgsE","16-ZHLdqVrDpyZY_quo3iPyMl3vGyZadt",
  "1IkdeA1ZUZIxSkOm-yDfqtx7EIoSdZ_ZN","1kauB7lvG4CIpfakgQ9-6fuc9yQs-d4D4","1Zu45Oonkru0K6foW7mLTqUVJffVM5mel",
  "1VopPhWT7j8c6FNi4P7Ci6MCg0aJ0BHmr","19z4UQMq39gFPuqJNMQ_BJ21HeYCBAG_r","1tZMTAxZLINA25HVK0HsmBHIRuR6rirvk",
  "1ziBXp0xl91Yf-gEOjPoI3qZXEphQJTlT","1TFZkBghmEuXrMjZ4S6uOZPQn_61wX4My","1FEg26nZM58skvdnuq0q1oFnXamcH-3ua",
  "1j7ZcIeMuhF7qef9wmiutpEhde4dByfpw",
  "142eYoxZ_Dft0Q4Lxa6ts3Dq1rkGpTkFw",
  "1V0P0GFEEyvlb89VMIs8dsq58G9NQbwGj","10O0xkRMIJAwmhJ4ViMcnK2RKUbhi3FJG","1PbKYt84pfBYuXztNyqt_kjQ3fLmjz9rn",
  "1ZmlgPz6YL0i-A7o7338bktYPJAPQnjSg","15wMZwT6YDJvJZx0vjxcBRXBIr1PFSUtL","1vxSXWME9wrq60bQ29A0jFnwHJsJn1dM7",
  "12figTvE2qKK6QlY7SWwMR73NHnRXD2Mh","161ltzUW7sBnQ2IsreAsBRXHoITcExgib",
  "1CwrZiNnFiuZRByyryt7RAaj0_yqRLQow","1ssBgKzmG6QuACzWDewm0uQhAZdP-KJfW","1UWes0F0jyuOHDuZPvGEtx5sfiepH2rz1",
  "1vYcFnwrnmGtjGo4pNmitCibrkyeadCF0","1lJK1BnNKYhcSDSuh7wCyM8ZqjoOsFjfP","1zuBV9MjdX8hpS23v9jQxqDKh2iG3YOFv",
  "1Lw0E9M8oqQEH5csxIwBrAFkmSPeDJm_1","17Ij736MjY0f4uDWOa33DhCHrI_XO5i80","1ssXNCZH1aAGAwPdUje6eMH5vXZdi_kt9",
  "1pFgNDePbUCw25BMG3LK3H5G9v9j8lYFI","1OCTdg1i09LPz6pMY8R9Ozo6G7jWnfrGW",
  "1SF1Hhn06b1LbK_NW6z33IXvogeInXJxV",
  "1_thdCo-oySxk1R1mIj7l8tXetKmUsh0K","1gylo3Qwh37TERerDeUDX7C-m0Wq0s322",
  // Bloco 4
  "1nNKHNZElHsisJ5saFLKpCBI_yoH-dHIt","1Nxnrk4RFzj1GOyLnnCp42CBlJ_iGoDxR","1TtMr6IZwET96ZOYq2YyL7Zjv7YaWh8l1",
  "1OhLE9V1uveIufcPAiCcDKYfoN2_bqVLy","1GBWU8A0uTfVU8SA-1VF5nleVTOqBNtdL","12YLg3Y-S49gALNzgQWKbQ8M4BtCDGgUC",
  "1l_24exY3Dm8MRsyDFiAOm5Y2RIw2WoKi","1ywAQ3kTFhottZmsuswbydD4sj7NXbbvq","1F7Pc5AZFJGpG40nwdMad9O5A_r2jznCf",
  "1PnHdkIxKTH1zJH-nP3pbk9qJIbs29nf-","1w5J4if4gzgIKV2vIPpU52IZn_QMV_o9_","1hXK49cxnseUxKQUHAfXUwfdThTcbyOTS",
  "1Ep5MWA6Zy4DDDnzf2Kuzzfhaka3iht8r","14AwnJAXxjGmrmx5tRMajjtJOpapMXPx0",
  "16Jn39XdEElZhIf1qUuOB5w7KMnThk_Pm","1TujwJAEA-p3XR_jvhCsPUJPgBAfoAvkV",
  "15hxALN0Gj3DkbA02wORHI2uNVP3AqNvm","167__QsQzCef9ovxEDBuWXB4sLLWrd8wn",
  "1qJ2PBiT1YTO0_kFNiweW6bAXDloBgn3h"
];

const src = readFileSync("src/data/portfolio.ts", "utf8");
const referencedIds = new Set();
const re = /"([A-Za-z0-9_-]{25,})"/g;
let m;
while ((m = re.exec(src)) !== null) {
  const id = m[1];
  if (id.length === 33) referencedIds.add(id);
}

console.log("Total de IDs oficiais no inventário:", ALL_IDS.length);
console.log("IDs de 33 chars referenciados no portfolio.ts:", referencedIds.size);

const missing = ALL_IDS.filter((id) => !referencedIds.has(id));
console.log("\nIDs FALTANDO no portfolio.ts:", missing.length);
missing.forEach((id) => console.log(" -", id));

// Também verificar IDs que estão no portfolio mas não estão no inventário (ex: nada)
const unknown = [...referencedIds].filter((id) => !ALL_IDS.includes(id));
console.log("\nIDs extras no portfolio (não listados no briefing):", unknown.length);
unknown.forEach((id) => console.log(" -", id));
