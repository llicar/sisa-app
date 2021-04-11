import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

/**
   * Gera documento com os dados do aprendiz
   * @param {*} data dados do aprendiz
   * @param {*} doc tipo de documento (carta, comunicado, oficio)
   * @param {*} datasFormatadas objeto com as datas devidamentes formatadas
   * @returns 
   */

const generateDocument = (data,doc,datasFormatadas) => {
  
  //DEFININDO TODOS OS DADOS NESCESSARIOS PARA OS DOCUMENTOS  

   // DEFININDO O RESPONSAVEL PELA ASSINATURA DOS DOCUMENTOS
   const setResponsavel = (data) =>{

    let responsavel = {};
    
    if(data.opc_responsavel ==='PAI'){
      responsavel = {
        nome:data.pai,
        rg:data.rg_pai,
        cpf:data.cpf_pai,
      };
    }
    else if (data.opc_responsavel==='MÃE'){
      responsavel = {
        nome:data.mae,
        rg:data.rg_mae,
        cpf:data.cpf_mae,
      };
    }
    else {
      responsavel = {
        nome:data.responsavel_legal,
        rg:data.rg_responsavel_legal,
        cpf:data.cpf_responsavel_legal,
      };
    }
    
    return responsavel;
    
  }

  const defineOpcaoReponsavel = (reponsavel) =>{
    
    let opcReponsavel = {}

    if(reponsavel === "PAI") {
      opcReponsavel = {
        paiX : 'X',
        maeX : '',
        responsavelX : ''
      }
    } 
    else if(reponsavel === "MÃE") {
      opcReponsavel = {
        paiX : '',
        maeX : 'X',
        responsavelX : ''
      }
    }
    else {
      opcReponsavel = {
        paiX : '',
        maeX : '',
        responsavelX : 'X'
      }
    }

    return opcReponsavel;
  
  }

  const defineSitImovel = (sit) =>{
    let sitImovel = {}

    if(sit === "proprio") {
        sitImovel ={
          proprioX : "X",
          alugadoX : "",
          cedidoX:"",                     
          financiadoX:""
        }
    }
    else if (sit === "alugado") {
      sitImovel = {
        proprioX : "",
        alugadoX : "X",
        cedidoX:"",                     
        financiadoX:""
     }
    }
    else if (sit === "cedido") {
      sitImovel = {
        proprioX : "",
        alugadoX : "",
        cedidoX:"X",                     
        financiadoX:""
     }
  }
  else {
    sitImovel = {
      proprioX : "",
      alugadoX : "",
      cedidoX:"",                     
      financiadoX:"X"
   }
  }

  return sitImovel;
}

  const responsavel = setResponsavel(data);
  const opcReponsavel = defineOpcaoReponsavel(data.opc_responsavel)
  const sitImovel = defineSitImovel(data.sit_imovel)

  const dataForDocument = {
      jae:data.jae,
      ic:data.ic,
      razaosocial:data.razaosocial,
      nome:data.nome,
      matri_scfv:data.matri_scfv,
      rg:data.rg,
      cpf:data.cpf,
      ctps:data.ctps,
      serie:data.serie,
      cidade_nascimento:data.cidade_nascimento,
      estado_nascimento:data.estado_nascimento,
      cep:data.cep,
      rua:data.rua,
      numero:data.numero,
      bairro:data.bairro,
      rua_emp:data.rua_emp,
      numero_emp:data.numero_emp,
      bairro_emp:data.bairro_emp,
      municipio_emp:data.municipio_emp,
      uf_emp:data.uf_emp,
      cep_emp:data.cep_emp,
      cnpj:data.cnpj,
      tempo_imovel:data.tempo_moradia,
      jornada: data.jornada,
      escolaridade:data.escolaridade,
      fone1:data.fone1,
      fone2:data.fone2,

      matri_ap:data.matri_ap,
      ja:data.ja,
      tipo_contrato:data.tipo_contrato,
      carga_horaria:data.carga_horaria,
      duracao_contrato: data.duracao_contrato,
      tipo_salario: data.tipo_salario,
      salario:data.salario,
      oficio:data.oficio,

      admissao:datasFormatadas.admissao,
      dia_admissao:datasFormatadas.diaAdmissao,
      mes_admissao:datasFormatadas.mesCompletoAdmissao,
      ano_admissao:datasFormatadas.anoAdmissao,

      data_nascimento:datasFormatadas.data_nascimento,
      emissao_rg:datasFormatadas.emissao_rg,
      demissao:datasFormatadas.demissao,

      data_oficio:datasFormatadas.oficio,
      dia_oficio:datasFormatadas.diaOficio,
      mes_oficio:datasFormatadas.mesCompletoOficio,
      ano_oficio:datasFormatadas.anoOficio,

      responsavel: responsavel.nome,
      cpf_responsavel: responsavel.cpf,
      rg_responsavel: responsavel.rg,

      paiX : opcReponsavel.paiX,
      maeX : opcReponsavel.maeX,
      responsavelX: opcReponsavel.responsavelX,

      proprioX : sitImovel.proprioX,
      alugadoX : sitImovel.alugadoX,
      cedidoX:sitImovel.cedidoX,                     
      financiadoX: sitImovel.financiadoX

  }

    /**
     * Define a opcao marcada em responsavel no oficio
     * @param {*} doc 
     * @returns 
     */

    
      
    /**
     * DEFININDO O QUAL O TIPO DE DOCUMENTO A PARTIR DA PROPRIEDADE (doc)
     * Entre com: 'carta' para carta de encaminhamento
     *            'comunicado' para comunicado de admissao
     *            'oficio' para oficio de abertura de conta
     * @param {Tipo do documento} doc 
     * @returns 
     */
  const setDocType = (doc) =>{

    let docType = "";
    
    if(doc ==='carta'){
      docType = 'carta_de_encaminhamento';
    }
    else if(doc==='comunicado'){
      docType = 'comunicado_de_admissao';
    }
    else if(doc=='oficio'){
      docType = 'oficio';
    }
    
    return docType;
  }

  const docType = setDocType(doc);
    

      // BUSCANDO O TEMPLATE DO DOCUMENTO NO AMAZON S3
      loadFile(`https://scja.s3.amazonaws.com/docs/${docType}.docx`, function(
        error,
        content
      ) {
        if (error) {
          throw error;
        }
        
      //TRATANDO O DOCUMENTO
        var zip = new PizZip(content);
        var doc = new Docxtemplater().loadZip(zip);
        doc.setData(dataForDocument);

        try {
          // RENDERIZANDO O DOCUMENTO (subustituir todas as cocorrencias {nome} por Lucas Licar etc..
          doc.render();
        } catch (error) {
          // O erro gerado aqui contém informações adicionais quando registrado com JSON.stringify (ele contém um objeto de propriedades contendo todos os suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function(
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function(error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages é uma mensagem legível por humanos com a seguinte aparência:
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        
        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }); //Produzindo o documento usando Data-URI
        
        saveAs(out, `${docType}-${data.nome}.docx`);
      });
    };

    export default generateDocument;
    
  
