(() => {
  'use strict';
  const X=window.JESED_GUERRAS_CONTEXT;if(!X)return;const {D}=X;
  const placements={
    'jesed-place-kaendar':{x:38.7,y:71.2,kind:'place',major:true},
    'jesed-place-khar-tondr':{x:80.8,y:72,kind:'place',major:true},
    'jesed-place-nyn-harad':{x:63.8,y:51.2,kind:'place',major:true},
    'jesed-place-velarim':{x:61.8,y:65.5,kind:'place',major:true},
    'jesed-place-margem-zirrios':{x:46.5,y:30,kind:'place',major:true},
    'jesed-place-varkhama':{x:75,y:20.4,kind:'place',major:true},
    'jesed-place-cendar-vel':{x:28.9,y:21.7,kind:'place',major:true},
    'jesed-place-urtar-vesh':{x:24.8,y:56.3,kind:'place',major:true},
    'jesed-place-homens-areias':{x:12.3,y:86.1,kind:'place',major:true},
    'jesed-place-marco-tres-pedras':{x:65.5,y:68.2,kind:'place',major:false},
    'jesed-place-alesteiro':{x:48.5,y:62.5,kind:'place',major:false},
    'jesed-place-noreval':{x:43.8,y:59.8,kind:'place',major:false},
    'jesed-place-nhar-veyr':{x:69.5,y:59.2,kind:'place',major:false},
    'jesed-place-plataforma-sol-alto':{x:80.1,y:69.1,kind:'place',major:false},
    'jesed-place-veias-barro':{x:82.2,y:75.3,kind:'place',major:false},
    'jesed-place-camara-primeiro-abrigo':{x:37.4,y:68.4,kind:'place',major:false},
    'jesed-place-terra-preta':{x:65.2,y:45.8,kind:'region',major:true},
    'jesed-place-floresta-mirval':{x:60,y:62,kind:'region',major:true},
    'route-rio-grande':{x:36.5,y:45.5,kind:'route',major:true},
    'route-garganta-kaendar':{x:48,y:69.5,kind:'route',major:true},
    'route-garganta-seca':{x:70.8,y:79.2,kind:'route',major:true},
    'route-estrada-graos':{x:87.2,y:48.2,kind:'route',major:true},
    'route-marcha-alianca':{x:67,y:65.8,kind:'route',major:true}
  };
  for(const place of D.places){const map=placements[place.id];if(map){place.x=map.x;place.y=map.y;place.map=map;}}
  const categories=[
    {id:'conflicts',label:'Clãs em conflito',items:[
      {title:'Polar e Tondrar',description:'A morte de Yvenn transforma a negociação em guerra aberta.',placeIds:['jesed-place-kaendar','jesed-place-khar-tondr','jesed-place-marco-tres-pedras']},
      {title:'Polar e Buldar',description:'Grãos, cerco e autoridade colocam Kaendar contra a Terra Preta.',placeIds:['jesed-place-kaendar','jesed-place-nyn-harad','jesed-place-terra-preta']},
      {title:'Polar e sobreviventes Fendelar',description:'Velarim converte a vingança de Rendar em ameaça direta ao trono.',placeIds:['jesed-place-kaendar','jesed-place-velarim']}
    ]},
    {id:'confirmed-alliances',label:'Alianças confirmadas',items:[
      {title:'Tondrar, Buldar e Fendelar',description:'Forças distintas marcham juntas contra Kaendar, sem se tornarem um exército único.',placeIds:['jesed-place-khar-tondr','jesed-place-nyn-harad','jesed-place-velarim','route-marcha-alianca']},
      {title:'Polar e Urtistar',description:'Alyra obtém apoio Urtistar para a defesa de Kaendar.',placeIds:['jesed-place-kaendar','jesed-place-urtar-vesh']},
      {title:'Kaelina e Homens das Areias',description:'Um acordo temporário muda o equilíbrio durante a invasão da fortaleza.',placeIds:['jesed-place-kaendar','jesed-place-homens-areias']}
    ]},
    {id:'suspected-alliances',label:'Alianças suspeitas',items:[
      {title:'Daryon e Homens das Areias',description:'Os encontros secretos precedem a revelação do papel de Daryon na guerra.',placeIds:['jesed-place-kaendar','jesed-place-homens-areias']},
      {title:'Tavra e a força invasora',description:'A presença Vendrar favorece o ataque, mas não representa decisão formal de todo o clã.',placeIds:['jesed-place-varkhama','jesed-place-kaendar']}
    ]},
    {id:'disputed-territories',label:'Territórios disputados',items:[
      {title:'Marco das Três Pedras',description:'Terreno de trégua entre rotas Polar e Tondrar.',placeIds:['jesed-place-marco-tres-pedras']},
      {title:'Nhar-Veyr',description:'Vila de autoridade ambígua na fronteira de três territórios.',placeIds:['jesed-place-nhar-veyr']},
      {title:'Floresta de Mirval',description:'A floresta oculta Velarim entre interesses Buldar e Tondrar.',placeIds:['jesed-place-floresta-mirval','jesed-place-velarim']}
    ]},
    {id:'threatened-routes',label:'Rotas ameaçadas',items:[
      {title:'Rio Grande',description:'A rota fluvial e o cais tornam-se caminho de invasão e abastecimento.',placeIds:['route-rio-grande','jesed-place-kaendar','jesed-place-margem-zirrios']},
      {title:'Garganta de Kaendar',description:'A principal defesa terrestre perde importância quando o inimigo escolhe outro acesso.',placeIds:['route-garganta-kaendar','jesed-place-kaendar']},
      {title:'Estrada dos Grãos',description:'O bloqueio ou atraso das cargas ameaça Kaendar antes da batalha.',placeIds:['route-estrada-graos','jesed-place-nyn-harad','jesed-place-terra-preta']},
      {title:'Garganta Seca',description:'A passagem controla a saída Tondrar e a formação da marcha.',placeIds:['route-garganta-seca','jesed-place-khar-tondr']}
    ]},
    {id:'strategic-resources',label:'Recursos estratégicos',items:[
      {title:'Grãos da Terra Preta',description:'A produção Buldar sustenta cidades e serve como instrumento político.',placeIds:['jesed-place-terra-preta','jesed-place-nyn-harad','route-estrada-graos']},
      {title:'Água do Rio Grande',description:'Água, pesca, transporte e acesso ao mar atravessam vários territórios.',placeIds:['route-rio-grande','jesed-place-margem-zirrios','jesed-place-kaendar']},
      {title:'Metal e fogo Vendrar',description:'As forjas de Varkhama produzem mecanismos capazes de alterar o campo de batalha.',placeIds:['jesed-place-varkhama','jesed-place-alesteiro','jesed-place-kaendar']}
    ]},
    {id:'moving-forces',label:'Forças em movimento',items:[
      {title:'Marcha da aliança',description:'Tondrar, Buldar e sobreviventes Fendelar convergem para Kaendar por trajetos separados.',placeIds:['route-marcha-alianca','jesed-place-khar-tondr','jesed-place-nyn-harad','jesed-place-kaendar']},
      {title:'Urtistar rumo à fortaleza',description:'O apoio negociado por Alyra desloca combatentes para a defesa Polar.',placeIds:['jesed-place-urtar-vesh','jesed-place-kaendar']},
      {title:'Homens das Areias dentro de Kaendar',description:'Sarkan muda de posição e conduz sua força para o interior da cidade.',placeIds:['jesed-place-homens-areias','jesed-place-kaendar']}
    ]}
  ].filter(category=>category.items.length>=2);
  D.maps={
    main:{
      id:'guerras',title:'Jesed em Guerras de Sangue',shortTitle:'Jesed',
      image:'assets/books/ciclo-de-jesed/guerras-de-sangue/maps/map-jesed.webp',ratio:'1536 / 1024',
      description:'Territórios, cidades, passagens e forças políticas na época da guerra.',
      placeIds:Object.keys(placements),
      routeLines:[
        {id:'route-rio-grande',kind:'water',points:'39,1 40,17 41,31 38,43 35,56 33,72 31,91'},
        {id:'route-garganta-kaendar',kind:'land',points:'43,70 48,69.5 52,72'},
        {id:'route-garganta-seca',kind:'land',points:'68,77 71,79 76,75'},
        {id:'route-estrada-graos',kind:'land',points:'78,43 84,45 87,48 88,57'},
        {id:'route-marcha-alianca',kind:'military',points:'81,72 70,66 64,56 57,62 49,68 39,71'}
      ],
      strategicCategories:categories
    }
  };
})();
