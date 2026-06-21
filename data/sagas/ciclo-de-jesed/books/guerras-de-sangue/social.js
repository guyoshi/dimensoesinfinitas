(()=>{
  'use strict';
  const D=window.DI_DATA;if(!D)return;
  const familyPatches={
    'family-polar-gemeas':{image:'',subtitle:'Casa soberana de Kaendar',details:['Orionus constrói estabilidade por meio de alimento, ameaça e consequência.','Kaelina herda responsabilidade e dúvida.','Alyra herda orgulho, violência e medo de humilhação.','A morte do pai transforma divergências familiares em crise de governo.']},
    'family-rendar':{image:'',subtitle:'Núcleo Fendelar destruído',details:['Vita, Nara e Ilo são o centro emocional da vingança de Rendar.','A família é destruída no massacre de Velarim.','Os nomes entram no Registo do Portão ao fim da guerra.']},
    'family-daryon-savel':{image:'',subtitle:'Origem apagada em Noreval',details:['Daryon oculta a própria origem ao ascender em Kaendar.','Savel preserva parte da memória familiar e documental.','A investigação de Kaelina transforma parentesco em prova política.']}
  };
  for(const family of D.families||[])Object.assign(family,familyPatches[family.id]||{});
  const orgPatches={
    'org-conselho-raiz':{image:'',function:'Distribuir poder, recursos e responsabilidade entre onze funções de Kaendar.',activity:'Debate guerra, abastecimento, registros, fronteiras, obras e autoridade soberana.',themes:['governo','memória','responsabilidade']},
    'org-homens-areias':{image:'',function:'Sobreviver fora da proteção da Raiz por meio de contratos, violência e mobilidade.',activity:'São contratados para operações que Kaendar não deseja assumir publicamente.',themes:['exílio','mercenários','culpa política']},
    'org-alianca-clas':{image:'',function:'Unir forças incompatíveis contra a Dinastia Polar.',activity:'Coordena comida, fogo, pressão militar, rotas e informação durante a marcha para Kaendar.',themes:['aliança instável','guerra','vingança']}
  };
  for(const org of D.organisations||[])Object.assign(org,orgPatches[org.id]||{});
})();
