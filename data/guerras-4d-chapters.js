(()=>{
  const D=window.DI_DATA;
  if(!D) return;
  const chapters=[
    {
      id:"jesed-chapter-gs-24",number:24,image:"assets/chapters/guerras-de-sangue/capitulo-24.png",title:"De Volta à Kaendar",status:"Escrito",pov:"Múltiplo",
      places:["jesed-place-kaendar"],
      characters:["jesed-character-kaelina-polar","jesed-character-rendar","jesed-character-markoso","jesed-character-daryon-vess","jesed-character-ylvena","jesed-character-alyra-polar"],
      summary:"Rendar leva Kaelina como refém até Kaendar e usa sua vida para abrir o Cais dos Zírrios, permitindo que a guerra entre na fortaleza.",
      details:[
        "Rendar conduz Kaelina como refém viva diante das defesas de Kaendar. A ameaça força a abertura do acesso do Cais dos Zírrios, e combatentes da aliança invadem a fortaleza enquanto os Urtistar se recusam a sustentar a guerra de Alyra até o fim.",
        "Kaelina escapa durante o caos com a ajuda de Markoso. Depois de enfrentar Rendar e derrubá-lo de uma janela, Markoso conduz a soberana por passagens ocultas, onde ambos veem Daryon entrar numa câmara secreta ao encontro de Ylvena, escondida dentro da própria cidade."
      ],wordCount:6444,source:"Guerras de Sangue — Capítulo 24"
    },
    {
      id:"jesed-chapter-gs-25",number:25,image:"assets/chapters/guerras-de-sangue/capitulo-25.png",title:"O Segredo de Daryon",status:"Escrito",pov:"Múltiplo",
      places:["jesed-place-kaendar"],
      characters:["jesed-character-kaelina-polar","jesed-character-markoso","jesed-character-daryon-vess","jesed-character-ylvena","jesed-character-orionus-polar","jesed-character-alyra-polar","jesed-character-yvenn-raiz-branca"],
      summary:"Kaelina escuta a confissão que liga Daryon e Ylvena às mortes que iniciaram a guerra, à morte de Orionus e ao envenenamento de Yvenn.",
      details:[
        "Escondidos junto à câmara, Kaelina e Markoso ouvem Ylvena revelar que ela e Daryon vieram juntos de Noreval, que Daryon apagou a própria origem e que Alyra carrega o filho dele. Ylvena admite ter matado os dois jovens Polar e plantado o talismã Tondrar para dar a Alyra uma guerra.",
        "A confissão revela também que Ylvena pretendia envenenar Alyra com Beijo-da-Noite, mas Orionus bebeu o veneno; Daryon falsificou registros para protegê-la, envenenou Yvenn e ajudou a construir o massacre de Velarim. Kaelina confronta a antiga servidora e a mata numa luta brutal, enquanto Markoso desaparece pelos túneis."
      ],wordCount:5190,source:"Guerras de Sangue — Capítulo 25"
    },
    {
      id:"jesed-chapter-gs-26",number:26,image:"assets/chapters/guerras-de-sangue/capitulo-26.png",title:"A Mão de Fogo",status:"Escrito",pov:"Múltiplo",
      places:["jesed-place-kaendar"],
      characters:["jesed-character-rendar","jesed-character-tavra-vendrar","jesed-character-alyra-polar","jesed-character-iressa-mao-de-sal"],
      summary:"Enquanto Kaendar arde, Rendar tenta abrir os portões principais e Tavra procura Alyra para transformar a guerra numa vingança pessoal.",
      details:[
        "Rendar reorganiza os invasores dentro de Kaendar e coordena-se com Tavra para alcançar os portões e o coração político da cidade. Tavra abandona parte do cálculo militar para procurar Alyra, levando consigo o mecanismo de fogo Vendrar.",
        "Alyra enfrenta Tavra numa torre. Iressa intervém para impedir a queda da soberana; Alyra corta o mecanismo de fogo do braço de Tavra, e a Vendrar despenca da torre. Alyra recolhe a arma danificada, sem compreender ainda o preço de usá-la."
      ],wordCount:6831,source:"Guerras de Sangue — Capítulo 26"
    },
    {
      id:"jesed-chapter-gs-27",number:27,image:"assets/chapters/guerras-de-sangue/capitulo-27.png",title:"A Última Caça do Caçador",status:"Escrito",pov:"Múltiplo",
      places:["jesed-place-kaendar"],
      characters:["jesed-character-kaelina-polar","jesed-character-varron-meio-olho","jesed-character-nynestra-buldar","jesed-character-kharvok","jesed-character-sarkan-boca-partida","jesed-character-rendar","jesed-character-alyra-polar","jesed-character-daryon-vess"],
      summary:"Kaelina divide a aliança diante de Kaendar, enquanto Rendar alcança o trono e força Daryon a confessar os crimes que construíram a guerra.",
      details:[
        "Kaelina retorna dos túneis, ajuda a conter uma bomba de fogo e sai sozinha diante dos exércitos. Ela expõe a armação contra os Tondrar e transforma o custo da guerra em argumento político. Nynestra retira os Buldar, deixando Kharvok isolado; Sarkan e os Homens das Areias ajudam Kaelina a regressar e a fechar o cais.",
        "Rendar alcança Alyra, mas Daryon intervém. Durante o confronto, Daryon confessa publicamente que Ylvena matou os jovens e plantou o talismã, que ele escondeu Ylvena, falsificou os registros de Orionus, envenenou Yvenn e planeou o massacre de Velarim. Rendar quase o poupa, mas Daryon tenta usar uma lâmina escondida e é mortalmente ferido."
      ],wordCount:8425,source:"Guerras de Sangue — Capítulo 27"
    },
    {
      id:"jesed-chapter-gs-28",number:28,image:"assets/chapters/guerras-de-sangue/capitulo-28.png",title:"Guerra de Sangue",status:"Escrito",pov:"Múltiplo",
      places:["jesed-place-kaendar"],
      characters:["jesed-character-kaelina-polar","jesed-character-rendar","jesed-character-alyra-polar","jesed-character-daryon-vess"],
      summary:"Kaelina oferece julgamento e passagem a Rendar, mas Alyra rompe a palavra da irmã e transforma o fim da guerra num duelo entre as soberanas.",
      details:[
        "Kaelina entra no salão e negocia a libertação de Alyra, revelando que a irmã está grávida e prometendo que ela será julgada. Rendar aceita a palavra de Kaelina, solta Alyra e recebe passagem para retirar os seus. Antes de morrer, Daryon reconhece que tentou construir uma soberana por meio do medo, enquanto Kaelina conquistou autoridade sem exército nem trono.",
        "Alyra dispara contra Rendar pelas costas, violando a passagem concedida por Kaelina. Rendar morre, e Kaelina declara que Alyra já não é soberana. As irmãs duelam; Alyra tenta usar o mecanismo de Tavra, mas a arma danificada explode, destruindo sua mão esquerda e queimando metade do rosto."
      ],wordCount:6403,source:"Guerras de Sangue — Capítulo 28"
    },
    {
      id:"jesed-chapter-gs-29",number:29,image:"assets/chapters/guerras-de-sangue/capitulo-29.png",title:"A Raiz que Ficou",status:"Escrito",pov:"Múltiplo",
      places:["jesed-place-kaendar"],
      characters:["jesed-character-kaelina-polar","jesed-character-alyra-polar","jesed-character-cal-kadrir","jesed-character-iressa-mao-de-sal","jesed-character-lurok","jesed-character-sarkan-boca-partida","jesed-character-markoso","jesed-character-rendar","jesed-character-daryon-vess"],
      summary:"O Conselho condena Alyra à morte, mas Kaelina realiza um golpe, suspende a autoridade executiva do Conselho e escolhe o exílio para preservar a irmã e a criança.",
      details:[
        "Sete dias depois, o Conselho examina as provas contra Daryon, Ylvena e Alyra. Oito votos pedem execução e apenas um conselheiro escolhe o exílio; os três votos soberanos de Kaelina não bastam. Kaelina entra com guardas armados, chama sua ação de golpe e suspende a autoridade executiva do Conselho.",
        "Alyra perde títulos, terras e direito de retorno, sendo exilada com o filho ainda por nascer, cuja paternidade de Daryon ela confirma. Kaelina registra Rendar, Vita, Nara, Ilo e os mortos Fendelar no Registo do Portão, reconhece a quebra de sua palavra e inicia a revisão dos antigos exílios. Alyra parte; Markoso desaparece de um quarto fechado deixando pinturas do futuro. Kaelina governa sozinha durante vinte ciclos, reconstrói Kaendar e consolida a Dinastia Polar."
      ],wordCount:7634,source:"Guerras de Sangue — Capítulo 29"
    }
  ];
  const numbers=new Set(chapters.map(ch=>ch.number));
  D.chapters=D.chapters.filter(ch=>!numbers.has(ch.number)).concat(chapters).sort((a,b)=>a.number-b.number);
})();
