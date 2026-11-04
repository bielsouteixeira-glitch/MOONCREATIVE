export type MediaItem = {
  id: string;
  driveId: string;
  label: string;
  type: "image" | "video";
  ext?: string; // sugestão de extensão para vídeos
};

export type Project = {
  id: string;
  title: string;
  category:
    | "Redes Sociais"
    | "Campanhas Institucionais"
    | "Design Gráfico"
    | "Identidade Visual"
    | "E-mail Marketing"
    | "Materiais Promocionais e PDV"
    | "Comunicação Visual"
    | "Vídeos e Produções";
  description?: string;
  coverId: string;
  items: MediaItem[];
};

const img = (id: string, label: string): MediaItem => ({
  id,
  driveId: id,
  label,
  type: "image",
});
const vid = (id: string, label: string, ext = "mp4"): MediaItem => ({
  id,
  driveId: id,
  label,
  type: "video",
  ext,
});

/* ============================================================
   169 MÍDIAS — organizadas por projeto/categoria
   IDs conforme inventário oficial
============================================================ */

export const PROJECTS: Project[] = [
  /* ============ REDES SOCIAIS ============ */
  {
    id: "suprimed-instagram",
    title: "Suprimed — Posts de Instagram",
    category: "Redes Sociais",
    coverId: "1S93lN_dWRScKKxcYEnWILbGcjx5lU03u",
    items: [
      img("1S93lN_dWRScKKxcYEnWILbGcjx5lU03u", "Suprimed · capa"),
      img("18wtZkFBS-mvbU3XM7F8qgVbLOAsQDjWx", "Suprimed · post 8"),
      img("1QC_E3K8JZpIv45v5JkAkEG5y6-E1jaDO", "Suprimed · post 11"),
      img("1dGy5W2x3Np_iD7xJ2Wmm3CQ9m8kFLtYY", "Suprimed · post 10"),
      img("1j5uFpg1WKmyLn9mkdcptjusPlPR12pTj", "Suprimed · post 2"),
      img("1h1l2WusBNmC3BSGvhBHMIFC7uJsmR7-m", "Suprimed · post 3"),
      img("1Knx923i8hSTpnrVbrlDhKHyO2rKTlz0z", "Suprimed · post 4"),
      img("1OUpYtcFezjUSrd80RKHvSf1t2Nfznm0b", "Suprimed · post 5"),
      img("1c_OkCIDNDJekoiV2nwVRBckS5xbgVlAE", "Suprimed · post 6"),
      img("1SKJx60YyQY-yVPME4qMrNc8pbDzvtKA3", "Suprimed · post 7"),
      img("1qJ2PBiT1YTO0_kFNiweW6bAXDloBgn3h", "Suprimed · post 9"),
    ],
  },
  {
    id: "posts-avulsos",
    title: "Posts institucionais e promocionais",
    category: "Redes Sociais",
    coverId: "165dhPYUf1sM_bvmbMrca6rJkg4hFg6xU",
    items: [
      img("165dhPYUf1sM_bvmbMrca6rJkg4hFg6xU", "Post Comercial"),
      img("10WfbMqDswvF92BbdaeLAUtf5yKf8Wgau", "CIPA · Trabalho em equipe"),
      img("1iFIzgPfQkqfsnkBOghaQTFEfntUD04RA", "Abandonar não é opção"),
      img("18n7W_fWz90GFtPHASctpIrosQGAp-a2M", "Campanha de Inverno Biovet"),
      img("1Kj0_saL9mbL6uUlpImVuh9PvNxBkusBF", "Informativo Leishmaniose"),
      img("1HcSfIZPzg6CXXhIn4lkDPX_5F2zEHtx4", "Arte Comercial"),
      img("1K3dd_0QHu0vs4_80fXYAuPVB7OanLQ4G", "Giardíase Lana"),
      img("1mPyMFMgOQi4oFpZaCYFPYMVUuqeH3eWJ", "Coleira Inteligente SOS Animal"),
      img("1uTVtQIGuWWsRdDDPDEFY1znk2sOT9MZv", "Agropet Simparic"),
      img("17A7R_-d1ZWD9g5RsrMuz-TICrYKunHgR", "Arte Colecionáveis"),
      img("1YHAw6bC0UZDaPUTiGtPbLZ0oOD7j-fO1", "Nova Arte Simparic Ectofend e Revolution"),
      img("1TMpZ9dJ2JPAziY3-UAjxRuiAEDQs3CLw", "Ação Simparic e Revolution Amigo Pet"),
      img("1QFPikD2wC8hpynDa2bJepbYfH8d5yNqS", "Pro Geart · Clínica Mundo dos Animais"),
      img("1aitDkSHdJbvK5V3nVrSVzYWXDcQwqZPZ", "Gel Mata Formigas"),
      img("1kKtZgbr84ExBy6oRD8ZObFL0cWhqURgp", "Premiação iFood · Suprifarma"),
      img("1kO4XVkAbV7SPiLnFbvqhYMZVqF6OTkGt", "Made Dog · Pro Heart"),
      img("1goeZM_SY8jvAM7IvpcwyTG0_AlpMpF-q", "Adotar é um gesto de amor e responsabilidade"),
    ],
  },
  {
    id: "setembro-amarelo",
    title: "Setembro Amarelo",
    category: "Campanhas Institucionais",
    coverId: "1ADl070mYUEOd0iuRRzBqz0EZ0Ez_EutS",
    items: [
      img("1ADl070mYUEOd0iuRRzBqz0EZ0Ez_EutS", "Capa"),
      img("1sA4wWma1QWDyxDvtGjLYKFtAMNgk3pK2", "Página 2"),
    ],
  },
  {
    id: "setembro-vermelho",
    title: "Setembro Vermelho",
    category: "Campanhas Institucionais",
    coverId: "1yiugYbI92ooB_V74-QIKyV8kWYCxUIVW",
    items: [
      img("1yiugYbI92ooB_V74-QIKyV8kWYCxUIVW", "Capa"),
      img("1U69kizHRKUHQ4LtR6rUg9jv2WwX3Q6XV", "Página 1"),
    ],
  },
  {
    id: "novembro-azul",
    title: "Novembro Azul",
    category: "Campanhas Institucionais",
    coverId: "1N6cZwGT1T8S9xERjgAui7iMgy7rHD4Wa",
    items: [
      img("1N6cZwGT1T8S9xERjgAui7iMgy7rHD4Wa", "Capa"),
      img("12SPyIjYF4v1KZ48KgC_2LwETs9WIAuTU", "Página 1"),
      img("1Wy2wVZERXA9T-YQe3UpMHECqZScc0wvX", "Página 2"),
    ],
  },
  {
    id: "zoonoses",
    title: "Zoonoses",
    category: "Campanhas Institucionais",
    coverId: "1cAVrrpyRZb-y4trjCxPTVphnJBAtHJ6m",
    items: [
      img("1cAVrrpyRZb-y4trjCxPTVphnJBAtHJ6m", "Capa"),
      img("123XK57JaKszVWV6npGF30YVM5XUbc-Iu", "Página 2"),
      img("1uOyB9YHBRrD64O_39hMIH2p9kOnS9CbR", "Página 3"),
    ],
  },
  {
    id: "doe-sangue",
    title: "Doe Sangue",
    category: "Campanhas Institucionais",
    coverId: "1VQR7EozcGPIBBqq4gAKItiSqxbCHRulb",
    items: [
      img("1VQR7EozcGPIBBqq4gAKItiSqxbCHRulb", "Capa"),
      img("1FC9famY49RebyM9bLLDCbsUOuEwfCOU_", "Página 1"),
      img("1rLUeCMI2bBR5xAn_kIf_JQreLYvv7oeD", "Página 2"),
      img("1xPnPlQmnfMvFb3xCkYwyIpPk_U0m4Gz4", "Página 3"),
    ],
  },
  {
    id: "frio-pulgas",
    title: "Frio · Pulgas e Carrapatos",
    category: "Campanhas Institucionais",
    coverId: "184JvF0bNUGKTXOOTvtCjkOtOLWhEaUIm",
    items: [
      img("184JvF0bNUGKTXOOTvtCjkOtOLWhEaUIm", "Capa"),
      img("1AKqf3axDmXzZkD860gbk5RRGJTBEx4RZ", "Página 2"),
    ],
  },
  {
    id: "pascoa",
    title: "Páscoa",
    category: "Redes Sociais",
    coverId: "1QkyUopBQYa03l9xo4E90y6anGkpf270C",
    items: [
      img("1QkyUopBQYa03l9xo4E90y6anGkpf270C", "Capa"),
      img("1CwTnLx62ULfhadB3EVsIhzcmd46dZya_", "Página 1"),
      img("1w_CkAQfb5as_jkGWEsIjVh_XJ4WBEWd5", "Página 2"),
      img("1AUaTLqmR2cYqKS3-GnMNJDeMfzul-_gH", "Página 3"),
    ],
  },
  {
    id: "namorados",
    title: "Dia dos Namorados",
    category: "Redes Sociais",
    coverId: "1ytJCFfigl5pUj23s7sfGdbc5jnPdjRTV",
    items: [
      img("1ytJCFfigl5pUj23s7sfGdbc5jnPdjRTV", "Capa"),
      img("1-nn6vy6CGFW-GlN7HoROpl9QJ1oC1FHQ", "Página 1"),
      img("1DCccai841y-wtRZcZuEXpnRH5L105TlN", "Página 2"),
    ],
  },
  {
    id: "halloween",
    title: "Halloween",
    category: "Redes Sociais",
    coverId: "1z1AGE6iQ9jHx1P84sfGKyPawK0ILVh11",
    items: [
      img("1z1AGE6iQ9jHx1P84sfGKyPawK0ILVh11", "Capa"),
      img("1-IiiSA3XWBnJl1e2bLOQSvm3XUmWwkPa", "Página 1"),
    ],
  },
  {
    id: "posts-genericos-1",
    title: "Posts diversos (conjunto 1)",
    category: "Redes Sociais",
    coverId: "1O_jJ_z0d3JvvaTCAP77lIA-RJuMkpdld",
    items: [
      img("1O_jJ_z0d3JvvaTCAP77lIA-RJuMkpdld", "post 1"),
      img("1SenoPHIjap1hdi7w0lkrxCbSHYLUN8SN", "post 2"),
      img("1sH-WN3eRpMXHr1pPOfabuVaa1ozIbLCo", "post 3"),
      img("1XwqSBiPhPgrNZEan2MtRCFyFZSVSuB7Q", "post 4"),
      img("1I1EEk6zm5LAUP5n-uv-oHa9tzFm3n_B4", "post 5"),
      img("1nPQy_9JO7yxr8alo1y_hVbSSLNnXD2XW", "post 6"),
      img("1QhR8Ul5190L9-49XvbR-O3qAY1MehajK", "post 7"),
      img("1D2GCsw-NTWfA6D0bTRIRaFN7YNDw-cQwQ", "post 8"),
      img("1qsrCZN7ob8-Hf2guTXKv3Y6FlIK0W9_h", "post 9"),
      img("1nYX7Z-eGe-VpmxIk9izcOifFEicq0VZR", "post 10"),
    ],
  },
  {
    id: "posts-genericos-2",
    title: "Posts diversos (conjunto 2)",
    category: "Redes Sociais",
    coverId: "1ZgrFe20wAgNs4TEds8QRn-X8YgcN0_YS",
    items: [
      img("1ZgrFe20wAgNs4TEds8QRn-X8YgcN0_YS", "post 11"),
      img("1IE7_l0Yz9lSWdtKbpcpyYHnOE3_1sLlr", "post 12"),
      img("1Z0-orvZrMv3HOmf5ENe4E_uXrI48OCue", "post 13"),
      img("1QZhdiWH48vxB6TRhZFC8eKerd64_YRNL", "post 14"),
      img("1JiiYERFGvytWGbcM0FUSG2pM6o_bA_-g", "post 15"),
      img("1ZpBu7sgWAOzMh0sKVcPFojE9bPpdnxvH", "post 16"),
      img("1mDEa6Ok4K7BUKnJbjodnj_kkCFxBObpQ", "post 17"),
      img("1rwGLdyiqGlT50KoU6zpFV3hFZtqp7kPG", "post 18"),
      img("1hsBH8mBiZxP3-T8_7jFv0w9ELRPj2oll", "post 19"),
      img("1LrjsKfTt8ZubuJNmm_lP2JTGcRCvi4YF", "post 20"),
    ],
  },
  {
    id: "d3r",
    title: "D3R Engenharia Clínica",
    category: "Redes Sociais",
    coverId: "1PbKYt84pfBYuXztNyqt_kjQ3fLmjz9rn",
    items: [
      img("1PbKYt84pfBYuXztNyqt_kjQ3fLmjz9rn", "Capa"),
      img("10O0xkRMIJAwmhJ4ViMcnK2RKUbhi3FJG", "Página 2"),
      img("1V0P0GFEEyvlb89VMIs8dsq58G9NQbwGj", "Página 3"),
    ],
  },
  {
    id: "evento-adocao",
    title: "Evento de Adoção",
    category: "Redes Sociais",
    coverId: "1ETn_3CK8-glD7UrXfV-rFV4AHbCotcnS",
    items: [img("1ETn_3CK8-glD7UrXfV-rFV4AHbCotcnS", "Evento de Adoção · Modelo 1")],
  },
  {
    id: "campanha-simparic",
    title: "Campanha Simparic",
    category: "Redes Sociais",
    coverId: "1G1Y2_Dvmfcm1BEN0dArMInuNzOPAQd0n",
    items: [img("1G1Y2_Dvmfcm1BEN0dArMInuNzOPAQd0n", "Campanha Simparic · Modelo 1")],
  },
  {
    id: "convites-envet",
    title: "Convites · ENVET e Eventos",
    category: "Materiais Promocionais e PDV",
    coverId: "1CULQ0-Ue3V6iREe7kt3ZM6ceKAO5jK84",
    items: [
      img("1CULQ0-Ue3V6iREe7kt3ZM6ceKAO5jK84", "Convite ENVET · modelo 2"),
      img("1wezEPhPUyCnzeO4vLauE1bMvyehJQ1AL", "Modelo 1.1"),
      img("1D5erDRqOGeHyKpgmmuVNA1AR1GSVgN4K", "Convite Jantar de Negócios"),
      img("1Bs5Etk8srt2rxKhcrPbO77TzBtF58oU6", "Convite Librela · lembrete"),
    ],
  },
  {
    id: "modelos-convite",
    title: "Modelos avulsos de convites",
    category: "Materiais Promocionais e PDV",
    coverId: "1bQFsQnRceV5b0QdYgKKamgFRgObLpMDl",
    items: [
      img("1bQFsQnRceV5b0QdYgKKamgFRgObLpMDl", "Modelo 1"),
      img("1qOfb5GzhntT0f-Psr3mPgFSIInmG6K-5", "Modelo 2"),
      img("13wAPwUtP7TBBiClP0lVNOTEH3wt8rrTg", "Modelo 2 (alt)"),
      img("1y20QHzs72FTTP79YUZnAIVTojv8tF_gN", "Modelo 3"),
      img("15szdqaoRWcwaH5XKrcllbYYc8BQZmDDt", "Modelo 1 · 06-05"),
      img("1b2BrW3sFTIE6SJ8iMx7_bL_0TW6ptmAv", "Modelo 1.2"),
    ],
  },

  /* ============ E-MAIL MARKETING ============ */
  {
    id: "email-krodec",
    title: "E-mail Marketing · Pega Rato Krodec",
    category: "E-mail Marketing",
    coverId: "1_EiXGKKzO0jhm81pB1n-YGUQZHJ5AdhU",
    items: [img("1_EiXGKKzO0jhm81pB1n-YGUQZHJ5AdhU", "Email Krodec")],
  },
  {
    id: "email-gel",
    title: "E-mail Marketing · Gel Mata Baratas / Formigas",
    category: "E-mail Marketing",
    coverId: "1YaaAtzqQ7vJS-kyOoDNxncPObGJSjWib",
    items: [
      img("1YaaAtzqQ7vJS-kyOoDNxncPObGJSjWib", "Gel Mata Formigas · versão WhatsApp"),
      img("1HA20x-esdTrBIeecU1G5I5Q5ys5ntElb", "Gel Baratas e Formigas"),
    ],
  },
  {
    id: "emails-marketing-1",
    title: "E-mails marketing (conjunto 1)",
    category: "E-mail Marketing",
    coverId: "16-ZHLdqVrDpyZY_quo3iPyMl3vGyZadt",
    items: [
      img("16-ZHLdqVrDpyZY_quo3iPyMl3vGyZadt", "email 1"),
      img("1IkdeA1ZUZIxSkOm-yDfqtx7EIoSdZ_ZN", "email 2"),
      img("16WHthJ1lPtgxe3RELNogeGN7OnGKpgsE", "email 3"),
      img("16ymmnKT5Ns8CnLeEJIDk5TH8wqNw71S6", "email 4"),
      img("1xHc0r9kAO-GTLpT9NxlscSbQDxF94UB6", "email 5"),
      img("1SC2IlnKVxuU-nATDThbyZ2qaXLiI41Zr", "email 6"),
      img("1NVv1qyRz8jL3nizEP8zKY2g4fFs73dQR", "email 7"),
      img("1tKBmuFw-rSCV2rlHfEyHodNKLzVn60pG", "email 8"),
      img("1QdQONblTIu78NDDbAl4WJiuMem1axhb6", "email 9"),
      img("1UazlU_9TKX80UonQXtl3NknvqCIMMFrK", "email 10"),
    ],
  },
  {
    id: "ass-email",
    title: "Assinaturas de e-mail",
    category: "Identidade Visual",
    coverId: "1j7ZcIeMuhF7qef9wmiutpEhde4dByfpw",
    items: [
      img("1j7ZcIeMuhF7qef9wmiutpEhde4dByfpw", "ass email 1"),
      img("1FEg26nZM58skvdnuq0q1oFnXamcH-3ua", "ass email 2"),
      img("1ziBXp0xl91Yf-gEOjPoI3qZXEphQJTlT", "ass email 3"),
      img("19z4UQMq39gFPuqJNMQ_BJ21HeYCBAG_r", "ass email 4"),
      img("1TFZkBghmEuXrMjZ4S6uOZPQn_61wX4My", "ass email 5"),
      img("1VopPhWT7j8c6FNi4P7Ci6MCg0aJ0BHmr", "ass email 6"),
      img("1kauB7lvG4CIpfakgQ9-6fuc9yQs-d4D4", "ass email 7"),
      img("1Zu45Oonkru0K6foW7mLTqUVJffVM5mel", "ass email 8"),
    ],
  },

  /* ============ DESIGN GRÁFICO / IDENTIDADE / MATERIAIS IMPRESSOS ============ */
  {
    id: "opus-papelaria",
    title: "Opus Medical · Cartões e pastas",
    category: "Identidade Visual",
    coverId: "1tZMTAxZLINA25HVK0HsmBHIRuR6rirvk",
    items: [
      img("1tZMTAxZLINA25HVK0HsmBHIRuR6rirvk", "Cartão de visita Opus · Mockup 3"),
      img("15wMZwT6YDJvJZx0vjxcBRXBIr1PFSUtL", "Pasta Opus · modelo 5"),
    ],
  },
  {
    id: "priore-identidade",
    title: "Priore · Identidade Visual",
    category: "Identidade Visual",
    coverId: "1nNKHNZElHsisJ5saFLKpCBI_yoH-dHIt",
    items: [
      img("1nNKHNZElHsisJ5saFLKpCBI_yoH-dHIt", "Logo Priore · branco"),
      img("1Nxnrk4RFzj1GOyLnnCp42CBlJ_iGoDxR", "Cartão de visita 1"),
      img("1GBWU8A0uTfVU8SA-1VF5nleVTOqBNtdL", "Cartão de visita 2"),
      img("1TtMr6IZwET96ZOYq2YyL7Zjv7YaWh8l1", "Crachá"),
      img("1OhLE9V1uveIufcPAiCcDKYfoN2_bqVLy", "Papel timbrado · mockup 2"),
      img("12YLg3Y-S49gALNzgQWKbQ8M4BtCDGgUC", "Pasta Priore · mockup 1"),
      img("1l_24exY3Dm8MRsyDFiAOm5Y2RIw2WoKi", "Pasta Priore · mockup 1 (2)"),
    ],
  },
  {
    id: "pastas-modelos",
    title: "Pastas institucionais (modelos)",
    category: "Materiais Promocionais e PDV",
    coverId: "1ywAQ3kTFhottZmsuswbydD4sj7NXbbvq",
    items: [
      img("1ywAQ3kTFhottZmsuswbydD4sj7NXbbvq", "pasta mockup"),
      img("1F7Pc5AZFJGpG40nwdMad9O5A_r2jznCf", "pasta mockup 2"),
      img("1PnHdkIxKTH1zJH-nP3pbk9qJIbs29nf-", "pasta mockup 1"),
      img("1w5J4if4gzgIKV2vIPpU52IZn_QMV_o9_", "pasta mockup 3 frente"),
      img("1hXK49cxnseUxKQUHAfXUwfdThTcbyOTS", "pasta mockup 1 frente"),
      img("1Ep5MWA6Zy4DDDnzf2Kuzzfhaka3iht8r", "pasta mockup 2 frente"),
    ],
  },
  {
    id: "fernanda-veraldi",
    title: "Fernanda Veraldi",
    category: "Design Gráfico",
    coverId: "1FD0DxnmoOgMfFqg0S72iWj3fdDwM8SpD",
    items: [
      img("1FD0DxnmoOgMfFqg0S72iWj3fdDwM8SpD", "Fernanda Veraldi 1"),
      img("1FiRZhpnqmQF8gEadhyjGhwIq-G-P6-pb", "Fernanda Veraldi 2"),
    ],
  },
  {
    id: "bea-lou",
    title: "Bea Lou",
    category: "Design Gráfico",
    coverId: "1eqNXaKiOdGCEVHuMAeeAJLYN-Fb1SBTY",
    items: [img("1eqNXaKiOdGCEVHuMAeeAJLYN-Fb1SBTY", "Bea Lou · Boas-vindas")],
  },
  {
    id: "arte-revolution",
    title: "Revolution · Artes e materiais",
    category: "Design Gráfico",
    coverId: "1RQCiegLthQPgRZqUUHANPnUh4CMHgjnY",
    items: [
      img("1RQCiegLthQPgRZqUUHANPnUh4CMHgjnY", "Arte Revolution A4"),
      img("1kFpbcKml0WL1rj9F7RGa_peBqktcCGgF", "Arte Revolution Modelo 1"),
    ],
  },
  {
    id: "simparic-pdv",
    title: "Simparic Trio · PDV",
    category: "Materiais Promocionais e PDV",
    coverId: "1ynA5iStd21b5xQMn8HvcHpnR-HLFJogP",
    items: [
      img("1ynA5iStd21b5xQMn8HvcHpnR-HLFJogP", "PDV · modelo 1"),
      img("1ipYeWNXyuqCgvOfu4q4W7q7_M0r2QwIu", "PDV · modelo 2"),
    ],
  },
  {
    id: "balcao-palacio",
    title: "Balcão Palácio Pets",
    category: "Materiais Promocionais e PDV",
    coverId: "1wHtxJ1SkSNkalCPlgFyfIihbi3pmn94t",
    items: [img("1wHtxJ1SkSNkalCPlgFyfIihbi3pmn94t", "Balcão Palácio Pets · Modelo 8")],
  },
  {
    id: "display-perlove",
    title: "Display Perlove",
    category: "Materiais Promocionais e PDV",
    coverId: "12figTvE2qKK6QlY7SWwMR73NHnRXD2Mh",
    items: [img("12figTvE2qKK6QlY7SWwMR73NHnRXD2Mh", "Modelo 4 display de mesa Perlove")],
  },
  {
    id: "banner-krodec",
    title: "Banner Krodec",
    category: "Materiais Promocionais e PDV",
    coverId: "1_oFTT6uy4DgR_21TtAPXqeQ-K1f-UdKp",
    items: [img("1_oFTT6uy4DgR_21TtAPXqeQ-K1f-UdKp", "Banner Krodec atualizado")],
  },
  {
    id: "catalogos",
    title: "Catálogos e Folhetos",
    category: "Materiais Promocionais e PDV",
    coverId: "1vYcFnwrnmGtjGo4pNmitCibrkyeadCF0",
    items: [
      img("1CwrZiNnFiuZRByyryt7RAaj0_yqRLQow", "Catálogo quadrado Opus Medical"),
      img("1ssBgKzmG6QuACzWDewm0uQhAZdP-KJfW", "Catálogo mockup EMP"),
      img("1UWes0F0jyuOHDuZPvGEtx5sfiepH2rz1", "Catálogo Opus (2)"),
      img("1vYcFnwrnmGtjGo4pNmitCibrkyeadCF0", "Catálogo Geral PERLOVE"),
      img("1_thdCo-oySxk1R1mIj7l8tXetKmUsh0K", "Catálogo de produtos 1"),
      img("1gylo3Qwh37TERerDeUDX7C-m0Wq0s322", "Catálogo de produtos 2"),
      img("1zuBV9MjdX8hpS23v9jQxqDKh2iG3YOFv", "Folheto"),
      img("1PbulpryNwkN_ZNxmWxKQkZ6uHUrCWTk9", "Modelo 1 Calendário · Mockup"),
    ],
  },
  {
    id: "mockups-eventos",
    title: "Mockups de Stands e Banners (Eventos)",
    category: "Materiais Promocionais e PDV",
    coverId: "1lJK1BnNKYhcSDSuh7wCyM8ZqjoOsFjfP",
    items: [
      img("1lJK1BnNKYhcSDSuh7wCyM8ZqjoOsFjfP", "Mockup estande eventos"),
      img("1Lw0E9M8oqQEH5csxIwBrAFkmSPeDJm_1", "Mockup banner eventos"),
    ],
  },

  /* ============ COMUNICAÇÃO VISUAL / ADESIVAÇÃO ============ */
  {
    id: "clinica-tatuape",
    title: "Clínica Veterinária Tatuapé",
    category: "Comunicação Visual",
    coverId: "1wnbP-dzN8nQPCbIb0-PBMRoQWnBphecm",
    items: [
      img("1wnbP-dzN8nQPCbIb0-PBMRoQWnBphecm", "Arte 1"),
      img("1SssoWmLpkkfjqaXiKhrOsUBPWe0_8AV2", "Arte 2"),
      vid("12XzmvM21ZkFmA-DRIP0U1orUkba7Ysf1", "Vídeo da clínica"),
    ],
  },
  {
    id: "clinica-kelly",
    title: "Adesivação Clínica Doutora Kelly",
    category: "Comunicação Visual",
    coverId: "1_aMF1Z67p1yKiTCNsChpyOgApfQCDPNA",
    items: [vid("1_aMF1Z67p1yKiTCNsChpyOgApfQCDPNA", "Adesivação Doutora Kelly")],
  },
  {
    id: "pet-fofinho",
    title: "Adesivação Pet Fofinho",
    category: "Comunicação Visual",
    coverId: "1rxwoYn6gUrcoZv0KoTZvCxiis4v4fh86",
    items: [vid("1rxwoYn6gUrcoZv0KoTZvCxiis4v4fh86", "Adesivação Pet Fofinho")],
  },
  {
    id: "adesivacoes-parede",
    title: "Adesivações de parede (conjunto)",
    category: "Comunicação Visual",
    coverId: "1J6lLhsZ3O2cbNjKyxY08Ruaq9Bx5L8De",
    items: [
      img("1J6lLhsZ3O2cbNjKyxY08Ruaq9Bx5L8De", "Adesivação parede Churu"),
      img("1SBuStB6zl87wqvIgMWAc3n3acQi37GIG", "Adesivação · Vacinas"),
      img("1I3wzRhuA5i-v3o0EzJnwdL2zOXE0X1eY", "Adesivação Churu (2)"),
    ],
  },

  /* ============ VÍDEOS E PRODUÇÕES ============ */
  {
    id: "videos-hero",
    title: "Vídeos espaciais (identidade visual)",
    category: "Vídeos e Produções",
    coverId: "15hxALN0Gj3DkbA02wORHI2uNVP3AqNvm",
    items: [
      vid("15hxALN0Gj3DkbA02wORHI2uNVP3AqNvm", "Astronauta caminhando na Lua com Saturno"),
      vid("167__QsQzCef9ovxEDBuWXB4sLLWrd8wn", "Astronauta caminhando na Lua"),
      vid("16Jn39XdEElZhIf1qUuOB5w7KMnThk_Pm", "Astronauta no espaço"),
      vid("1TujwJAEA-p3XR_jvhCsPUJPgBAfoAvkV", "Perspectiva da Lua"),
    ],
  },
  {
    id: "convite-suprimed-video",
    title: "Convite Suprimed",
    category: "Vídeos e Produções",
    coverId: "1KYexM_A8o2Zg1G_JuMH45algGcK1QxeG",
    items: [vid("1KYexM_A8o2Zg1G_JuMH45algGcK1QxeG", "Convite Suprimed (vídeo)")],
  },
  {
    id: "videos-projetos",
    title: "Vídeos de projetos",
    category: "Vídeos e Produções",
    coverId: "1ZmlgPz6YL0i-A7o7338bktYPJAPQnjSg",
    items: [
      vid("1ZmlgPz6YL0i-A7o7338bktYPJAPQnjSg", "Vídeo 4", "m4v"),
      vid("1vxSXWME9wrq60bQ29A0jFnwHJsJn1dM7", "Vídeo 5", "m4v"),
      vid("161ltzUW7sBnQ2IsreAsBRXHoITcExgib", "Vídeo 1", "m4v"),
      vid("17Ij736MjY0f4uDWOa33DhCHrI_XO5i80", "Vídeo 6"),
      vid("1ssXNCZH1aAGAwPdUje6eMH5vXZdi_kt9", "Vídeo 3"),
      vid("1pFgNDePbUCw25BMG3LK3H5G9v9j8lYFI", "Vídeo 7"),
      vid("1OCTdg1i09LPz6pMY8R9Ozo6G7jWnfrGW", "Vídeo 2"),
    ],
  },

  /* ============ IDENTIDADE VISUAL DA AGÊNCIA ============ */
  {
    id: "moon-logo",
    title: "Moon Creative · Logo oficial",
    category: "Identidade Visual",
    coverId: "1pK1X8fneWpTNBKYvaWxdiDNZx7J0NZLU",
    items: [img("1pK1X8fneWpTNBKYvaWxdiDNZx7J0NZLU", "Logo Moon Creative")],
  },
  {
    id: "cst-apresentacao",
    title: "CST Global Corp · Apresentação institucional",
    category: "Identidade Visual",
    coverId: "1SF1Hhn06b1LbK_NW6z33IXvogeInXJxV",
    items: [
      img("1SF1Hhn06b1LbK_NW6z33IXvogeInXJxV", "Apresentação CST Global Corp 2023 (PPTX)"),
      img("14AwnJAXxjGmrmx5tRMajjtJOpapMXPx0", "Logo CST Global Corp"),
    ],
  },
  {
    id: "lua-foto",
    title: "Foto da Lua",
    category: "Vídeos e Produções",
    coverId: "1F5jUdXFy55R5ByW-PGSchLaJsqPkR3kc",
    items: [img("1F5jUdXFy55R5ByW-PGSchLaJsqPkR3kc", "Foto da Lua")],
  },
  {
    id: "astronauta-png",
    title: "Astronauta PNG",
    category: "Vídeos e Produções",
    coverId: "142eYoxZ_Dft0Q4Lxa6ts3Dq1rkGpTkFw",
    items: [img("142eYoxZ_Dft0Q4Lxa6ts3Dq1rkGpTkFw", "Foto de astronauta PNG")],
  },
  {
    id: "logo-cst",
    title: "CST Global Corp",
    category: "Identidade Visual",
    coverId: "14AwnJAXxjGmrmx5tRMajjtJOpapMXPx0",
    items: [img("14AwnJAXxjGmrmx5tRMajjtJOpapMXPx0", "Logo CST Global Corp")],
  },
];

/**
 * Helper: constrói URL de thumbnail do Drive
 * Para vídeos, o thumbnail é a mesma URL (mas aponta para o frame de capa; se não
 * existir, usamos uma imagem gerada como fallback).
 */
export function driveThumbUrl(id: string, w = 1400) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
}
export function driveVideoUrl(filename: string) {
  return `/videos/${filename}`;
}

/**
 * Mapeamento driveId -> caminho local (vídeos). Se não existir, não é um vídeo.
 */
export const VIDEO_MAP: Record<string, string> = {
  // Vídeos do próprio acervo que foram baixados
  "15hxALN0Gj3DkbA02wORHI2uNVP3AqNvm": "/videos/astronauta-lua-saturno.mp4",
  "16Jn39XdEElZhIf1qUuOB5w7KMnThk_Pm": "/videos/astr-espaco.mp4",
  "1TujwJAEA-p3XR_jvhCsPUJPgBAfoAvkV": "/videos/lua.mp4",
  "12XzmvM21ZkFmA-DRIP0U1orUkba7Ysf1": "/videos/clinica-tatuape.mp4",
  "1rxwoYn6gUrcoZv0KoTZvCxiis4v4fh86": "/videos/adesivacao-petfofinho.mp4",
  "1KYexM_A8o2Zg1G_JuMH45algGcK1QxeG": "/videos/convite-suprimed.mp4",
  "1_aMF1Z67p1yKiTCNsChpyOgApfQCDPNA": "/videos/adesivacao-kelly.mp4",
  // Vídeos adicionais (m4v/mp4) baixados
  "161ltzUW7sBnQ2IsreAsBRXHoITcExgib": "/videos/video-1.m4v",
  "1OCTdg1i09LPz6pMY8R9Ozo6G7jWnfrGW": "/videos/video-2.mp4",
};
